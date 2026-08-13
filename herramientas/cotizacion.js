/**
 * cotizacion.js — genera una COTIZACIÓN con diseño de marca a partir de un JSON.
 *
 * Sirve para las dos empresas:
 *   · millimeter  → piedra natural ultradelgada (sqft, espesor, fabricación, flete).
 *                   Incluye el CUADRO DE AHORRO DE PESO, que es el argumento
 *                   comercial central de MILLIMETER (13–15 lb/ft² vs 3–4 vs <1).
 *   · aspen-leaf  → honorarios de diseño, FF&E, procurement, administración de obra.
 *
 * Toda la matemática la hace el script: subtotales, descuentos, cargos,
 * impuestos, total, y el cronograma de pagos por porcentaje.
 *
 * Uso:
 *   node herramientas/cotizacion.js datos/cotizaciones/ejemplo-millimeter.json
 */

const path = require('path');
const { esc, leerJSON, marca, guardar, slug, money, head, RAIZ } = require('./lib/comun');

/* Peso por pie cuadrado, tomado del brochure MILLIMETER v2 (pág. 6). */
const PESO_LB_FT2 = { '2cm': 14, '3cm': 21, '5mm': 3.5, '1mm': 0.9 };

const T = {
  en: {
    quote: 'QUOTATION', number: 'Quote No.', date: 'Date', valid: 'Valid until',
    to: 'Prepared for', by: 'Prepared by', subject: 'Project',
    desc: 'Description', qty: 'Qty', unit: 'Unit', rate: 'Unit price', amount: 'Amount',
    subtotal: 'Subtotal', total: 'TOTAL', terms: 'Terms & Conditions',
    schedule: 'Payment schedule', milestone: 'Milestone', pct: '%',
    weight: 'Weight comparison', trad: 'Traditional 2 cm', saving: 'weight reduction',
    accept: 'Acceptance', sign: 'Signature', printName: 'Name', dateSign: 'Date',
    note: 'This quotation is an estimate based on the information available at the time of issue.',
  },
  es: {
    quote: 'COTIZACIÓN', number: 'Cotización N.º', date: 'Fecha', valid: 'Válida hasta',
    to: 'Preparada para', by: 'Preparada por', subject: 'Proyecto',
    desc: 'Descripción', qty: 'Cant.', unit: 'Unidad', rate: 'Valor unitario', amount: 'Valor',
    subtotal: 'Subtotal', total: 'TOTAL', terms: 'Términos y condiciones',
    schedule: 'Plan de pagos', milestone: 'Hito', pct: '%',
    weight: 'Comparación de peso', trad: 'Piedra tradicional 2 cm', saving: 'menos peso',
    accept: 'Aceptación', sign: 'Firma', printName: 'Nombre', dateSign: 'Fecha',
    note: 'Esta cotización es un estimado con base en la información disponible al momento de su emisión.',
  },
};

function sumaItem(it) {
  const bruto = Number(it.cantidad || 0) * Number(it.precio_unitario || 0);
  const desc = bruto * (Number(it.descuento_pct || 0) / 100);
  return bruto - desc;
}

function fechaMas(fechaISO, dias) {
  if (!fechaISO || !dias) return '';
  const d = new Date(fechaISO + 'T00:00:00');
  if (isNaN(d)) return '';
  d.setDate(d.getDate() + Number(dias));
  return d.toISOString().slice(0, 10);
}

/**
 * La barra inferior compara el peso REAL de lo cotizado, que puede mezclar
 * MILLIMETER con 2 cm tradicional. La etiqueta tiene que decirlo, o el cuadro
 * afirma algo que no es cierto en un documento que firma el cliente.
 */
function etiquetaEspesores(porEspesor) {
  const mm = Object.keys(porEspesor).filter((e) => e === '5mm' || e === '1mm');
  const trad = Object.keys(porEspesor).filter((e) => e === '2cm' || e === '3cm');
  const base = `MILLIMETER ${mm.join(' + ')}`;
  return trad.length ? `${base}  +  ${trad.join(' + ')}  (as specified)` : base;
}

