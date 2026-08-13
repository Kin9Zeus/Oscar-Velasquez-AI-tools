/**
 * moodboard.js — genera un MOODBOARD INTERACTIVO en un solo archivo .html
 *
 * Qué produce:
 *   - Un HTML autocontenido (imágenes embebidas) que se puede enviar por
 *     correo/WhatsApp y abrir en cualquier navegador, sin internet.
 *   - Cada elemento es una tarjeta con foto, código de especificación,
 *     acabado, formato y ENLACE DIRECTO AL PROVEEDOR.
 *   - Filtros por categoría + buscador.
 *   - Hotspots opcionales sobre el render: el cliente hace clic en un punto
 *     de la imagen y salta a la ficha del material.
 *   - Estilo de impresión: "Imprimir → Guardar como PDF" da un PDF limpio.
 *
 * Uso:
 *   node herramientas/moodboard.js datos/proyectos/goodrich.json
 *   node herramientas/moodboard.js datos/proyectos/goodrich.json --espacio=upper-bath-3
 */

const path = require('path');
const {
  esc, leerJSON, imagen, marca, etiquetaCategoria, guardar, slug, head, RAIZ,
} = require('./lib/comun');

/* ------------------------------------------------------------------ */

function tarjeta(el, baseDir, idioma, indice) {
  const img = imagen(el.imagen, baseDir);
  const cat = etiquetaCategoria(el.categoria, idioma);
  const detalles = [
    ['Finish / Acabado', el.acabado],
    ['Size / Formato', el.formato],
    ['Color', el.color],
    ['Location / Ubicación', el.ubicacion],
    ['Qty / Cantidad', el.cantidad ? `${el.cantidad.valor} ${el.cantidad.unidad}` : ''],
  ].filter(([, v]) => v);

  return `<article class="ficha" id="el-${indice}" data-cat="${esc(el.categoria || 'otros')}"
  data-buscar="${esc([el.codigo, el.nombre, el.proveedor, el.acabado, el.color, el.formato, el.ubicacion].filter(Boolean).join(' ').toLowerCase())}">
  <div class="ficha-img">
    ${img ? `<img src="${img}" alt="${esc(el.nombre)}" loading="lazy">` : `<div class="sin-img">sin imagen</div>`}
    ${el.codigo ? `<span class="codigo">${esc(el.codigo)}</span>` : ''}
  </div>
  <div class="ficha-cuerpo">
    <p class="cat">${esc(cat)}</p>
    <h3>${esc(el.nombre)}</h3>
    ${el.proveedor ? `<p class="prov">${esc(el.proveedor)}</p>` : ''}
    ${detalles.length ? `<dl>${detalles.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : ''}
    ${el.notas ? `<p class="notas">${esc(el.notas)}</p>` : ''}
    ${el.url
      ? `<a class="link" href="${esc(el.url)}" target="_blank" rel="noopener">Ver en proveedor <span aria-hidden="true">↗</span></a>`
      : `<span class="link link--off">Sin enlace</span>`}
  </div>
</article>`;
}

function bloqueRender(espacio, baseDir) {
  const renders = (espacio.renders || []).map((r) => (typeof r === 'string' ? { imagen: r } : r));
  if (!renders.length) return '';

  // __idx es el índice GLOBAL de la tarjeta (se asigna en generar()), no el
  // índice dentro del espacio: si no, los hotspots del segundo espacio
  // apuntarían a las fichas del primero.
  const hotspotsPorRender = {};
  (espacio.elementos || []).forEach((el) => {
    if (!el.hotspot) return;
    const idx = el.hotspot.render || 0;
    (hotspotsPorRender[idx] = hotspotsPorRender[idx] || []).push({ i: el.__idx, el });
  });

  return `<section class="renders">
${renders.map((r, idx) => {
    const src = imagen(r.imagen, baseDir);
    if (!src) return '';
    const puntos = (hotspotsPorRender[idx] || []).map(({ i, el }) => `
      <button class="hotspot" style="left:${Number(el.hotspot.x)}%;top:${Number(el.hotspot.y)}%"
        data-destino="el-${i}" title="${esc(el.nombre)}"><span>${esc(el.codigo || '•')}</span></button>`).join('');
    return `<figure class="render">
      <div class="render-lienzo">
        <img src="${src}" alt="${esc(r.titulo || espacio.nombre)}">
        ${puntos}
      </div>
      ${r.titulo ? `<figcaption>${esc(r.titulo)}</figcaption>` : ''}
    </figure>`;
  }).join('\n')}
</section>`;
}

function generar(datos, opciones = {}) {
  const baseDir = opciones.baseDir || RAIZ;
  const p = datos.proyecto || {};
  const m = marca(p.empresa);
  const idioma = p.idioma || m.idioma || 'en';

  let espacios = datos.espacios || [];
  if (opciones.espacio) espacios = espacios.filter((e) => e.id === opciones.espacio);
  if (!espacios.length) throw new Error('No hay espacios que generar (¿el --espacio existe en el JSON?).');

  const todos = espacios.flatMap((e) => e.elementos || []);
  const cats = [...new Set(todos.map((e) => e.categoria).filter(Boolean))];

  // Numeración global de fichas, compartida por tarjetas y hotspots.
  let n = 0;
  espacios.forEach((e) => (e.elementos || []).forEach((el) => { el.__idx = n++; }));

  const cuerpo = espacios.map((espacio) => {
    const fichas = (espacio.elementos || [])
      .map((el) => tarjeta(el, baseDir, idioma, el.__idx)).join('\n');
    return `<section class="espacio">
  <header class="banda">
    <h2>${esc(espacio.nombre)}</h2>
    <span class="banda-sub">MATERIALS &amp; SPECIFICATIONS</span>
  </header>
  ${bloqueRender(espacio, baseDir)}
  <div class="rejilla">${fichas}</div>
</section>`;
  }).join('\n');

  const titulo = `${p.nombre || p.codigo || 'Proyecto'} — Moodboard`;

  const css = `
.hoja{max-width:1180px;margin:0 auto;padding:0 28px 80px}
.cabecera{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;
  padding:34px 0 22px;border-bottom:1px solid var(--linea);margin-bottom:30px}
.cabecera h1{font-family:var(--f-titulo);font-weight:400;font-size:34px;margin:0 0 4px;letter-spacing:.01em}
.cabecera .meta{color:var(--suave);font-size:13px;margin:0}
.cabecera .marca{text-align:right;flex:0 0 auto}
.cabecera .marca img{height:52px;width:auto;margin-left:auto;filter:contrast(1.05)}
.cabecera .marca p{margin:6px 0 0;font-size:11px;color:var(--tenue);letter-spacing:.06em;text-transform:uppercase}

.controles{position:sticky;top:0;z-index:20;background:var(--fondo);
  padding:14px 0;border-bottom:1px solid var(--linea);display:flex;gap:14px;
  flex-wrap:wrap;align-items:center;margin-bottom:26px}
.chips{display:flex;gap:7px;flex-wrap:wrap}
.chip{border:1px solid var(--linea);background:transparent;color:var(--suave);
  border-radius:999px;padding:6px 14px;font:inherit;font-size:12.5px;cursor:pointer;
  letter-spacing:.03em;transition:.15s}
.chip:hover{border-color:var(--tenue);color:var(--tinta)}
.chip[aria-pressed="true"]{background:var(--tinta);border-color:var(--tinta);color:#fff}
.buscar{margin-left:auto;border:1px solid var(--linea);border-radius:999px;
  padding:8px 16px;font:inherit;font-size:13px;min-width:210px;color:var(--tinta);background:transparent}
.buscar:focus{outline:none;border-color:var(--tinta)}

.banda{display:flex;align-items:center;gap:16px;background:var(--banda);
  padding:13px 22px;margin:44px 0 24px}
.banda h2{font-family:var(--f-titulo);font-weight:400;font-size:25px;margin:0}
.banda-sub{border-left:3px solid var(--tinta);padding-left:12px;font-size:11px;
  letter-spacing:.14em;color:var(--suave);font-weight:600}

.renders{display:grid;gap:20px;margin-bottom:34px}
.render{margin:0}
.render-lienzo{position:relative;line-height:0;border:1px solid var(--linea)}
.render figcaption{font-size:12px;color:var(--suave);padding-top:8px;letter-spacing:.04em}
.hotspot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;
  border-radius:50%;border:2px solid #fff;background:rgba(20,20,20,.82);color:#fff;
  font:600 10px/1 var(--f-texto);cursor:pointer;display:grid;place-items:center;
  box-shadow:0 2px 10px rgba(0,0,0,.35);transition:.15s}
.hotspot:hover,.hotspot.activo{background:#fff;color:#111;transform:translate(-50%,-50%) scale(1.18)}

.rejilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:22px}
.ficha{border:1px solid var(--linea);background:#fff;display:flex;flex-direction:column;
  transition:.18s;scroll-margin-top:110px}
.ficha:hover{border-color:var(--tenue);box-shadow:0 6px 22px rgba(0,0,0,.07)}
.ficha.resaltada{border-color:var(--tinta);box-shadow:0 0 0 2px var(--tinta)}
.ficha[hidden]{display:none}
.ficha-img{position:relative;aspect-ratio:4/3;background:var(--banda);overflow:hidden}
.ficha-img img{width:100%;height:100%;object-fit:cover}
.sin-img{width:100%;height:100%;display:grid;place-items:center;color:var(--tenue);font-size:12px}
.codigo{position:absolute;left:0;top:0;background:var(--tinta);color:#fff;
  font-size:10.5px;letter-spacing:.1em;font-weight:600;padding:4px 9px}
.ficha-cuerpo{padding:14px 15px 16px;display:flex;flex-direction:column;flex:1}
.cat{margin:0 0 5px;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--tenue)}
.ficha h3{font-family:var(--f-titulo);font-weight:500;font-size:17px;line-height:1.25;margin:0 0 5px}
.prov{margin:0 0 10px;font-size:12px;color:var(--suave)}
.ficha dl{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin:0 0 10px;font-size:11.5px}
.ficha dt{color:var(--tenue);white-space:nowrap}
.ficha dd{margin:0;color:var(--tinta)}
.notas{margin:0 0 10px;font-size:11.5px;color:var(--suave);font-style:italic}
.link{margin-top:auto;font-size:12px;letter-spacing:.04em;text-decoration:none;
  border-top:1px solid var(--linea);padding-top:10px;color:var(--tinta);font-weight:500}
