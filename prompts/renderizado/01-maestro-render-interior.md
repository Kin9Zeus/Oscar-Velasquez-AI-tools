# Prompt maestro — render interior fotorrealista

🎯 **Para qué sirve** — Convertir tu vista de Revit / Lumion con materiales aplicados en una fotografía arquitectónica fotorrealista, **sin que cambie la geometría, la cámara ni el diseño**.

🔧 **Dónde se usa** — Gemini (generación de imagen). También funciona en cualquier modelo de imagen que acepte imagen de entrada.

📥 **Qué necesitas antes**
1. Una captura JPG/PNG de tu vista, con los materiales y colores ya aplicados en el modelo.
2. La lista de materiales de ese espacio (tu finish schedule).
3. Decidido: hora del día y temperatura de luz.

---

## 📋 El prompt

```
Transform this architectural model view into a photorealistic interior
photograph. This is a design presentation image for a high-end residential
project — it must read as a real photograph taken on site, not as a render.

═══ PRESERVE EXACTLY — do not alter ═══
· Camera position, angle, height and field of view — identical to the input
· Room geometry: walls, ceiling planes, openings, floor level, proportions
· Position, size and orientation of every piece of furniture and every fixture
· Window and door placement and size
· The design intent. Do not add, remove, move or restyle any element.
Your job is realism and material fidelity — not redesign.

═══ MATERIALS — apply exactly as specified ═══
· Floor:        [MATERIAL, ACABADO, FORMATO, DIRECCIÓN DE VETA]
· Walls:        [MATERIAL / PINTURA, ACABADO]
· Feature wall: [MATERIAL, PATRÓN, ACABADO]
· Ceiling:      [MATERIAL, ACABADO]
· Countertop:   [PIEDRA, ACABADO, CANTO]
· Cabinetry:    [MADERA, CORTE, ACABADO]
· Plumbing:     [ACABADO METÁLICO]
· Hardware:     [ACABADO METÁLICO]
· Lighting:     [TIPO DE LUMINARIA, ACABADO, PANTALLA]
· Textiles:     [TEJIDO, COLOR]
[Añade una línea por cada superficie que importe. Lo que no listes, la IA lo inventa.]

═══ LIGHTING ═══
· Time of day: [MAÑANA / MEDIODÍA / TARDE / ATARDECER]
· Natural light: [DIRECCIÓN] through [VENTANA/S], soft and diffused
· Artificial light: fixtures ON at [2700K cálido / 3000K neutro]
· Even exposure. Interior clearly readable, windows not blown out.
· Soft contact shadows under every object. No harsh black shadows.

═══ CAMERA ═══
· [24mm gran angular / 35mm estándar / 50mm detalle] full-frame equivalent
· Vertical lines perfectly vertical — architectural perspective correction
· Depth of field: [f/8 todo nítido / f/2.8 fondo suave]
· Eye level at [1.55 m], matching the input view

═══ REALISM REQUIREMENTS ═══
· Physically accurate light bounce and material response
· Real reflections in glass, metal, polished stone and mirrors
· Micro-detail: grout lines, wood grain, stone veining, fabric weave, edge wear
· Natural imperfection — this is a photograph, not a perfect CGI scene

═══ DO NOT ═══
· Do not change the layout, the camera or the proportions
· Do not add furniture, plants, artwork, rugs or objects that are not in the input
· Do not add people, text, watermarks, logos or signage
· Do not warp or bend straight architectural lines
· Do not use the generic "3D render" look: plastic surfaces, flat lighting,
  oversaturated colour, artificial bloom

Output: [16:9 horizontal / 4:5 vertical], maximum resolution.
```

---

## ✏️ Qué cambiar

| Bloque | Qué poner |
|---|---|
| `MATERIALS` | Copia de tu finish schedule. Una línea por superficie. Usa los nombres de [`biblioteca-de-materiales.md`](biblioteca-de-materiales.md) |
| `LIGHTING` | Lo que más cambia el resultado. Si dudas: `late afternoon`, luces encendidas, 2700K |
| `CAMERA` | 24 mm para vistas de espacio completo, 50 mm para detalles |
| `Output` | 16:9 para el storyboard, 4:5 para Instagram |

---

## 📎 Ejemplo real — Upper Bath 3, Goodrich Residence