function cuadroPeso(secciones, t) {
  // Suma sqft por espesor para mostrar el ahorro real de este proyecto.
  const porEspesor = {};
  let hayMillimeter = false;
  secciones.forEach((s) => (s.items || []).forEach((it) => {
    const e = (it.espesor || '').toLowerCase().replace(/\s/g, '');
    if (!PESO_LB_FT2[e]) return;
    const u = (it.unidad || '').toLowerCase();
    if (!/sqft|ft2|ft²|pie/.test(u)) return;
    porEspesor[e] = (porEspesor[e] || 0) + Number(it.cantidad || 0);
    if (e === '5mm' || e === '1mm') hayMillimeter = true;
  }));
  if (!hayMillimeter) return '';

  const areaTotal = Object.values(porEspesor).reduce((a, b) => a + b, 0);
  const pesoReal = Object.entries(porEspesor)
    .reduce((a, [e, ft2]) => a + ft2 * PESO_LB_FT2[e], 0);
  const pesoTrad = areaTotal * PESO_LB_FT2['2cm'];
  const ahorro = pesoTrad > 0 ? Math.round((1 - pesoReal / pesoTrad) * 100) : 0;

  return `<section class="peso">
  <h3>${esc(t.weight)}</h3>
  <div class="peso-barras">
    <div class="peso-fila">
      <span class="peso-et">${esc(t.trad)}</span>
      <span class="peso-barra"><i style="width:100%"></i></span>
      <span class="peso-val">${Math.round(pesoTrad).toLocaleString('en-US')} lb</span>
    </div>
    <div class="peso-fila peso-fila--mm">
      <span class="peso-et">${esc(etiquetaEspesores(porEspesor))}</span>
      <span class="peso-barra"><i style="width:${Math.max(2, Math.round((pesoReal / pesoTrad) * 100))}%"></i></span>
      <span class="peso-val">${Math.round(pesoReal).toLocaleString('en-US')} lb</span>
    </div>
  </div>
  <p class="peso-nota"><strong>${ahorro}% ${esc(t.saving)}</strong> · ${areaTotal.toFixed(1)} sq ft · &lt; 0.5% silica content</p>
</section>`;
}

