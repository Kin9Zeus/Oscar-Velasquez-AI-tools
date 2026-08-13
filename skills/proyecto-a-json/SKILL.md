---
name: proyecto-a-json
description: Convierte una lista de materiales — venga como venga, desordenada, en un correo, en notas sueltas o en una tabla — en el archivo JSON de proyecto del sistema, que alimenta el storyboard, el moodboard interactivo y el finish schedule. Úsala cuando Oscar comparta una selección de materiales, una lámina de Slides o un finish schedule y quiera generar entregables.
---

# Proyecto a JSON

## Cuándo se usa

- Oscar pega una lista de materiales de un proyecto.
- Oscar comparte una lámina, un correo o una tabla con especificaciones.
- Oscar quiere generar el storyboard o el moodboard de un proyecto.
- Oscar quiere agregar un espacio o un material a un proyecto que ya existe.

## El esquema

```json
{
  "proyecto": {
    "codigo": "GOODRICH",
    "nombre": "Goodrich Residence",
    "cliente": "Mr. & Mrs. Goodrich",
    "ubicacion": "Aspen, CO",
    "empresa": "aspen-leaf",
    "fecha": "2026-08-13",
    "disenador": "Oscar Velásquez",
    "idioma": "en",
    "portada": "ruta/a/imagen.jpg"
  },
  "espacios": [
    {
      "id": "upper-bath-3",
      "nombre": "Upper Bath 3",
      "planos":  [{ "titulo": "FLOOR PLAN", "imagen": "ruta.jpg" }],
      "renders": [{ "titulo": "RENDERING — Vanity wall", "imagen": "ruta.jpg" }],
      "elementos": [
        {
          "codigo": "T-12",
          "categoria": "tile",
          "nombre": "Chevron marble mosaic with brass inlay",
          "ubicacion": "Vanity wall — full height",
          "proveedor": "Artistic Tile",
          "url": "https://…",
          "imagen": "datos/imagenes/goodrich/t-12-chevron.jpg",
          "acabado": "Polished",
          "formato": "Chevron mosaic on 12\" x 12\" mesh",
          "color": "Calacatta white / Brass",
          "cantidad": { "valor": 96, "unidad": "sqft" },
          "precio_unitario": 78,
          "notas": "…",
          "hotspot": { "render": 0, "x": 57, "y": 45 }
        }
      ]
    }
  ]
}
```

**`empresa`** solo acepta `aspen-leaf` o `millimeter`.

## Categorías válidas

`tile` · `stone` · `countertop` · `plumbing` · `lighting` · `furniture` · `hardware` · `paint` · `appliance` · `textile` · `millwork` · `accessory`

El generador arma las láminas del storyboard a partir de estas categorías, así que **la categoría correcta importa más que el orden en que escribas los elementos**:

| Lámina | Categorías que agrupa |
|---|---|
| MATERIALS | tile, stone, countertop, paint, plumbing, hardware |
| FURNITURE & LIGHTING | furniture, lighting, textile, millwork, accessory |
| APPLIANCES | appliance |

## Códigos de especificación

Nomenclatura del estudio. Numera secuencialmente dentro de cada prefijo, por proyecto.

| Prefijo | Categoría |
|---|---|
| `T-` | tile |
| `S-` | stone, countertop |
| `P-` | plumbing |
| `LT-` | lighting |
| `BH-` | hardware |
| `F-` | furniture |
| `MW-` | millwork |
| `TX-` | textile |
| `AC-` | accessory |
| `PT-` | paint |
| `A-` | appliance |

> Si Oscar ya tiene códigos asignados en su plano, **usa los suyos**. El plano manda.

## El procedimiento

1. **Identifica la empresa.** Si no está claro, pregunta antes de empezar.
2. **Agrupa por espacio.** Un espacio = una habitación.
3. **Clasifica cada elemento** en su categoría.
4. **Asigna código** siguiendo la nomenclatura, o usa el del plano.
5. **Traduce los nombres al inglés.** Son entregables al cliente.
6. **Asocia las imágenes** por coincidencia de nombre de archivo con el código.
7. **Entrega el JSON completo** en un bloque de código.
8. **Lista qué quedó vacío** y qué información falta.

## Reglas duras

- ⛔ **NUNCA inventes proveedores, URLs, precios ni SKU.** Campo vacío `""` antes que dato inventado. Esta es la regla más importante de toda la skill: un dato inventado en un entregable al cliente destruye la confianza en el sistema completo.
- Material sin confirmar → ponlo como `"Material name — TBD"`.
- Medidas en **pies y pulgadas**. Fechas `YYYY-MM-DD` en el JSON.
- Nombres de elementos y ubicaciones en **inglés**.
- Escapa las comillas de pulgadas: `12\" x 24\"`.
- El JSON debe ser **válido**. Sin comas colgantes, sin comentarios.
- `hotspot` es opcional. Ponlo solo si Oscar da las coordenadas o pide colocarlos.

## Sobre los hotspots

`x` e `y` son **porcentajes** sobre la imagen completa del render (0–100), medidos desde la esquina superior izquierda. `render` es el índice del render dentro del espacio (0 = el primero).

Cinco o seis por render es suficiente — los elementos por los que más pregunta el cliente. No hace falta ponerle hotspot a todo.

## Formato de salida

```
[Confirmación en 1 línea: empresa, proyecto, cuántos espacios y elementos]

```json
{ … }
```

**Guárdalo como:** `datos/proyectos/[nombre].json`

**Genéralo con:**
```powershell
node herramientas/generar.js datos/proyectos/[nombre].json
```

**Falta información en:**
- [elemento] — falta [campo]
- …
```
