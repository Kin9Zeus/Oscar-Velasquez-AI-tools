# Estudio IA — Oscar Velásquez

Sistema de trabajo con inteligencia artificial para las dos empresas de Oscar:

- **Aspen Leaf Interiors** *(by Marcio Decker)* — diseño interior, Estados Unidos.
- **MILLIMETER by Casanova** *(Fine Materials Design / MILLIMETER Global LLC)* — piedra natural ultradelgada, 1–5 mm.

No es un curso ni una carpeta de consejos. Es un **entorno de trabajo instalable**: prompts calibrados con los materiales y el estilo reales del estudio, asistentes de Claude ya entrenados, y generadores que convierten una selección de materiales en el storyboard, el moodboard interactivo y la cotización — los tres desde el mismo archivo.

---

## Empieza aquí

👉 **[INICIO-AQUI.md](INICIO-AQUI.md)** — el paso a paso completo, en orden, desde cero.

Si solo quieres ver qué hace esto antes de instalar nada, abre los archivos de la carpeta `salidas/` en tu navegador. Ya están generados con un proyecto real de ejemplo.

---

## Qué resuelve

| Antes | Con esto |
|---|---|
| Un render en Lumion, revisiones que tardan días | Prompt calibrado → render fotorrealista en minutos |
| "Está muy oscuro" → volver a renderizar todo | Biblioteca de correcciones: un prompt por tipo de ajuste |
| Storyboard en Google Slides, ~30 min por presentación | Un JSON → storyboard + moodboard + cotización de una vez |
| Links de proveedor pegados debajo de cada lámina | Moodboard interactivo: el cliente hace clic en la silla y va al proveedor |
| Cotizaciones armadas a mano cada vez | Plantilla con la matemática, el plan de pagos y las condiciones ya dentro |
| Instagram y LinkedIn a pulso, sin tiempo | Asistente de contenido, calendario y lectura de métricas |
| Speech de MILLIMETER en la cabeza | Asistente de ventas entrenado con el speech, el brochure y las objeciones |

---

## Mapa del repositorio

```
INICIO-AQUI.md              ← empieza por aquí
docs/                       Guías de instalación, configuración y uso
  estrategia/               Mapa de automatizaciones, roadmap, ideas
marca/                      Brand brief de cada empresa (lo que la IA debe saber)
prompts/                    Biblioteca de prompts lista para copiar y pegar
  renderizado/              Renders, revisiones, mobiliario en piedra, video
  moodboards/               Moodboards de imagen e interactivos
  marketing/                Instagram, LinkedIn, métricas, BNI
  ventas/                   Speech MILLIMETER, seguimiento, propuestas
  admin/                    Correos, minutas, obra, proveedores
skills/                     Skills de Claude instalables (asistentes especializados)
herramientas/               Los generadores (Node.js, sin dependencias)
datos/                      Tus proyectos y cotizaciones en JSON + imágenes
salidas/                    Lo que generan las herramientas (HTML → PDF)
aspen_leaf_interiors/       Material de referencia de la empresa
millimeter_by_casanova/     Material de referencia de la empresa
```

---

## Las tres herramientas

Todas leen el mismo archivo de proyecto y salen a `salidas/` como un HTML **de un solo archivo** (las imágenes van embebidas), listo para enviar por correo o WhatsApp, o para imprimir a PDF.

```bash
node herramientas/generar.js                 # genera todo lo que haya en datos/
node herramientas/generar.js moodboard   datos/proyectos/goodrich.json
node herramientas/generar.js storyboard  datos/proyectos/goodrich.json
node herramientas/generar.js cotizacion  datos/cotizaciones/ejemplo-millimeter.json
```

**Moodboard interactivo** — fichas con foto, código, acabado, formato y enlace directo al proveedor. Filtros por categoría, buscador, y puntos sobre el render: el cliente hace clic en la lámpara del render y salta a su ficha.

**Storyboard** — la presentación 16:9 con el formato que ya usa el estudio: banda gris con `Espacio | CATEGORÍA`, nombre del proyecto en vertical, logo abajo a la derecha. Una lámina por especialidad más el finish schedule con los enlaces.

**Cotización** — cotización con diseño de marca. Hace la matemática sola (subtotales, descuentos, cargos, impuestos, plan de pagos). Para MILLIMETER calcula además el **cuadro de ahorro de peso** frente a piedra tradicional de 2 cm, que es el argumento comercial central.

---

## Requisitos

| Qué | Para qué | Costo aproximado |
|---|---|---|
| **Claude Pro o Max** | Asistentes, skills, conectores | desde ~USD 20/mes |
| **Google AI Pro** *(ya lo tiene)* | Renderizado con Nano Banana / Veo | ya activo |
| **Node.js LTS** | Los generadores | gratis |
| Google Workspace *(ya lo tiene)* | Drive, Slides, Gmail | ya activo |

Todo lo demás es opcional y está evaluado en [`docs/03-conectores-mcp-y-apis.md`](docs/03-conectores-mcp-y-apis.md).

---

## Nota sobre los datos de ejemplo

El proyecto `datos/proyectos/goodrich.json` es una **reconstrucción de demostración** hecha a partir de las láminas que compartió Oscar. Los nombres de proveedor, las URL y los precios son de referencia y deben reemplazarse por los datos reales antes de enviar cualquier cosa a un cliente. Sirve para que el sistema se vea funcionando desde el primer minuto.

---

*Desarrollado por Aleck Martínez para Oscar Velásquez — agosto de 2026.*
