---
name: prompt-de-render
description: Convierte una vista de modelo arquitectónico (Revit, Lumion, SketchUp) y una lista de materiales en un prompt de render fotorrealista listo para pegar en Gemini. Úsala cuando Oscar pida un prompt de render, suba una captura del modelo, o pida corregir un render existente (luz, materiales, mobiliario, encuadre).
---

# Prompt de render

## Cuándo se usa

- Oscar sube una captura de una vista de Revit / Lumion / SketchUp.
- Oscar pega un finish schedule y pide "el prompt".
- Oscar dice que un render salió mal y hay que corregirlo.
- Oscar pide un render de producto para MILLIMETER.

## Qué necesitas antes

| Necesario | Si falta |
|---|---|
| La imagen base o su descripción | Pídela. Sin ella el prompt es genérico |
| Lista de materiales por superficie | Pregunta por las superficies que faltan. **No las inventes** |
| Para qué empresa es | Pregunta. Cambia el estilo por completo |
| Hora del día / ambiente | Si no lo dicen, propón `late afternoon` con luces encendidas |

## El procedimiento

### 1. Identifica el caso

| Caso | Qué hacer |
|---|---|
| Render nuevo de un espacio | Prompt maestro completo |
| Render de producto MILLIMETER | Plantilla de producto — el canto es el sujeto |
| Corrección de un render existente | Prompt de revisión, **un solo cambio** |
| Detalle o close-up | Plantilla de detalle, 50 mm |

### 2. Si es render nuevo — lee la imagen primero

Antes de escribir nada, dile a Oscar en dos líneas:
- Qué ves en la imagen (espacio, elementos principales, ángulo de cámara).
- Qué superficies visibles **no tienen material especificado**.

Después pregunta solo por lo que falta. Después escribe el prompt.

### 3. Arma el prompt con esta estructura, sin omitir bloques

```
TAREA (una línea: transformar en fotografía arquitectónica)
═══ PRESERVE EXACTLY ═══     ← nunca se omite ni se acorta
═══ MATERIALS ═══            ← una línea por superficie
═══ LIGHTING ═══
═══ CAMERA ═══
═══ REALISM REQUIREMENTS ═══
═══ DO NOT ═══
Output: [proporción], maximum resolution.
```

### 4. Traduce los materiales

Usa siempre vocabulario técnico en inglés:

```
[MATERIAL] + [COLOR/VARIEDAD] + [ACABADO] + [FORMATO] + [PATRÓN/DIRECCIÓN]
```

Acabados correctos: `polished`, `honed`, `brushed`, `leathered`, `matte`, `reeded`, `wire-brushed`, `cerused`, `shou sugi ban`, `hardwax oil`.

### 5. Entrega

El prompt va en un bloque de código, completo, **sin comentarios intercalados**, listo para copiar de una sola vez.

Después del bloque, y solo entonces, añade las notas que hagan falta.

## Reglas duras

- **El prompt siempre en inglés.** Es el idioma con el que mejor responden los modelos de imagen.
- **Nunca inventes un material, acabado, formato o marca.** Si falta, pregunta. Una pregunta cuesta menos que tres rondas de corrección.
- **`PRESERVE EXACTLY` es obligatorio.** Sin ese bloque la IA redistribuye el espacio.
- **Un cambio por prompt de revisión.** Si Oscar pide tres correcciones, entrega tres prompts numerados y dile que los aplique de uno en uno.
- **En revisiones, recuérdale seguir en la MISMA conversación de Gemini.** Empezar de cero pierde todo lo que ya estaba bien.
- **Lo que no se lista, se inventa.** Si una superficie se ve en la imagen y no está en `MATERIALS`, va a salir con lo que a la IA se le ocurra.

## Contexto de marca

**Aspen Leaf Interiors** — mountain modern de alto nivel. Piedra con veta fuerte, roble rift y nogal de veta abierta, maderas quemadas, travertino estriado. Metales mezclados a propósito: negro mate en baños, latón envejecido y níquel pulido en espacios sociales. Acento oxblood recurrente. Paleta: blanco cálido, gris piedra, greige, roble natural, verde musgo. Medidas en pies y pulgadas.

**MILLIMETER by Casanova** — el canto es el argumento. Todo render de producto debe mostrar el espesor de 1 mm o 5 mm, la continuidad de veta envolviendo la forma, y cantos a inglete sin sustrato visible. Luz rasante siempre — la luz frontal aplana y mata la venta. Fondo neutro oscuro. El material es el sujeto.

## Formato de salida

```
[2 líneas: qué veo en la imagen]
[Si falta información: las preguntas, numeradas]

```prompt
[el prompt completo]
```

[Notas breves, solo si aportan]
```
