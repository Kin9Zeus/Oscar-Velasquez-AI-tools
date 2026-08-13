/**
 * presentacion.js — genera el STORYBOARD del proyecto como presentación 16:9.
 *
 * Reproduce el formato que ya usa Oscar en Google Slides para Aspen Leaf:
 *   · banda gris con  "Nombre del espacio | CATEGORÍA"
 *   · nombre del proyecto en vertical sobre el borde derecho
 *   · logo abajo a la derecha
 *   · una lámina por especialidad (floor plan / materials / furniture & lighting /
 *     renderings) y una lámina de FINISH SCHEDULE con los enlaces de proveedor.
 *
 * Salida: un HTML de un solo archivo.
 *   - Se navega con ← → (o rueda del mouse).
 *   - "Imprimir → Guardar como PDF" en HORIZONTAL produce el PDF del storyboard.
 *
 * Uso:
 *   node herramientas/presentacion.js datos/proyectos/goodrich.json
 */

const path = require('path');
const {
  esc, leerJSON, imagen, marca, etiquetaCategoria, guardar, slug, head, RAIZ,
} = require('./lib/comun');

/* Orden de láminas por especialidad, igual al flujo real del estudio. */
const ESPECIALIDADES = [
  { clave: 'plano',      titulo: 'FLOOR PLAN',            cats: [] },
  { clave: 'materiales', titulo: 'MATERIALS',             cats: ['tile', 'stone', 'countertop', 'paint', 'plumbing', 'hardware'] },
  { clave: 'mobiliario', titulo: 'FURNITURE & LIGHTING',  cats: ['furniture', 'lighting', 'textile', 'millwork', 'accessory'] },
  { clave: 'appliances', titulo: 'APPLIANCES',            cats: ['appliance'] },
];

function lamina(contenido, opciones) {
  const { proyecto, marca: m, clase = '' } = opciones;
  return `<section class="lamina ${clase}">
  <div class="lamina-interior">${contenido}</div>
  <div class="canto">${esc(proyecto.codigo || proyecto.nombre || '')}</div>
  ${m.logoDataURI ? `<img class="sello" src="${m.logoDataURI}" alt="${esc(m.nombre)}">` : ''}
</section>`;
}

function banda(nombre, categoria) {
  return `<header class="banda">
    <h2>${esc(nombre)}</h2>
    ${categoria ? `<span class="banda-cat">${esc(categoria)}</span>` : ''}
  </header>`;
}

function pieza(el, baseDir) {
  const img = imagen(el.imagen, baseDir);
  const sub = [el.acabado, el.formato].filter(Boolean).join(' · ');
  return `<figure class="pieza">
    <div class="pieza-img">${img
      ? `<img src="${img}" alt="${esc(el.nombre)}">`
      : `<div class="sin-img">${esc(el.codigo || '—')}</div>`}
      ${el.codigo ? `<span class="cod">${esc(el.codigo)}</span>` : ''}
    </div>
    <figcaption>
      <strong>${esc(el.nombre)}</strong>
      ${el.ubicacion ? `<em>${esc(el.ubicacion)}</em>` : ''}
      ${sub ? `<span>${esc(sub)}</span>` : ''}
    </figcaption>
  </figure>`;
}

