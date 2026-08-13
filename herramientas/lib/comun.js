/**
 * comun.js — utilidades compartidas por los generadores.
 *
 * Sin dependencias externas: solo Node.js estándar.
 * Esto es intencional: Oscar solo necesita instalar Node y nada más.
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
};

/** Escapa texto para insertarlo en HTML. */
function esc(v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Lee un JSON y da un error legible si está mal formado. */
function leerJSON(ruta) {
  const abs = path.isAbsolute(ruta) ? ruta : path.resolve(process.cwd(), ruta);
  let texto;
  try {
    texto = fs.readFileSync(abs, 'utf8');
  } catch (e) {
    throw new Error(`No pude leer el archivo de datos: ${abs}\n${e.message}`);
  }
  try {
    return JSON.parse(texto.replace(/^﻿/, ''));
  } catch (e) {
    throw new Error(`El archivo ${path.basename(abs)} no es un JSON válido.\n${e.message}`);
  }
}

/**
 * Convierte una imagen local en data URI para que el HTML sea UN SOLO archivo
 * que se puede enviar por correo o WhatsApp sin carpetas adjuntas.
 * Si la referencia ya es una URL (http/https/data), se devuelve tal cual.
 */
function imagen(ref, baseDir) {
  if (!ref) return '';
  if (/^(https?:|data:)/i.test(ref)) return ref;

  const candidatos = [
    path.resolve(baseDir || RAIZ, ref),
    path.resolve(RAIZ, ref),
  ];
  for (const abs of candidatos) {
    if (fs.existsSync(abs) && fs.statSync(abs).isFile()) {
      const ext = path.extname(abs).toLowerCase();
      const mime = MIME[ext] || 'application/octet-stream';
      const b64 = fs.readFileSync(abs).toString('base64');
      return `data:${mime};base64,${b64}`;
    }
  }
  console.warn(`  ⚠  No encontré la imagen: ${ref}`);
  return '';
}

/* ------------------------------------------------------------------ */
/* Identidad de marca                                                  */
/* ------------------------------------------------------------------ */

const MARCAS = {
  'aspen-leaf': {
    nombre: 'Aspen Leaf Interiors',
    firma: 'By Marcio Decker',
    sitio: 'www.aspenleafinteriors.com',
    correo: '',
    logo: 'aspen_leaf_interiors/aspen_leaf_interiors_logo.jpeg',
    idioma: 'en',
    tokens: {
      tinta: '#2b2724',
      suave: '#7a726c',
      tenue: '#a8a09a',
      linea: '#e2ddd8',
      banda: '#f1efec',
      fondo: '#ffffff',
      acento: '#8c7f75',
      titulo: "'Cormorant Garamond', 'Georgia', 'Times New Roman', serif",
      texto: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    },
  },
  millimeter: {
    nombre: 'MILLIMETER by Casanova',
    firma: 'Fine Materials Design · MILLIMETER Global LLC · Houston, USA',
    sitio: 'www.millimeterbycasanova.com',
    correo: 'info@millimeterbycasanova.com',
    logo: 'millimeter_by_casanova/millimeter_by_casanova_logo.jpeg',
    idioma: 'en',
    tokens: {
      tinta: '#0e0e0e',
      suave: '#5c5c5c',
      tenue: '#9a9a9a',
      linea: '#e4e4e4',
      banda: '#f4f4f4',
      fondo: '#ffffff',
      acento: '#0e0e0e',
      titulo: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      texto: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    },
  },
};

function marca(id) {
  const m = MARCAS[id] || MARCAS['aspen-leaf'];
  return { ...m, logoDataURI: imagen(m.logo, RAIZ) };
}

/** Variables CSS derivadas de la marca. */
function cssMarca(m) {
  const t = m.tokens;
  return `:root{
  --tinta:${t.tinta}; --suave:${t.suave}; --tenue:${t.tenue};
  --linea:${t.linea}; --banda:${t.banda}; --fondo:${t.fondo}; --acento:${t.acento};
  --f-titulo:${t.titulo}; --f-texto:${t.texto};
}`;
}

/* ------------------------------------------------------------------ */
/* Categorías de especificación (vocabulario del estudio)              */
/* ------------------------------------------------------------------ */

const CATEGORIAS = {
  tile:        { es: 'Tile / Cerámica',      en: 'Tile',              prefijo: 'T'  },
  stone:       { es: 'Piedra natural',       en: 'Natural Stone',     prefijo: 'S'  },
  countertop:  { es: 'Countertop',           en: 'Countertop',        prefijo: 'C'  },
  plumbing:    { es: 'Grifería / Plumbing',  en: 'Plumbing',          prefijo: 'P'  },
  lighting:    { es: 'Iluminación',          en: 'Lighting',          prefijo: 'LT' },
  furniture:   { es: 'Mobiliario',           en: 'Furniture',         prefijo: 'F'  },
  hardware:    { es: 'Herrajes',             en: 'Hardware',          prefijo: 'BH' },
  paint:       { es: 'Pintura / Acabado',    en: 'Paint & Finish',    prefijo: 'PT' },
  appliance:   { es: 'Electrodomésticos',    en: 'Appliances',        prefijo: 'A'  },
  textile:     { es: 'Textiles',             en: 'Textiles',          prefijo: 'TX' },
  millwork:    { es: 'Carpintería',          en: 'Millwork',          prefijo: 'MW' },
  accessory:   { es: 'Accesorios',           en: 'Accessories',       prefijo: 'AC' },
};

function etiquetaCategoria(cat, idioma) {
  const c = CATEGORIAS[cat];
  if (!c) return cat || 'Otros';
  return idioma === 'es' ? c.es : c.en;
}

/* ------------------------------------------------------------------ */
/* Salida                                                              */
/* ------------------------------------------------------------------ */

function guardar(rutaSalida, html) {
  const abs = path.isAbsolute(rutaSalida) ? rutaSalida : path.resolve(process.cwd(), rutaSalida);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, html, 'utf8');
  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
  console.log(`  ✓ ${path.relative(RAIZ, abs)}  (${kb} KB)`);
  return abs;
}

/** Nombre de archivo seguro. */
function slug(s) {
  return String(s || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sin-nombre';
}

/** Formatea dinero. */
function money(n, moneda = 'USD') {
  const v = Number(n || 0);
  const simbolo = moneda === 'COP' ? '$' : '$';
  const partes = v.toFixed(2).split('.');
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${simbolo}${partes.join('.')}`;
}

/** Bloque <head> común. */
function head(titulo, cssExtra, m) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<style>
${cssMarca(m)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--fondo);color:var(--tinta);font-family:var(--f-texto);
     font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit}
${cssExtra}
</style>`;
}

module.exports = {
  RAIZ, esc, leerJSON, imagen, marca, cssMarca, CATEGORIAS,
  etiquetaCategoria, guardar, slug, money, head,
};
