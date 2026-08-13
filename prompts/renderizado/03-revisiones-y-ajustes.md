# Revisiones y ajustes — la biblioteca de correcciones

🎯 **Para qué sirve** — Resolver el comentario del cliente sin volver a renderizar todo. *"Está muy oscuro"*, *"cambia esa mesa y esa silla"*, *"el techo no me gusta"*.

🔧 **Dónde se usa** — Gemini, **en la misma conversación** donde generaste la imagen.

---

## La regla de oro

> **Nunca vuelvas a empezar. Sigue en el mismo chat.**

Si vuelves a lanzar el prompt completo con un cambio, la IA te devuelve una imagen distinta y pierdes todo lo que ya estaba bien. Si sigues en la misma conversación y pides el ajuste puntual, mantiene la imagen y solo cambia lo que le pides.

Esto es exactamente lo que hoy cuesta días con Lumion: aclarar un techo obliga a volver a calcular la escena completa. Aquí es un mensaje.

---

## 1. Luz

### "Está muy oscuro"

```
Keep everything exactly as it is. Only adjust the lighting:
· Raise overall exposure by about one stop
· Lift the shadows so detail is readable in the darker areas
· Keep the highlights controlled — do not blow out the windows
· Preserve the same light direction, colour temperature and mood
Do not change any material, object, camera angle or composition.
```

### "El techo quedó oscuro" *(solo una zona)*

```
Keep everything exactly as it is. Only brighten the ceiling plane:
· Add soft indirect bounce light on the ceiling
· Reduce the shadow gradient where the ceiling meets the walls
· Everything below the ceiling line stays identical
Do not change materials, objects, camera or composition.
```

### "Se ve muy frío" / "muy amarillo"

```
Keep everything exactly as it is. Only adjust colour temperature:
· Shift the artificial lighting to [2700K warm / 3500K neutral]
· Keep the natural daylight neutral, do not tint it
· Preserve exposure and contrast
Do not change materials, objects, camera or composition.
```

### "Falta luz de tarde" / cambiar la hora

```
Keep the geometry, materials, furniture and camera exactly as they are.
Change only the time of day to [late afternoon golden hour]:
· Warmer, lower-angle daylight entering from [DIRECCIÓN]
· Longer, softer shadows across the floor
· Interior fixtures ON, warm
· Windows show [evening sky / dusk], not bright daylight
Do not alter any object, material or the camera.
```

---

## 2. Materiales

### "Cambia el material de esta superficie"

```
Keep everything exactly as it is — camera, geometry, furniture, lighting.
Change only the [SUPERFICIE]:
· From: [MATERIAL ACTUAL]
· To:   [MATERIAL NUEVO, ACABADO, FORMATO, DIRECCIÓN DE VETA]
Match the new material to the existing lighting: same light direction,
same reflections, same shadow behaviour.
No other surface changes.
```

### "La veta va en la dirección equivocada"

```
Keep everything identical. On the [SUPERFICIE] only, rotate the stone veining
so it runs [vertically / horizontally / book-matched, mirrored about the
centre seam]. Same stone, same finish, same colour. Nothing else changes.
```

### "El metal no es ese acabado"

```
Keep everything identical. Change only the metal finish on [ELEMENTOS]:
from [ACABADO ACTUAL] to [ACABADO NUEVO].
Adjust the reflections and specular highlights to match the new finish.
Every other element, including the other metals in the room, stays as it is.
```

---

## 3. Mobiliario — el caso "cambia esta mesa y esta silla"

Este es el que más pasa y el que más tiempo cuesta hoy. Hay tres formas de resolverlo, de menos a más control.

### Opción A — Describir la posición *(rápida)*

```
Keep the room, the camera, the lighting and every other object exactly as
they are. Replace only the [MUEBLE] located [POSICIÓN CLARA: "in the centre
of the room, in front of the sofa"]:
· Remove: [MUEBLE ACTUAL]
· Place instead: [MUEBLE NUEVO — material, acabado, forma, medidas]
· Same footprint and same position on the floor
· Same shadow and contact with the floor as the original
Nothing else in the image changes.
```

### Opción B — Marcar sobre la imagen *(la más precisa)*

Antes de escribir el prompt, abre la captura y **dibuja un recuadro rojo** sobre el objeto a cambiar — exactamente como ya marcan las revisiones en las láminas de Aspen Leaf. Después:

```
The element marked with the red rectangle must be replaced.
Everything outside that rectangle stays pixel-identical.
Replace it with: [MUEBLE NUEVO — material, acabado, forma, medidas]
Match the existing perspective, scale, lighting direction and floor shadow.
Remove the red rectangle from the output.
```

> Este método aprovecha algo que ya haces. La marca roja no es decoración: es la instrucción.

### Opción C — Referencia de producto *(cuando ya escogiste el modelo real)*

Sube **dos imágenes**: el render y la foto del producto del proveedor.

```
Image 1 is the interior scene. Image 2 is the actual product specified.
Replace the [MUEBLE] in image 1 with the product shown in image 2.
· Keep the exact position, orientation and footprint of the original
· Adapt the product to the scene's perspective, scale and lighting
· Preserve the product's real proportions, material and finish
Everything else in image 1 stays identical.
```

---

## 4. Encuadre y cámara

### "Necesito un close-up de este detalle"

```
From this same scene, produce a close-up of [DETALLE].
· 50mm lens, shallow depth of field, background softly out of focus
· Same materials, same lighting, same colour temperature
· Frame the detail so [ELEMENTO] fills roughly 70% of the image
Keep material and lighting continuity with the wide shot.
```

### "Muy cerrado / muy abierto"

```
Keep the scene, materials and lighting identical.
Change only the framing: [pull back to a 24mm wide view showing more of the
room / move in to a 35mm view centred on ELEMENTO].
Do not alter geometry, materials or lighting.
```

---

## 5. Cuando algo salió mal

| Problema | Prompt |
|---|---|
| Líneas dobladas | `Correct the architectural perspective: all vertical lines must be perfectly vertical and all horizontal edges straight. Nothing else changes.` |
| Objeto deformado | `The [OBJETO] is distorted. Redraw only that object with correct proportions and geometry, in the same position, scale and lighting. Everything else stays identical.` |
| Se ve "de render" | `Increase photographic realism: physically accurate light falloff, real material response, subtle surface imperfection, natural colour. Remove any plastic sheen, artificial bloom and oversaturation. Keep geometry, materials and lighting design unchanged.` |
| Se agregaron cosas | `Remove [OBJETOS] that were added — they are not part of the specification. Restore those areas to match the original input. Nothing else changes.` |
| Reflejos falsos en espejo | `The mirror reflection is incorrect. Redraw it to show what would actually be reflected from this camera position. Everything else stays identical.` |

---

## 💡 Notas

**Un cambio por mensaje.** Si pides tres cosas a la vez y dos salen bien y una mal, no hay forma de volver atrás sin perder las buenas.

**Siempre empieza con `Keep everything exactly as it is`.** Es la frase que evita el 80% de los desastres.

**Si después de tres intentos no sale**, no sigas insistiendo con el mismo enfoque: vuelve al modelo, corrige ahí lo que esté ambiguo (un material sin asignar, una geometría que se lee mal) y captura de nuevo. Suele ser más rápido.

**Guarda cada versión.** Nómbralas `espacio_v1`, `espacio_v2`… El cliente a veces vuelve a la primera.
