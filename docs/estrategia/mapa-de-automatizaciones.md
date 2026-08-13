# Mapa de automatizaciones

🎯 Inventario de las tareas repetitivas de Oscar, qué las resuelve, y qué está listo y qué no. Es el documento de control del proyecto.

**Leyenda:** ✅ construido y probado · 🟡 construido, falta configurar con datos reales · ⬜ propuesto, no construido

---

## Aspen Leaf Interiors

### Renderizado

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Render de un espacio interior | Lumion, horas de cálculo | Prompt maestro + Gemini | ✅ |
| Render por tipo de espacio | mismo proceso para todo | Variantes por baño, cocina, sala, clóset, retail | ✅ |
| Revisión "está muy oscuro" | volver a renderizar | Prompt de corrección de luz | ✅ |
| Revisión "cambia esa mesa" | volver a modelar y renderizar | 3 métodos, incluido el recuadro rojo | ✅ |
| Close-up de un detalle | vista nueva en Lumion | Prompt de detalle, misma conversación | ✅ |
| Recorrido en video | no se hacía | Veo, 5 plantillas de movimiento | ✅ |
| Escribir el prompt | — | Claude · Render Studio | 🟡 |

### Documentación y presentación

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Storyboard por espacio | Slides, ~30 min | Generador desde JSON | ✅ |
| Links de proveedor por elemento | pegados debajo de la lámina | Moodboard interactivo con hotspots | ✅ |
| Finish schedule | tabla a mano | Se genera del mismo JSON | ✅ |
| Armar el JSON del proyecto | — | Claude · Storyboard & Specs | 🟡 |
| Actualizar un material en todo | 3 documentos a mano | Una línea del JSON, regenerar | ✅ |
| Recortar productos sin fondo | remove.bg, uno por uno | Igual, más prompts para los que faltan | ✅ |
| Paquete de entrega al cliente | se arma a mano | Script de empaquetado | ⬜ |
| Comparador A/B de opciones | dos propuestas completas | Moodboard a dos columnas | ⬜ |
| Revisión de consistencia | se descubre en obra | Skill de verificación | ⬜ |

### Administración

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Triaje de bandeja de entrada | a mano, ~45 min/día | Claude + conector Gmail | 🟡 |
| Responder correos frecuentes | se escribe cada vez | Plantillas + Claude · Escritorio | 🟡 |
| Minuta de reunión | notas sueltas | Notas → minuta estructurada | ✅ |
| Acta de visita de obra | notas sueltas | Notas → acta con responsables | ✅ |
| Reporte semanal al cliente | se arma a mano | Prompt con estructura fija | ✅ |
| Reclamo a proveedor | se escribe cada vez | Prompt con versión de escalamiento | ✅ |
| Nota de voz → tareas | se pierde | Transcripción → acta | ⬜ |
| Índice de la biblioteca de activos | está en la memoria | Catálogo consultable | ⬜ |

### Comercial

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Propuesta de honorarios | se arma a mano | Generador de cotización, variante Aspen | ✅ |
| Registro de seguimiento | disperso | Hoja de cálculo + revisión semanal | ⬜ |

---

## MILLIMETER by Casanova

### Ventas

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Speech de ventas | escrito, en la cabeza | Cargado en Claude · MILLIMETER Ventas | 🟡 |
| Preparar una reunión | improvisado | Prompt de preparación por perfil | ✅ |
| Responder objeciones | de memoria | Biblioteca + prompt para nuevas | ✅ |
| Versión de 60 segundos | — | Prompt de compresión | ✅ |
| Presentación BNI | se arma cada vez | Prompts de 60 s y de 10 min | ✅ |
| Correo de seguimiento | se escribe cada vez | Secuencia de 6 toques | ✅ |
| Reactivar contactos fríos | no se hace | Prompt de reactivación por lotes | ✅ |
| Cotización | se arma a mano | Generador con condiciones incluidas | ✅ |
| Cuadro de ahorro de peso | se explica de palabra | Automático en cada cotización | ✅ |
| Calculadora de peso portátil | de memoria | Página web para el teléfono | ⬜ |

### Contenido

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Decidir qué publicar | improvisado | 5 pilares + calendario mensual | ✅ |
| Escribir captions | se escribe cada vez | Prompts, ES e EN | ✅ |
| Carruseles | se arman a mano | Prompt de estructura de 7 láminas | ✅ |
| Reels | no se hacían | Guion + clips de Veo | ✅ |
| Adaptar USA → Sudamérica | traducción directa | Prompt de adaptación real | ✅ |
| Análisis de métricas | a ojo, en la app | Meta Business Suite + análisis mensual | 🟡 |
| Decidir si republicar | intuición | Prompt con criterio | ✅ |
| Detectar a quién contactar | manual | Análisis de audiencia | ✅ |
| Responder DM y comentarios | uno por uno | Prompt de respuestas | ✅ |
| Programar publicaciones | manual | Meta Business Suite, gratis | 🟡 |

### Producto

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Render de mobiliario en piedra | no se hacía bien | 5 prompts de producto | ✅ |
| El shot del canto | foto real cuando se puede | Prompt macro | ✅ |
| Comparación de espesores | de palabra | Prompt de comparación visual | ✅ |
| Del boceto a la pieza | — | Prompt img2img de producto | ✅ |
| Catálogo digital | imágenes sueltas | Generador de catálogo | ⬜ |

### LinkedIn y red

| Tarea | Hoy | Solución | Estado |
|---|---|---|:--:|
| Posts de LinkedIn | esporádico | Prompt con enfoque técnico | ✅ |
| Comentar bien en otros | no se hace | Prompt de comentarios que aportan | ✅ |
| Perfil de LinkedIn | desactualizado | Prompt de reescritura | ✅ |
| Seguimiento a referidos BNI | informal | Secuencia completa | ✅ |

---

## Lo que sostiene todo

| | Estado |
|---|:--:|
| Brand brief de Aspen Leaf | ✅ |
| Brand brief de MILLIMETER | ✅ |
| Biblioteca de materiales ES→EN | ✅ |
| Esquema de datos de proyecto | ✅ |
| Proyecto de ejemplo funcionando | ✅ |
| Los 6 Proyectos de Claude | 🟡 *(hay que crearlos en la cuenta de Oscar)* |
| Conectores | 🟡 |
| Kit de Juan Esteban | ⬜ |

---

## Dónde está el tiempo, en resumen

Ordenado por horas devueltas al mes, estimado:

| # | Automatización | Impacto |
|:--:|---|---|
| 1 | Ciclo de revisión de renders | 🔥🔥🔥🔥🔥 |
| 2 | Render inicial | 🔥🔥🔥🔥🔥 |
| 3 | Triaje de correo | 🔥🔥🔥🔥 |
| 4 | Storyboard + moodboard + finish schedule del mismo JSON | 🔥🔥🔥🔥 |
| 5 | Cotizaciones | 🔥🔥🔥 |
| 6 | Contenido mensual | 🔥🔥🔥 |
| 7 | Seguimiento comercial | 🔥🔥🔥 |
| 8 | Minutas y actas | 🔥🔥 |

**Los dos primeros son el 60% del valor de todo el proyecto.** Si solo se implementara eso, ya habría valido la pena.