.link:hover{color:var(--acento)}
.link--off{color:var(--tenue);font-weight:400}

.pie{margin-top:56px;padding-top:18px;border-top:1px solid var(--linea);
  display:flex;justify-content:space-between;gap:18px;font-size:11px;color:var(--tenue);flex-wrap:wrap}

@media (max-width:640px){
  .hoja{padding:0 16px 60px}
  .cabecera{flex-direction:column;align-items:flex-start}
  .cabecera .marca{text-align:left}
  .cabecera .marca img{margin-left:0}
  .buscar{margin-left:0;width:100%}
}
@media print{
  .controles{display:none}
  .hoja{max-width:none;padding:0}
  .ficha{break-inside:avoid;box-shadow:none}
  .espacio{break-before:page}
  .espacio:first-of-type{break-before:auto}
  .hotspot{box-shadow:none}
}`;

  const js = `
(function(){
  var chips=document.querySelectorAll('.chip');
  var buscar=document.getElementById('buscar');
  var fichas=Array.prototype.slice.call(document.querySelectorAll('.ficha'));
  var filtro='todos';
  function aplicar(){
    var q=(buscar.value||'').trim().toLowerCase();
    fichas.forEach(function(f){
      var okCat = filtro==='todos' || f.dataset.cat===filtro;
      var okQ   = !q || f.dataset.buscar.indexOf(q)>-1;
      f.hidden = !(okCat && okQ);
    });
  }
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(o){o.setAttribute('aria-pressed','false');});
      c.setAttribute('aria-pressed','true');
      filtro=c.dataset.cat; aplicar();
    });
  });
  buscar.addEventListener('input',aplicar);

  document.querySelectorAll('.hotspot').forEach(function(h){
    h.addEventListener('click',function(){
      var d=document.getElementById(h.dataset.destino);
      if(!d)return;
      d.hidden=false;
      d.scrollIntoView({behavior:'smooth',block:'center'});
      document.querySelectorAll('.ficha.resaltada').forEach(function(x){x.classList.remove('resaltada');});
      d.classList.add('resaltada');
      setTimeout(function(){d.classList.remove('resaltada');},2600);
    });
    h.addEventListener('mouseenter',function(){
      var d=document.getElementById(h.dataset.destino);
      if(d) d.classList.add('resaltada');
    });
    h.addEventListener('mouseleave',function(){
      var d=document.getElementById(h.dataset.destino);
      if(d) d.classList.remove('resaltada');
    });
  });
})();`;

  const metaLinea = [p.cliente, p.ubicacion, p.fecha].filter(Boolean).join('  ·  ');

  return `<!doctype html>