function generar(datos, opciones = {}) {
  const baseDir = opciones.baseDir || RAIZ;
  const p = datos.proyecto || {};
  const m = marca(p.empresa);
  const idioma = p.idioma || m.idioma || 'en';
  const laminas = [];

  /* --- Portada --- */
  const portadaImg = imagen(p.portada, baseDir);
  laminas.push(lamina(`
    ${portadaImg ? `<div class="portada-fondo"><img src="${portadaImg}" alt=""></div>` : ''}
    <div class="portada">
      <p class="portada-eyebrow">${esc(m.nombre)}</p>
      <h1>${esc(p.nombre || p.codigo)}</h1>
      <p class="portada-meta">${esc([p.cliente, p.ubicacion].filter(Boolean).join('  ·  '))}</p>
      <p class="portada-meta portada-fecha">${esc([p.disenador || p.diseñador, p.fecha].filter(Boolean).join('  ·  '))}</p>
    </div>`, { proyecto: p, marca: m, clase: 'lamina--portada' }));

  /* --- Índice --- */
  const espacios = datos.espacios || [];
  laminas.push(lamina(`
    ${banda('Project Overview', 'CONTENTS')}
    <ol class="indice">
      ${espacios.map((e) => {
        const nEl = (e.elementos || []).length;
        const nRe = (e.renders || []).length;
        return `<li><span>${esc(e.nombre)}</span><em>${nEl} specs · ${nRe} renderings</em></li>`;
      }).join('\n      ')}
    </ol>`, { proyecto: p, marca: m }));

  /* --- Láminas por espacio --- */
  espacios.forEach((espacio) => {
    const elementos = espacio.elementos || [];

    // 1. Floor plan (y demás planos)
    (espacio.planos || []).forEach((pl) => {
      const src = imagen(pl.imagen || pl, baseDir);
      if (!src) return;
      laminas.push(lamina(`
        ${banda(espacio.nombre, pl.titulo || 'FLOOR PLAN')}
        <div class="marco-plano"><img src="${src}" alt="${esc(espacio.nombre)}"></div>`,
        { proyecto: p, marca: m }));
    });

    // 2. Especialidades
    ESPECIALIDADES.filter((sp) => sp.cats.length).forEach((sp) => {
      const grupo = elementos.filter((el) => sp.cats.includes(el.categoria));
      if (!grupo.length) return;
      // Máximo 8 piezas por lámina para que respire, igual que en Slides.
      for (let i = 0; i < grupo.length; i += 8) {
        const trozo = grupo.slice(i, i + 8);
        const sufijo = grupo.length > 8 ? ` (${Math.floor(i / 8) + 1}/${Math.ceil(grupo.length / 8)})` : '';
        laminas.push(lamina(`
          ${banda(espacio.nombre, sp.titulo + sufijo)}
          <div class="mosaico n${trozo.length}">${trozo.map((el) => pieza(el, baseDir)).join('\n')}</div>`,
          { proyecto: p, marca: m }));
      }
    });

    // 3. Renderings
    (espacio.renders || []).forEach((r, i) => {
      const obj = typeof r === 'string' ? { imagen: r } : r;
      const src = imagen(obj.imagen, baseDir);
      if (!src) return;
      laminas.push(lamina(`
        ${banda(espacio.nombre, obj.titulo || (i === 0 ? 'RENDERING' : `RENDERING ${i + 1}`))}
        <div class="marco-render"><img src="${src}" alt="${esc(espacio.nombre)}"></div>`,
        { proyecto: p, marca: m, clase: 'lamina--render' }));
    });

    // 4. Finish schedule con enlaces
    if (elementos.length) {
      const filas = elementos.map((el) => `<tr>
        <td class="c-cod">${esc(el.codigo || '')}</td>
        <td>${esc(etiquetaCategoria(el.categoria, idioma))}</td>
        <td><strong>${esc(el.nombre)}</strong>${el.ubicacion ? `<br><span class="c-sub">${esc(el.ubicacion)}</span>` : ''}</td>
        <td>${esc(el.proveedor || '')}</td>
        <td>${esc([el.acabado, el.color].filter(Boolean).join(' / '))}</td>
        <td>${esc(el.formato || '')}</td>
        <td class="c-link">${el.url ? `<a href="${esc(el.url)}" target="_blank" rel="noopener">Link ↗</a>` : '—'}</td>
      </tr>`).join('\n');
      // 7 filas por lámina. Parece poco, pero las filas con nombre a dos
      // líneas crecen y con más de 7 la tabla se sale del 16:9 y se corta.
      const trozos = [];
      const arr = filas.split('</tr>\n').filter(Boolean).map((s) => s + '</tr>');
      for (let i = 0; i < arr.length; i += 7) trozos.push(arr.slice(i, i + 7));
      trozos.forEach((t, i) => {
        const sufijo = trozos.length > 1 ? ` (${i + 1}/${trozos.length})` : '';
        laminas.push(lamina(`
          ${banda(espacio.nombre, 'FINISH SCHEDULE' + sufijo)}
          <table class="schedule">
            <thead><tr><th>Code</th><th>Category</th><th>Item</th><th>Vendor</th><th>Finish / Color</th><th>Size</th><th>Spec</th></tr></thead>
            <tbody>${t.join('\n')}</tbody>
          </table>`, { proyecto: p, marca: m, clase: 'lamina--tabla' }));
      });
    }
  });

  /* --- Cierre --- */
  laminas.push(lamina(`
    <div class="cierre">
      <p class="portada-eyebrow">${esc(m.nombre)}</p>
      <h1>Thank you</h1>
      <p class="portada-meta">${esc(m.sitio)}${m.correo ? '  ·  ' + esc(m.correo) : ''}</p>
    </div>`, { proyecto: p, marca: m, clase: 'lamina--portada' }));

  const css = `
body{background:#3a3a3a;font-size:16px}
.escenario{display:flex;flex-direction:column;align-items:center;gap:26px;padding:26px 16px 90px}
.lamina{position:relative;width:min(1280px,calc(100vw - 32px));aspect-ratio:16/9;
  background:var(--fondo);overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.34);
  container-type:inline-size}
.lamina-interior{position:absolute;inset:0;padding:3.2cqw 6.4cqw 4.4cqw 3.6cqw;
  display:flex;flex-direction:column}
.canto{position:absolute;right:0;top:0;bottom:0;width:5.2cqw;border-left:1px solid var(--linea);
  display:grid;place-items:center;font-family:var(--f-titulo);font-size:2.05cqw;
  letter-spacing:.16em;color:var(--tinta);writing-mode:vertical-rl;text-orientation:mixed}
.sello{position:absolute;right:6.6cqw;bottom:2.4cqw;height:4.6cqw;width:auto;opacity:.92}

/* Banda de título, igual a Google Slides */
.banda{display:flex;align-items:center;gap:1.2cqw;background:var(--banda);
  padding:.9cqw 1.6cqw;align-self:flex-start;max-width:100%;margin-bottom:2.2cqw}
.banda h2{font-family:var(--f-titulo);font-weight:400;font-size:2.5cqw;margin:0;line-height:1.15}
.banda-cat{border-left:.28cqw solid var(--tinta);padding-left:.9cqw;font-size:1.15cqw;
  font-weight:700;letter-spacing:.05em;line-height:1.15;color:var(--tinta);white-space:pre-line}

/* Portada */
.lamina--portada .lamina-interior{justify-content:center}
.portada-fondo{position:absolute;inset:0}
.portada-fondo img{width:100%;height:100%;object-fit:cover;opacity:.34}
.portada,.cierre{position:relative}
.portada-eyebrow{margin:0 0 1.4cqw;font-size:1.05cqw;letter-spacing:.28em;text-transform:uppercase;color:var(--suave)}
.portada h1,.cierre h1{font-family:var(--f-titulo);font-weight:300;font-size:6cqw;margin:0 0 1.4cqw;line-height:1.02}
.portada-meta{margin:0;font-size:1.35cqw;color:var(--suave);letter-spacing:.08em}
.portada-fecha{margin-top:.5cqw;color:var(--tenue)}

/* Índice */
.indice{list-style:none;counter-reset:i;margin:0;padding:0;
  display:grid;grid-template-columns:1fr 1fr;gap:.9cqw 3cqw;align-content:start}
.indice li{counter-increment:i;display:flex;justify-content:space-between;align-items:baseline;
  gap:1.4cqw;border-bottom:1px solid var(--linea);padding:.8cqw 0;font-size:1.4cqw}
.indice li::before{content:counter(i,decimal-leading-zero);color:var(--tenue);
  font-size:1.05cqw;letter-spacing:.1em;margin-right:.9cqw}
.indice li span{flex:1;font-family:var(--f-titulo);font-size:1.75cqw}
.indice li em{font-style:normal;font-size:1.05cqw;color:var(--tenue);letter-spacing:.06em}

/* Planos y renders */
.marco-plano,.marco-render{flex:1;display:grid;place-items:center;min-height:0}
.marco-plano img,.marco-render img{max-width:100%;max-height:100%;object-fit:contain}
.marco-render img{box-shadow:0 .3cqw 1.6cqw rgba(0,0,0,.13)}

/* Mosaico de materiales / mobiliario */
.mosaico{flex:1;display:grid;gap:1.5cqw;min-height:0;
  grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr}
.mosaico.n1{grid-template-columns:1fr}
.mosaico.n2{grid-template-columns:repeat(2,1fr)}
.mosaico.n3{grid-template-columns:repeat(3,1fr)}
.mosaico.n5,.mosaico.n6{grid-template-columns:repeat(3,1fr)}
.pieza{margin:0;display:flex;flex-direction:column;min-height:0}
.pieza-img{position:relative;flex:1;min-height:0;background:var(--banda);overflow:hidden}
.pieza-img img{width:100%;height:100%;object-fit:cover}
.sin-img{width:100%;height:100%;display:grid;place-items:center;color:var(--tenue);font-size:1.2cqw}
.cod{position:absolute;left:0;top:0;background:var(--tinta);color:#fff;
  font-size:.85cqw;letter-spacing:.1em;font-weight:700;padding:.3cqw .7cqw}
.pieza figcaption{padding-top:.6cqw;display:flex;flex-direction:column;gap:.15cqw;line-height:1.3}
.pieza figcaption strong{font-family:var(--f-titulo);font-weight:500;font-size:1.15cqw}
.pieza figcaption em{font-style:normal;font-size:.9cqw;color:var(--tenue);letter-spacing:.05em;text-transform:uppercase}
.pieza figcaption span{font-size:.95cqw;color:var(--suave)}

/* Finish schedule — deja aire abajo para que el sello no pise la tabla */
.lamina--tabla .lamina-interior{padding-bottom:7.5cqw}
.schedule{width:100%;border-collapse:collapse;font-size:1.05cqw}
.schedule th{text-align:left;font-size:.85cqw;letter-spacing:.12em;text-transform:uppercase;
  color:var(--tenue);font-weight:600;padding:.55cqw .7cqw;border-bottom:1px solid var(--tinta)}
.schedule td{padding:.6cqw .7cqw;border-bottom:1px solid var(--linea);vertical-align:top}
.schedule .c-cod{font-weight:700;letter-spacing:.06em;white-space:nowrap}
.schedule .c-sub{color:var(--tenue);font-size:.9cqw}
.schedule .c-link a{color:var(--acento);text-decoration:none;font-weight:600;white-space:nowrap}

/* Navegación */
.nav{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:50;
  display:flex;gap:10px;align-items:center;background:rgba(20,20,20,.86);
  color:#fff;padding:8px 14px;border-radius:999px;font-size:13px;backdrop-filter:blur(6px)}
.nav button{background:none;border:0;color:#fff;font:inherit;font-size:17px;cursor:pointer;
  padding:0 6px;line-height:1;opacity:.85}
.nav button:hover{opacity:1}
.nav .cuenta{min-width:62px;text-align:center;letter-spacing:.06em;font-variant-numeric:tabular-nums}

@media print{
  @page{size:landscape;margin:0}
  body{background:#fff}
  .escenario{gap:0;padding:0}
  .nav{display:none}
  .lamina{width:100%;box-shadow:none;break-after:page;aspect-ratio:16/9}
  .lamina:last-child{break-after:auto}
}`;

  const js = `
(function(){
  var laminas=Array.prototype.slice.call(document.querySelectorAll('.lamina'));
  var cuenta=document.getElementById('cuenta');
  var i=0;
  function ir(n){
    i=Math.max(0,Math.min(laminas.length-1,n));
    laminas[i].scrollIntoView({behavior:'smooth',block:'center'});
    cuenta.textContent=(i+1)+' / '+laminas.length;
  }
  document.getElementById('ant').onclick=function(){ir(i-1);};
  document.getElementById('sig').onclick=function(){ir(i+1);};
  document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();ir(i+1);}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();ir(i-1);}
    if(e.key==='Home'){e.preventDefault();ir(0);}
    if(e.key==='End'){e.preventDefault();ir(laminas.length-1);}
  });
  var obs=new IntersectionObserver(function(ents){
    ents.forEach(function(en){
      if(en.isIntersecting){i=laminas.indexOf(en.target);cuenta.textContent=(i+1)+' / '+laminas.length;}
    });
  },{threshold:.6});
  laminas.forEach(function(l){obs.observe(l);});
  cuenta.textContent='1 / '+laminas.length;
})();`;

  return `<!doctype html>
<html lang="${esc(idioma)}">
<head>
${head(`${p.nombre || p.codigo} — Storyboard`, css, m)}
</head>
<body>
<div class="escenario">
${laminas.join('\n')}
</div>
<div class="nav">
  <button id="ant" title="Anterior (←)">‹</button>
  <span class="cuenta" id="cuenta"></span>
  <button id="sig" title="Siguiente (→)">›</button>
</div>
<script>${js}</script>
</body>
</html>`;
}

function main() {
  const args = process.argv.slice(2);
  const archivo = args.find((a) => !a.startsWith('--'));
  if (!archivo) {
    console.log('Uso: node herramientas/presentacion.js <datos.json> [--salida=ruta.html]');
    process.exit(1);
  }
  const opt = {};
  args.filter((a) => a.startsWith('--')).forEach((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    opt[k] = v === undefined ? true : v;
  });
  const abs = path.resolve(process.cwd(), archivo);
  const datos = leerJSON(abs);
  const html = generar(datos, { baseDir: path.dirname(abs) });
  const p = datos.proyecto || {};
  const salida = opt.salida || path.join(RAIZ, 'salidas', `${slug(p.codigo || p.nombre)}-storyboard.html`);
  guardar(salida, html);
}

if (require.main === module) main();
module.exports = { generar };