Este es el prompt completo, lleno con los materiales reales del proyecto de ejemplo:

```
Transform this architectural model view into a photorealistic interior
photograph. This is a design presentation image for a high-end residential
project — it must read as a real photograph taken on site, not as a render.

═══ PRESERVE EXACTLY — do not alter ═══
· Camera position, angle, height and field of view — identical to the input
· Room geometry: walls, vaulted ceiling, openings, floor level, proportions
· Position, size and orientation of every fixture: two mirrors, three pendants,
  double vanity, towel warmer, glass shower enclosure
· The design intent. Do not add, remove, move or restyle any element.

═══ MATERIALS — apply exactly as specified ═══
· Vanity wall:  chevron marble mosaic, Calacatta white with brass inlay strips,
                polished, full height, chevron running vertically
· Shower walls: wood-look porcelain tile, weathered grey, matte textured finish,
                12" x 48" planks, stack bond, grout matched to tile body
· Shower floor: book-matched Calacatta Viola marble slab, honed
· Countertop:   honed Verde Alpi green-grey marble, 3 cm slab,
                1½" mitered edge, undermount sinks
· Cabinetry:    rift-cut white oak, natural hardwax oil, matte, flat slab fronts
· Plumbing:     matte black — wall-mount cross-handle faucets, rain head,
                thermostatic valve, hand shower on slide bar
· Mirrors:      brushed brass frames, rectangular
· Pendants:     matte black slim rod, opal glass shade, warm bulb visible
· Towel warmer: brushed brass, wall-mounted, horizontal bars
· Ottomans:     moss green bouclé upholstery, square, under the vanity
· Wall paint:   warm off-white, matte

═══ LIGHTING ═══
· Time of day: late afternoon
· Natural light: soft, entering from the right, diffused through frosted glass
· Artificial light: pendants and recessed downlights ON at 2700K
· Even exposure. Interior clearly readable, no blown highlights.
· Soft contact shadows. Warm reflected bounce off the brass and the oak.

═══ CAMERA ═══
· 24mm wide-angle, full-frame equivalent
· Vertical lines perfectly vertical — architectural perspective correction
· Depth of field f/8, everything sharp
· Eye level at 1.55 m, matching the input view

═══ REALISM REQUIREMENTS ═══
· Physically accurate light bounce and material response
· Real reflections in the mirrors, the glass enclosure and the polished marble
· Micro-detail: grout lines, oak grain, marble veining, bouclé texture
· Natural imperfection — this is a photograph, not a perfect CGI scene

═══ DO NOT ═══
· Do not change the layout, the camera or the proportions
· Do not add towels, plants, bottles, artwork or decor that is not in the input
· Do not add people, text, watermarks or logos
· Do not warp straight architectural lines
· Do not use the generic "3D render" look

Output: 16:9 horizontal, maximum resolution.
```

---

## 💡 Notas

**Lo que no listes, se inventa.** Si no dices de qué es el techo, va a poner lo que se le ocurra. Cuesta lo mismo escribir la línea.

**Una superficie por línea.** Párrafos largos hacen que la IA mezcle materiales entre superficies.

**No cambies dos cosas a la vez.** Si el render sale bien pero oscuro, corrige solo la luz. Si además cambias el material del piso en el mismo mensaje, no vas a saber cuál de los dos cambios rompió lo que estaba bien.

**Guarda los prompts que funcionan.** Crea `datos/prompts-guardados/` y ve archivando el prompt junto a la imagen que produjo, con el nombre del proyecto. En dos meses vas a tener una biblioteca que no se puede comprar.

**Si la geometría se mueve igual**, refuerza así al final del prompt:

```
CRITICAL: The output must be pixel-aligned with the input on every architectural
edge — walls, ceiling planes, window frames, cabinet fronts and floor line.
If any element cannot be rendered realistically without moving it, leave it as
it is in the input rather than repositioning it.
```

**Deja que Claude te lo escriba.** El Proyecto *Render Studio* (ver [`docs/02-proyectos-de-claude.md`](../../docs/02-proyectos-de-claude.md)) recibe tu finish schedule y la imagen base y te devuelve este prompt lleno, listo para pegar en Gemini. Ese es el flujo real de trabajo — no llenar plantillas a mano.
