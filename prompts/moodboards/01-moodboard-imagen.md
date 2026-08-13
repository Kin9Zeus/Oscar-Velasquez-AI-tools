# Moodboards de imagen

🎯 **Para qué sirve** — Producir la lámina de materiales: el collage de tiles, piedra, herrajes, mobiliario y textiles sobre fondo blanco, con la estética de Aspen Leaf.

🔧 **Dónde se usa** — Gemini para generar o completar imágenes; Canva o Slides para el armado final.

---

## Cuándo usar cada método

| Situación | Método |
|---|---|
| Ya tengo las fotos de producto de los proveedores | **Método A** — armado directo. Es lo que ya haces, pero más rápido |
| Estoy explorando y aún no he seleccionado productos reales | **Método B** — moodboard conceptual generado |
| Tengo algunas fotos y me faltan otras | **Método C** — completar los faltantes |

> **Importante:** para presentar a un cliente, lo que va son las **fotos reales del proveedor**, no imágenes generadas. La IA se usa para explorar dirección y para llenar huecos, no para reemplazar la especificación.

---

## Método A — Armado directo *(el que reemplaza tus 30 minutos)*

El flujo real no pasa por generar imágenes: pasa por **generar el JSON**.

1. Recortas los productos con remove.bg o Canva (o descargas los PNG del proveedor).
2. Los guardas en `datos/imagenes/[proyecto]/` con el código de especificación como nombre: `t-12-chevron.jpg`, `lt-18-pendant.jpg`.
3. Le pasas a Claude tu lista de materiales y te devuelve el JSON.
4. Corres el generador y sale el storyboard **y** el moodboard interactivo.

📖 Todo el detalle está en [`02-moodboard-interactivo.md`](02-moodboard-interactivo.md).

---

## Método B — Moodboard conceptual generado

Para las primeras conversaciones, cuando el cliente todavía no sabe qué quiere.

```
Create a photorealistic interior design material board, presented flat-lay from
directly above on a clean white background.

═══ MATERIALS TO SHOW ═══
Arrange the following as real physical samples, overlapping slightly in a
composed, editorial layout:
· [MATERIAL 1 — piedra: tipo, acabado, veta] as a rectangular slab sample
· [MATERIAL 2 — madera: especie, corte, acabado] as a plank sample
· [MATERIAL 3 — tile: formato, patrón, acabado] as a mounted sheet
· [MATERIAL 4 — metal: acabado] as a small hardware piece
· [MATERIAL 5 — textil: tejido, color] as a folded fabric swatch
· [MATERIAL 6 — pintura: tono] as a painted card

═══ STYLE ═══
· Mountain modern, high-end residential. Natural materials with real character.
· Palette: [warm off-white, stone grey, natural oak, moss green, oxblood accent]
· Soft even daylight from above-left, gentle contact shadows under each sample
· Materials read as physical objects with real thickness and edges,
  not as flat printed images

═══ DO NOT ═══
· No text, no labels, no numbers, no logos, no watermarks
· No props, no plants, no hands, no tools
· No colour cast on the white background

Photorealistic overhead flat-lay photography. 50mm, f/8.
Output: 16:9 horizontal, maximum resolution.
```

---

## Método C — Completar los faltantes

Cuando el proveedor no tiene buena foto de un producto.

### Recortar sobre fondo limpio

```
Isolate the [PRODUCTO] from this image onto a pure white background.
· Clean, precise edges — no halo, no leftover background pixels
· Preserve the product's exact colour, material, texture and proportions
· Keep a soft natural contact shadow under the object so it reads as physical
· Do not restyle, redesign or alter the product in any way
Output: PNG with the product centred, generous margin around it.
```

### Generar una muestra de material

```
Create a photorealistic material sample of [MATERIAL: tipo, color, acabado,
formato], photographed flat from directly above on a white background.
· Real surface texture at close range: [veta / grano / tejido / porosidad]
· Even soft daylight, subtle contact shadow
· Square sample with clean visible edges showing real thickness
· No text, no labels, no props, no watermark
Photorealistic material photography. 50mm macro.
Output: square, maximum resolution.
```

### Ver un producto en otro acabado

```
Keep this product exactly as it is — same form, proportions, geometry, camera
angle and lighting. Change only the finish: from [ACABADO ACTUAL] to
[ACABADO NUEVO]. Adjust reflections and specular response to match the new
finish. Nothing else changes.
```

---

## 💡 Notas

**El fondo blanco no es capricho.** Es lo que hace que la lámina se lea como especificación técnica y no como collage de Pinterest. Es la firma visual de Aspen Leaf.

**La sombra de contacto es lo que da realismo.** Un recorte sin sombra flota y se ve barato. Un recorte con una sombra suave debajo se ve como una muestra puesta sobre una mesa.

**Nombra los archivos con el código de especificación.** `t-12-chevron.jpg`, no `imagen1.jpg`. Es lo que después conecta la imagen con el finish schedule automáticamente, y en seis meses vas a poder reutilizar toda la biblioteca.
