# Herramientas

Tres generadores que leen un archivo JSON y producen un HTML **de un solo archivo**, con las imágenes embebidas. Se envía por correo o WhatsApp, se abre en cualquier navegador sin internet, y se convierte a PDF con `Ctrl + P`.

**Sin dependencias externas.** Solo Node.js. No hay `npm install`, no hay carpeta `node_modules`, no hay nada que se rompa cuando una librería se actualice.

---

## Uso

```powershell
# Genera todo lo que haya en datos/
node herramientas/generar.js

# O uno a uno
node herramientas/generar.js moodboard   datos/proyectos/goodrich.json
node herramientas/generar.js storyboard  datos/proyectos/goodrich.json
node herramientas/generar.js cotizacion  datos/cotizaciones/ejemplo-millimeter.json
```

Todo sale a `salidas/`.

---

## Qué produce cada uno

### `moodboard.js`

Moodboard interactivo. Fichas con foto, código de especificación, proveedor, acabado, formato y **enlace directo al proveedor**. Filtros por categoría, buscador, y hotspots sobre el render: el cliente hace clic en un punto de la imagen y salta a la ficha correspondiente.

```powershell
node herramientas/moodboard.js datos/proyectos/goodrich.json --espacio=upper-bath-3
```

### `presentacion.js`

Storyboard 16:9 con el formato del estudio: banda gris `Espacio | CATEGORÍA`, nombre del proyecto en vertical al borde derecho, logo abajo a la derecha.

Láminas por espacio, en el orden del estudio:
`FLOOR PLAN` → `MATERIALS` → `FURNITURE & LIGHTING` → `APPLIANCES` → `RENDERINGS` → `FINISH SCHEDULE`

Se navega con `←` `→`. Para PDF: `Ctrl+P`, orientación **horizontal**, activar **Gráficos de fondo**.

### `cotizacion.js`

Cotización con diseño de marca. Calcula subtotales, descuentos, cargos, impuestos, total y los montos del plan de pagos.

Si hay ítems con espesor `5mm` o `1mm` en `sqft`, añade automáticamente el **cuadro de ahorro de peso** frente a piedra tradicional de 2 cm — el argumento comercial central de MILLIMETER.

---

## Estructura

```
herramientas/
  generar.js        punto de entrada único
  moodboard.js
  presentacion.js
  cotizacion.js
  lib/comun.js      utilidades compartidas: marcas, imágenes, formato
```

### Las marcas

`lib/comun.js` define la identidad visual de cada empresa: colores, tipografías, logo, pie de página. El campo `empresa` del JSON (`aspen-leaf` o `millimeter`) selecciona cuál se aplica.

Para ajustar un color o una tipografía, se edita el objeto `MARCAS` de ese archivo.

### Las imágenes

Las rutas del JSON se resuelven así, en orden:

1. `http://` o `https://` → se deja como URL.
2. Relativa a la carpeta del JSON.
3. Relativa a la raíz del repositorio.

Si la imagen es local, **se embebe como data URI**. Por eso el HTML resultante es un solo archivo autónomo, y por eso pesa unos megas.

Si una imagen no aparece, el generador avisa `⚠ No encontré la imagen: …` y sigue, dejando un marcador con el código del elemento.

---

## Problemas frecuentes

| Mensaje | Causa |
|---|---|
| `node` no se reconoce | Node.js no está instalado, o hay que reabrir PowerShell |
| `No pude leer el archivo de datos` | Ruta mal escrita. Usa comillas si tiene espacios |
| `no es un JSON válido` | Falta una coma o una comilla. Pégalo en Claude y pídele que lo corrija |
| `⚠ No encontré la imagen` | La ruta de esa imagen no existe. Revisa el nombre del archivo |
| El HTML se ve en blanco | Ábrelo con Chrome, no con el visor de OneDrive |
| El PDF sale sin colores | Activa **Gráficos de fondo** en las opciones de impresión |