<html lang="${esc(idioma)}">
<head>
${head(titulo, css, m)}
</head>
<body>
<div class="hoja">
  <header class="cabecera">
    <div>
      <h1>${esc(p.nombre || p.codigo || 'Proyecto')}</h1>
      <p class="meta">${esc(metaLinea)}</p>
    </div>
    <div class="marca">
      ${m.logoDataURI ? `<img src="${m.logoDataURI}" alt="${esc(m.nombre)}">` : `<strong>${esc(m.nombre)}</strong>`}
      <p>${esc(p.disenador || p.diseñador || '')}</p>
    </div>
  </header>

  <div class="controles">
    <div class="chips">
      <button class="chip" data-cat="todos" aria-pressed="true">Todos</button>
      ${cats.map((c) => `<button class="chip" data-cat="${esc(c)}" aria-pressed="false">${esc(etiquetaCategoria(c, idioma))}</button>`).join('\n      ')}
    </div>
    <input class="buscar" id="buscar" type="search" placeholder="Buscar material, proveedor, código…" aria-label="Buscar">
  </div>

${cuerpo}

  <footer class="pie">
    <span>${esc(m.nombre)}${m.firma ? ' · ' + esc(m.firma) : ''}</span>
    <span>${esc(m.sitio)}${m.correo ? ' · ' + esc(m.correo) : ''}</span>
  </footer>
</div>
<script>${js}</script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */

function main() {
  const args = process.argv.slice(2);
  const archivo = args.find((a) => !a.startsWith('--'));
  if (!archivo) {
    console.log('Uso: node herramientas/moodboard.js <datos.json> [--espacio=id] [--salida=ruta.html]');
    process.exit(1);
  }
  const opt = {};
  args.filter((a) => a.startsWith('--')).forEach((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    opt[k] = v === undefined ? true : v;
  });

  const abs = path.resolve(process.cwd(), archivo);
  const datos = leerJSON(abs);
  const html = generar(datos, { baseDir: path.dirname(abs), espacio: opt.espacio });

  const p = datos.proyecto || {};
  const salida = opt.salida || path.join(RAIZ, 'salidas',
    `${slug(p.codigo || p.nombre)}-moodboard${opt.espacio ? '-' + slug(opt.espacio) : ''}.html`);
  guardar(salida, html);
}

if (require.main === module) main();
module.exports = { generar };
