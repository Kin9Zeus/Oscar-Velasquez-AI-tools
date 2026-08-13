# Skills

Una **Skill** es un procedimiento empaquetado que Claude carga cuando detecta que la tarea le corresponde. Un Proyecto define *quién es* el asistente; una Skill define *cómo ejecuta* una tarea concreta, paso a paso.

## Skills incluidas

| Carpeta | Qué hace |
|---|---|
| [`prompt-de-render/`](prompt-de-render/) | Convierte una vista del modelo + materiales en el prompt de render listo para Gemini |
| [`proyecto-a-json/`](proyecto-a-json/) | Convierte una lista de materiales desordenada en el JSON del sistema |
| [`cotizacion/`](cotizacion/) | Arma el JSON de cotización para MILLIMETER o Aspen Leaf |
| [`revision-de-especificacion/`](revision-de-especificacion/) | Revisa un finish schedule buscando contradicciones antes de liberarlo |
| [`contenido-millimeter/`](contenido-millimeter/) | Produce publicaciones para las dos cuentas de Instagram y LinkedIn |

---

## Cómo instalarlas

### Opción A — Dentro de un Proyecto de Claude *(la más simple)*

Sube el archivo `SKILL.md` de la skill al **Project knowledge** del Proyecto correspondiente. Claude lo va a usar como procedimiento de referencia.

| Skill | Proyecto donde va |
|---|---|
| `prompt-de-render` | Render Studio |
| `proyecto-a-json` · `revision-de-especificacion` | Storyboard & Specs |
| `cotizacion` | Cotizador |
| `contenido-millimeter` | Contenido MILLIMETER |

### Opción B — Como Skill de Claude

Si usas Claude con capacidades de skills, copia la carpeta completa a tu directorio de skills. Claude la carga sola cuando la tarea coincida con su descripción.

---

## Cómo escribir una nueva

Cuando notes que le explicas el mismo procedimiento a Claude por tercera vez, conviértelo en skill:

```markdown
---
name: nombre-en-kebab-case
description: Cuándo debe usarse esta skill. Sé específico — es lo que
  Claude lee para decidir si le corresponde.
---

# Título

## Cuándo se usa
## Qué necesitas antes
## El procedimiento
## Reglas duras
## Formato de salida
```

Guárdala en `skills/nombre/SKILL.md`.
