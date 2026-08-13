# Datos

Aquí viven tus proyectos. Un archivo por proyecto, un archivo por cotización.

```
datos/
  proyectos/      un JSON por proyecto → storyboard + moodboard
  cotizaciones/   un JSON por cotización → cotización con diseño
  imagenes/       las fotos de producto, organizadas por proyecto
```

---

## Convención de nombres de imagen

Nombra cada imagen con el **código de especificación** del elemento:

```
datos/imagenes/goodrich/
   t-12-chevron-mosaic.jpg
   s-06-countertop.jpg
   lt-18-pendant.jpg
   p-05-wall-faucet.jpg
```

No es capricho: es lo que permite que Claude asocie las imágenes con el finish schedule automáticamente cuando le pidas armar el JSON, y lo que hace que en seis meses puedas reutilizar la biblioteca completa.

---

## El esquema de proyecto

```json
{
  "proyecto": {
    "codigo":     "GOODRICH",          // en mayúsculas, va en vertical en las láminas
    "nombre":     "Goodrich Residence",
    "cliente":    "Mr. & Mrs. Goodrich",
    "ubicacion":  "Aspen, CO",
    "empresa":    "aspen-leaf",        // aspen-leaf | millimeter
    "fecha":      "2026-08-13",
    "disenador":  "Oscar Velásquez",
    "idioma":     "en",
    "portada":    "ruta/a/imagen.jpg"  // opcional
  },
  "espacios": [
    {
      "id":      "upper-bath-3",       // sin espacios, en minúsculas
      "nombre":  "Upper Bath 3",
      "planos":  [ { "titulo": "FLOOR PLAN", "imagen": "ruta.jpg" } ],
      "renders": [ { "titulo": "RENDERING — Vanity wall", "imagen": "ruta.jpg" } ],
      "elementos": [ /* ver abajo */ ]
    }
  ]
}
```

### Un elemento

| Campo | Obligatorio | Qué es |
|---|:--:|---|
| `codigo` | recomendado | `T-12`, `LT-18`, `S-06`… |
| `categoria` | **sí** | Determina en qué lámina aparece |
| `nombre` | **sí** | En inglés — es entregable al cliente |
| `ubicacion` | | Dónde va dentro del espacio |
| `proveedor` | | Nombre del fabricante o distribuidor |
| `url` | | **Enlace a la página del producto**, no a la home |
| `imagen` | | Ruta a la foto |
| `acabado` | | `Polished`, `Honed`, `Matte Black`… |
| `formato` | | `12" x 48"`, `3 cm slab`… |
| `color` | | |
| `cantidad` | | `{ "valor": 96, "unidad": "sqft" }` |
| `precio_unitario` | | Opcional. Si es para el cliente final, suele omitirse |
| `notas` | | Advertencias, coordinaciones, cosas por confirmar |
| `hotspot` | | `{ "render": 0, "x": 57, "y": 45 }` — porcentajes sobre la imagen |

### Categorías válidas

`tile` · `stone` · `countertop` · `plumbing` · `lighting` · `furniture` · `hardware` · `paint` · `appliance` · `textile` · `millwork` · `accessory`

La categoría decide en qué lámina del storyboard aparece el elemento:

| Lámina | Categorías |
|---|---|
| MATERIALS | tile, stone, countertop, paint, plumbing, hardware |
| FURNITURE & LIGHTING | furniture, lighting, textile, millwork, accessory |
| APPLIANCES | appliance |

---

## Cómo se llena esto sin escribir JSON a mano

**No lo escribas tú.** Pásale tu lista de materiales — como la tengas — al Proyecto **Storyboard & Specs** de Claude y te devuelve el archivo completo.

📖 [`../prompts/moodboards/02-moodboard-interactivo.md`](../prompts/moodboards/02-moodboard-interactivo.md)

---

## Los archivos de ejemplo

| Archivo | Qué es |
|---|---|
| `proyectos/goodrich.json` | Reconstrucción del storyboard Goodrich con 3 espacios y 31 elementos |
| `cotizaciones/ejemplo-millimeter.json` | Vanity flotante en Cream Travertine, 1 mm + 5 mm + 2 cm |
| `cotizaciones/ejemplo-aspen-leaf.json` | Propuesta de honorarios por fases |

⚠️ **Son ejemplos de demostración.** Los proveedores, las URL y los precios son de referencia. Reemplázalos por los datos reales antes de enviar nada a un cliente.
