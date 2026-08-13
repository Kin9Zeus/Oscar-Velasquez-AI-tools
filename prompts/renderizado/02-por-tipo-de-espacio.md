# Prompts por tipo de espacio

🎯 **Para qué sirve** — Variantes del [prompt maestro](01-maestro-render-interior.md) afinadas por tipo de espacio. Cada espacio tiene trampas distintas: en un baño son los reflejos, en una cocina los electrodomésticos, en un local comercial la señalética.

**Cómo se usan:** toma el prompt maestro completo y **reemplaza o añade** los bloques que aparecen aquí.

---

## 🛁 Baño

El baño es el espacio donde más rápido se nota que un render es falso, por los reflejos.

**Añade al bloque `REALISM REQUIREMENTS`:**

```
· Mirrors must reflect what would actually be visible from this camera position
· Glass shower enclosure: subtle green edge tint, real refraction, light
  fingerprint-free reflection — not a flat transparent plane
· Polished stone and chrome show sharp specular highlights;
  honed stone shows soft diffuse response
· Water is not running and there are no droplets unless specified
· Grout lines visible and consistent in width
```

**Añade al bloque `DO NOT`:**

```
· Do not add towels, bath mats, robes, plants, candles, bottles, soap dispensers
  or any styling item that is not in the input
· Do not fog or steam the glass
```

> **Recuerda:** en Aspen Leaf el baño lleva metales mezclados a propósito — negro mate en la grifería, latón en espejos y toallero. Especifica los dos o la IA los unifica.

---

## 🍳 Cocina

La trampa de la cocina son los electrodomésticos: la IA inventa marcas, pantallas encendidas y manijas que no existen.

**Añade al bloque `MATERIALS`:**

```
· Appliances: [range, hood, oven, microwave, built-in coffee machine]
              in [ACABADO] — [panel-ready integrado / stainless visto]
· Backsplash: [MATERIAL, ACABADO, hasta dónde llega]
· Island:     [MATERIAL DEL TOPE, CANTO] over [MATERIAL DEL CUERPO]
· Hardware:   [ACABADO], [tirador de barra / manija integrada / push-to-open]
```

**Añade al bloque `DO NOT`:**

```
· Do not add brand names, logos or model badges to any appliance
· Do not turn on appliance displays or interior lights
· Do not add food, dishes, cookware, utensils or styling props
· Panel-ready appliances must read as cabinetry, with no visible appliance face
```

---

## 🛋️ Sala / Great Room

El reto es la escala: techos altos, doble altura, mucha ventana.

**Reemplaza el bloque `LIGHTING`:**

```
═══ LIGHTING ═══
· Time of day: [late afternoon]
· Large windows: exterior visible but not blown out — [mountain landscape /
  garden] softly readable through the glass, correctly exposed
· Interior fixtures ON at 2700K, layered: chandeliers, table lamps, floor lamps
· Fireplace [lit with a low real flame / unlit]
· Warm bounce light off the wood ceiling and floor
· High ceiling reads bright, not as a dark cave
· Balanced exposure between the window wall and the interior
```

**Añade al bloque `PRESERVE EXACTLY`:**

```
· Ceiling structure: exposed beams, ridge line and slope angles — exactly as input
· Window mullion pattern and grid divisions — exactly as input
```

---

## 🍽️ Comedor

```
═══ LIGHTING ═══
· The chandelier or pendant over the table is the focal light source
· Warm pool of light on the table surface, falling off toward the room edges
· Table surface shows a soft reflection of the fixture above it
· Chairs evenly spaced, pushed in, symmetric
```

**Añade al bloque `DO NOT`:**

```
· Do not set the table: no plates, glassware, cutlery, flowers or centrepieces
  unless specified
```

---

## 👔 Clóset / Vestier

```
═══ LIGHTING ═══
· Integrated LED strip lighting inside shelving and under hanging rods
· Warm 2700K, indirect, no visible fixture
· Even light across all compartments — no dark shelves
```

```
═══ MATERIALS ═══
· Interior carcass: [MATERIAL, ACABADO]
· Fronts:           [MATERIAL, ACABADO]
· Hardware:         [ACABADO], [tipo de tirador]
· Rods:             [ACABADO METÁLICO]
· Island top:       [MATERIAL] with [CANTO]
```

**Añade al bloque `DO NOT`:**

```
· Do not add clothing, shoes, bags or personal items unless specified
· Do not add mannequins or people
```

---

## 🏬 Local comercial / Retail

Para el proyecto del local en centro comercial.

**Reemplaza `PRESERVE EXACTLY` añadiendo:**

```
· Storefront line, mall circulation edge and bulkhead height — exactly as input
· Ceiling height and structural grid — exactly as input
```

```
═══ LIGHTING ═══
· Commercial lighting design: accent track on the merchandise wall,
  ambient at the circulation, feature light over the counter
· 3000K neutral — merchandise colour must read true
· Interior clearly brighter than the mall circulation, so the store pulls the eye
· No harsh hotspots on the floor
```

**Añade al bloque `DO NOT`:**

```
· Do not add brand names, signage text, price tags or any legible lettering
· Do not add shoppers, staff or mannequins unless specified
· Do not invent merchandise beyond what the input shows
```

> **Sobre la señalética:** los modelos de imagen escriben texto mal. Deja la zona del letrero **en blanco** y monta el logo real después en Canva o Slides. Sale mejor y más rápido que pelear con la IA.

---

## 🌄 Vista exterior / Fachada

```
═══ LIGHTING ═══
· Time of day: [golden hour, sun low from the DIRECCIÓN]
· Sky: [clear with light high cloud], natural gradient
· Interior lights ON and warm, visible through the glass — this is what makes
  an exterior shot read as a real photograph
· Long soft shadows across the ground plane
· Landscape [seasonally consistent: TEMPORADA]
```

**Añade al bloque `DO NOT`:**

```
· Do not add cars, people, pets or street furniture unless specified
· Do not change the landscape design, hardscape or planting layout
· Do not add a driveway, path or fence that is not in the input
```

---

## 📐 Vista de detalle constructivo

Para mostrar un encuentro, un canto o una unión — muy útil para MILLIMETER.

```
Produce a close-up architectural detail photograph of [DETALLE].
· 50mm macro, shallow depth of field, background softly blurred
· Grazing light from [DIRECCIÓN] to reveal surface texture and edge profile
· The junction between [MATERIAL A] and [MATERIAL B] must be crisp and
  perfectly aligned
· Show real material behaviour: [veta / grano / textura] at close range
· Neutral background, no props
Keep material and lighting continuity with the wide shot of this space.
```
