#!/usr/bin/env node
/**
 * generar.js — punto de entrada único.
 *
 *   node herramientas/generar.js                          → genera TODO lo de datos/
 *   node herramientas/generar.js moodboard <archivo.json>
 *   node herramientas/generar.js storyboard <archivo.json>
 *   node herramientas/generar.js cotizacion <archivo.json>
 *
 * Todo sale a la carpeta  salidas/.
 */

const fs = require('fs');
const path = require('path');
const { leerJSON, guardar, slug, RAIZ } = require('./lib/comun');

const moodboard = require('./moodboard');
const presentacion = require('./presentacion');
const cotizacion = require('./cotizacion');

function listar(dir, ext = '.json') {
  const abs = path.join(RAIZ, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => f.endsWith(ext)).map((f) => path.join(abs, f));
}

function unProyecto(archivo) {
  const datos = leerJSON(archivo);
  const p = datos.proyecto || {};
  const base = slug(p.codigo || p.nombre || path.basename(archivo, '.json'));
  const opciones = { baseDir: path.dirname(archivo) };
  guardar(path.join(RAIZ, 'salidas', `${base}-moodboard.html`), moodboard.generar(datos, opciones));
  guardar(path.join(RAIZ, 'salidas', `${base}-storyboard.html`), presentacion.generar(datos, opciones));
}

function unaCotizacion(archivo) {
  const datos = leerJSON(archivo);
  const c = datos.cotizacion || {};
  const base = slug(c.numero || path.basename(archivo, '.json'));
  guardar(path.join(RAIZ, 'salidas', `cotizacion-${base}.html`), cotizacion.generar(datos));
}

function main() {
  const [cmd, archivo] = process.argv.slice(2);

  if (!cmd || cmd === 'todo') {
    const proyectos = listar('datos/proyectos');
    const cotizaciones = listar('datos/cotizaciones');
    if (!proyectos.length && !cotizaciones.length) {
      console.log('No encontré nada en datos/proyectos ni en datos/cotizaciones.');
      return;
    }
    console.log('\nGenerando todo…\n');
    proyectos.forEach((f) => { console.log(`· ${path.basename(f)}`); unProyecto(f); });
    cotizaciones.forEach((f) => { console.log(`· ${path.basename(f)}`); unaCotizacion(f); });
    console.log('\nListo. Abre los archivos de la carpeta  salidas/  en tu navegador.\n');
    return;
  }

  if (!archivo) {
    console.log('Falta el archivo de datos.\n  node herramientas/generar.js ' + cmd + ' <archivo.json>');
    process.exit(1);
  }
  const abs = path.resolve(process.cwd(), archivo);

  switch (cmd) {
    case 'moodboard': {
      const datos = leerJSON(abs);
      const p = datos.proyecto || {};
      guardar(path.join(RAIZ, 'salidas', `${slug(p.codigo || p.nombre)}-moodboard.html`),
        moodboard.generar(datos, { baseDir: path.dirname(abs) }));
      break;
    }
    case 'storyboard':
    case 'presentacion': {
      const datos = leerJSON(abs);
      const p = datos.proyecto || {};
      guardar(path.join(RAIZ, 'salidas', `${slug(p.codigo || p.nombre)}-storyboard.html`),
        presentacion.generar(datos, { baseDir: path.dirname(abs) }));
      break;
    }
    case 'cotizacion':
      unaCotizacion(abs);
      break;
    default:
      console.log(`No conozco el comando "${cmd}".  Usa: todo | moodboard | storyboard | cotizacion`);
      process.exit(1);
  }
}

main();