function generar(datos) {
  const c = datos.cotizacion || {};
  const m = marca(c.empresa);
  const idioma = (c.idioma || m.idioma || 'en').startsWith('es') ? 'es' : 'en';
  const t = T[idioma];
  const moneda = c.moneda || 'USD';
  const secciones = datos.secciones || [];

  let subtotal = 0;
  const bloques = secciones.map((s) => {
    let sub = 0;
    const filas = (s.items || []).map((it) => {
      const total = sumaItem(it);
      sub += total;
      return `<tr>
        <td class="d">
          <strong>${esc(it.descripcion)}</strong>
          ${it.detalle ? `<span class="d-sub">${esc(it.detalle)}</span>` : ''}
          ${(it.material || it.espesor || it.acabado) ? `<span class="d-spec">${esc([it.material, it.espesor, it.acabado].filter(Boolean).join('  ·  '))}</span>` : ''}
        </td>
        <td class="n">${Number(it.cantidad || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
        <td class="u">${esc(it.unidad || '')}</td>
        <td class="n">${money(it.precio_unitario, moneda)}</td>
        <td class="n">${money(total, moneda)}${it.descuento_pct ? `<span class="d-desc">−${it.descuento_pct}%</span>` : ''}</td>
      </tr>`;
    }).join('\n');
    subtotal += sub;
    return `<section class="bloque">
  ${s.titulo ? `<h3 class="bloque-tit">${esc(s.titulo)}</h3>` : ''}
  ${s.nota ? `<p class="bloque-nota">${esc(s.nota)}</p>` : ''}
  <table class="items">
    <thead><tr>
      <th>${esc(t.desc)}</th><th class="n">${esc(t.qty)}</th><th>${esc(t.unit)}</th>
      <th class="n">${esc(t.rate)}</th><th class="n">${esc(t.amount)}</th>
    </tr></thead>
    <tbody>${filas}</tbody>
    ${secciones.length > 1 ? `<tfoot><tr><td colspan="4">${esc(t.subtotal)} — ${esc(s.titulo || '')}</td><td class="n">${money(sub, moneda)}</td></tr></tfoot>` : ''}
  </table>
</section>`;
  }).join('\n');

  /* Cargos adicionales e impuestos */
  const cargos = datos.cargos || [];
  const totalCargos = cargos.reduce((a, x) => a + Number(x.monto || 0), 0);
  const baseImp = subtotal + totalCargos;
  const impuestos = (datos.impuestos || []).map((i) => ({
    ...i, monto: baseImp * (Number(i.porcentaje || 0) / 100),
  }));
  const totalImp = impuestos.reduce((a, x) => a + x.monto, 0);
  const total = baseImp + totalImp;

  const lineasTotales = [
    ...(cargos.length || impuestos.length ? [[t.subtotal, subtotal, '']] : []),
    ...cargos.map((x) => [x.concepto, Number(x.monto || 0), 'menor']),
    ...impuestos.map((x) => [`${x.concepto} (${x.porcentaje}%)`, x.monto, 'menor']),
  ];

  const pagos = (datos.pagos || []).map((p) => ({
    ...p, monto: p.monto !== undefined ? Number(p.monto) : total * (Number(p.porcentaje || 0) / 100),
  }));

  const cli = c.cliente || {};
  const pre = c.preparado_por || {};
  const valido = c.valido_hasta || fechaMas(c.fecha, c.validez_dias);

  const css = `
body{background:#e9e7e4;font-size:14px}
.hoja{max-width:880px;margin:26px auto;background:var(--fondo);padding:52px 56px 60px;
  box-shadow:0 10px 34px rgba(0,0,0,.12)}

.tope{display:flex;justify-content:space-between;align-items:flex-start;gap:30px;
  padding-bottom:22px;border-bottom:2px solid var(--tinta)}
.tope img{height:56px;width:auto}
.tope .emisor{font-size:11px;color:var(--tenue);line-height:1.65;margin-top:10px;letter-spacing:.02em}
.tope .der{text-align:right}
.tope h1{font-family:var(--f-titulo);font-weight:400;font-size:30px;letter-spacing:.18em;margin:0 0 10px}
.tope dl{display:grid;grid-template-columns:auto auto;gap:3px 14px;justify-content:end;font-size:12px;margin:0}
.tope dt{color:var(--tenue)}
.tope dd{margin:0;font-weight:600;font-variant-numeric:tabular-nums}

.partes{display:grid;grid-template-columns:1fr 1fr;gap:34px;padding:24px 0 6px}
.parte h2{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--tenue);
  margin:0 0 8px;font-weight:600}
.parte p{margin:0;line-height:1.6;font-size:13px}
.parte .fuerte{font-family:var(--f-titulo);font-size:17px;font-weight:500;display:block;margin-bottom:2px}

.asunto{margin:26px 0 4px;padding:14px 18px;background:var(--banda)}
.asunto h2{margin:0;font-family:var(--f-titulo);font-weight:500;font-size:19px}
.asunto p{margin:6px 0 0;font-size:12.5px;color:var(--suave);line-height:1.6}

.bloque{margin-top:26px}
.bloque-tit{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--tinta);
  margin:0 0 4px;font-weight:700;border-bottom:1px solid var(--tinta);padding-bottom:6px}
.bloque-nota{margin:8px 0 0;font-size:12px;color:var(--suave);font-style:italic}

.items{width:100%;border-collapse:collapse;margin-top:10px;font-size:12.5px}
.items th{text-align:left;font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;
  color:var(--tenue);font-weight:600;padding:8px 8px;border-bottom:1px solid var(--linea)}
.items td{padding:11px 8px;border-bottom:1px solid var(--linea);vertical-align:top}
.items .n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.items .u{color:var(--suave);font-size:11.5px}
.items .d strong{font-weight:600;display:block}
.items .d-sub{display:block;color:var(--suave);font-size:11.5px;margin-top:3px;line-height:1.5}
.items .d-spec{display:block;color:var(--tenue);font-size:10.5px;margin-top:4px;letter-spacing:.06em;text-transform:uppercase}
.items .d-desc{display:block;color:var(--acento);font-size:10.5px;font-weight:600}
.items tfoot td{border-bottom:0;padding-top:9px;font-size:11.5px;color:var(--suave);text-align:right}

.totales{margin-top:24px;margin-left:auto;width:min(360px,100%)}
.totales .fila{display:flex;justify-content:space-between;gap:20px;padding:7px 0;font-size:13px}
.totales .fila.menor{color:var(--suave);font-size:12.5px}
.totales .fila span:last-child{font-variant-numeric:tabular-nums}
.totales .granTotal{margin-top:8px;border-top:2px solid var(--tinta);padding-top:12px;
  display:flex;justify-content:space-between;align-items:baseline;gap:20px}
.totales .granTotal b{font-size:11px;letter-spacing:.18em}
.totales .granTotal strong{font-family:var(--f-titulo);font-size:29px;font-weight:500;font-variant-numeric:tabular-nums}
.totales .moneda{text-align:right;font-size:10.5px;color:var(--tenue);letter-spacing:.1em;margin-top:2px}

.peso{margin-top:34px;border:1px solid var(--linea);padding:20px 22px}
.peso h3{margin:0 0 14px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--tenue)}
.peso-fila{display:grid;grid-template-columns:170px 1fr 84px;align-items:center;gap:14px;margin-bottom:9px}
.peso-et{font-size:11.5px;color:var(--suave)}
.peso-barra{height:12px;background:var(--banda);display:block}
.peso-barra i{display:block;height:100%;background:var(--tenue)}
.peso-fila--mm .peso-barra i{background:var(--tinta)}
.peso-val{text-align:right;font-size:12px;font-variant-numeric:tabular-nums;font-weight:600}
.peso-nota{margin:12px 0 0;font-size:12px;color:var(--suave)}
.peso-nota strong{color:var(--tinta)}

.plan{margin-top:34px}
.plan h3,.cond h3{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--tenue);
  margin:0 0 12px;font-weight:600}
.plan table{width:100%;border-collapse:collapse;font-size:12.5px}
.plan td{padding:9px 8px;border-bottom:1px solid var(--linea)}
.plan td:last-child{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.plan td:nth-child(2){text-align:right;color:var(--suave);width:60px}

.cond{margin-top:34px}
.cond ol{margin:0;padding-left:18px;font-size:12px;color:var(--suave);line-height:1.75}
.cond li{margin-bottom:5px}

.firma{margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
.firma h3{grid-column:1/-1;font-size:10px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--tenue);margin:0 0 6px;font-weight:600}
.firma .campo{border-bottom:1px solid var(--tinta);height:46px}
.firma label{display:block;font-size:10.5px;color:var(--tenue);margin-top:7px;letter-spacing:.06em}

.pie{margin-top:44px;padding-top:16px;border-top:1px solid var(--linea);
  font-size:10.5px;color:var(--tenue);line-height:1.7;display:flex;
  justify-content:space-between;gap:20px;flex-wrap:wrap}

@media (max-width:720px){
  .hoja{margin:0;padding:26px 20px 40px}
  .tope,.partes,.firma{grid-template-columns:1fr;flex-direction:column}
  .tope .der{text-align:left}.tope dl{justify-content:start}
  .peso-fila{grid-template-columns:1fr;gap:4px}
  .peso-val{text-align:left}
}
@media print{
  @page{size:letter;margin:14mm}
  body{background:#fff}
  .hoja{margin:0;padding:0;box-shadow:none;max-width:none}
  .plan,.cond,.firma,.peso{break-inside:avoid}
}`;

  return `<!doctype html>
<html lang="${esc(idioma)}">
<head>
${head(`${t.quote} ${c.numero || ''} — ${m.nombre}`, css, m)}
</head>
<body>
<div class="hoja">

  <header class="tope">
    <div>
      ${m.logoDataURI ? `<img src="${m.logoDataURI}" alt="${esc(m.nombre)}">` : `<h2>${esc(m.nombre)}</h2>`}
      <p class="emisor">${esc(m.firma)}<br>${esc(m.sitio)}${m.correo ? '<br>' + esc(m.correo) : ''}</p>
    </div>
    <div class="der">
      <h1>${esc(t.quote)}</h1>
      <dl>
        ${c.numero ? `<dt>${esc(t.number)}</dt><dd>${esc(c.numero)}</dd>` : ''}
        ${c.fecha ? `<dt>${esc(t.date)}</dt><dd>${esc(c.fecha)}</dd>` : ''}
        ${valido ? `<dt>${esc(t.valid)}</dt><dd>${esc(valido)}</dd>` : ''}
      </dl>
    </div>
  </header>

  <div class="partes">
    <div class="parte">
      <h2>${esc(t.to)}</h2>
      <p>
        <span class="fuerte">${esc(cli.nombre || '')}</span>
        ${cli.empresa ? esc(cli.empresa) + '<br>' : ''}
        ${cli.direccion ? esc(cli.direccion) + '<br>' : ''}
        ${cli.correo ? esc(cli.correo) + '<br>' : ''}
        ${cli.telefono ? esc(cli.telefono) : ''}
      </p>
    </div>
    <div class="parte">
      <h2>${esc(t.by)}</h2>
      <p>
        <span class="fuerte">${esc(pre.nombre || '')}</span>
        ${pre.cargo ? esc(pre.cargo) + '<br>' : ''}
        ${pre.correo ? esc(pre.correo) + '<br>' : ''}
        ${pre.telefono ? esc(pre.telefono) : ''}
      </p>
    </div>
  </div>

  ${(c.asunto || c.notas_intro) ? `<div class="asunto">
    ${c.asunto ? `<h2>${esc(c.asunto)}</h2>` : ''}
    ${c.notas_intro ? `<p>${esc(c.notas_intro)}</p>` : ''}
  </div>` : ''}

  ${bloques}

  <div class="totales">
    ${lineasTotales.map(([k, v, cls]) => `<div class="fila ${cls}"><span>${esc(k)}</span><span>${money(v, moneda)}</span></div>`).join('\n    ')}
    <div class="granTotal"><b>${esc(t.total)}</b><strong>${money(total, moneda)}</strong></div>
    <p class="moneda">${esc(moneda)}</p>
  </div>

  ${cuadroPeso(secciones, t)}

  ${pagos.length ? `<section class="plan">
    <h3>${esc(t.schedule)}</h3>
    <table><tbody>
      ${pagos.map((p) => `<tr><td>${esc(p.hito)}</td><td>${p.porcentaje ? p.porcentaje + '%' : ''}</td><td>${money(p.monto, moneda)}</td></tr>`).join('\n      ')}
    </tbody></table>
  </section>` : ''}

  ${(datos.condiciones || []).length ? `<section class="cond">
    <h3>${esc(t.terms)}</h3>
    <ol>${(datos.condiciones || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ol>
  </section>` : ''}

  <section class="firma">
    <h3>${esc(t.accept)}</h3>
    <div><div class="campo"></div><label>${esc(t.sign)} — ${esc(t.printName)}</label></div>
    <div><div class="campo"></div><label>${esc(t.dateSign)}</label></div>
  </section>

  <footer class="pie">
    <span>${esc(t.note)}</span>
    <span>${esc(m.nombre)}</span>
  </footer>
</div>
</body>
</html>`;
}

function main() {
  const args = process.argv.slice(2);
  const archivo = args.find((a) => !a.startsWith('--'));
  if (!archivo) {
    console.log('Uso: node herramientas/cotizacion.js <cotizacion.json> [--salida=ruta.html]');
    process.exit(1);
  }
  const opt = {};
  args.filter((a) => a.startsWith('--')).forEach((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    opt[k] = v === undefined ? true : v;
  });
  const abs = path.resolve(process.cwd(), archivo);
  const datos = leerJSON(abs);
  const html = generar(datos);
  const c = datos.cotizacion || {};
  const salida = opt.salida || path.join(RAIZ, 'salidas', `cotizacion-${slug(c.numero || c.fecha || 'sn')}.html`);
  guardar(salida, html);
}

if (require.main === module) main();
module.exports = { generar };
