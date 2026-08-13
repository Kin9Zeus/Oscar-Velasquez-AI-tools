# Inicio — paso a paso

Oscar: esta es la única guía que tienes que seguir en orden. Todo lo demás son referencias que vas a consultar cuando las necesites.

Está dividida en **cuatro días**. No son días seguidos obligatorios, es el orden lógico. El Día 1 ya te deja produciendo.

---

## Antes de empezar: qué vas a necesitar

| Qué | Ya lo tienes | Hay que activarlo |
|---|:--:|:--:|
| Cuenta de Google / Workspace (Drive 5 TB, Slides, Gmail) | ✅ | |
| Google AI Pro (Gemini) | ✅ | |
| **Claude Pro** | | ⬜ |
| **Node.js** (para los generadores) | | ⬜ |
| Instagram de MILLIMETER (`@_casanovadesign_`, `@casanova_southamerica`) | ✅ | |

Tiempo total del Día 1: **unos 40 minutos**.

---

# DÍA 1 — Instalar y ver el sistema funcionando

## Paso 1. Descargar este repositorio

1. Abre el enlace del repositorio que te compartió Aleck.
2. Botón verde **`Code`** → **`Download ZIP`**.
3. Descomprime el ZIP en un lugar fijo y fácil. Recomendado:
   `C:\Users\<tu-usuario>\Documents\estudio-ia\`
4. **No lo dejes dentro de OneDrive sincronizado si puedes evitarlo** — los archivos generados son pesados y OneDrive los va a estar subiendo todo el tiempo.

> Si prefieres mantenerlo actualizado sin volver a descargar, instala [GitHub Desktop](https://desktop.github.com/) y usa **Clone repository**. Cuando Aleck suba mejoras, le das *Fetch origin* y ya.

## Paso 2. Activar Claude Pro

1. Entra a **[claude.ai](https://claude.ai)** y crea la cuenta (usa el correo con el que trabajas).
2. Menú de tu perfil → **Settings → Plans** → elige **Pro**.
3. Descarga también la app de escritorio: **[claude.ai/download](https://claude.ai/download)**. La vas a necesitar para los conectores.

> **Pro vs Max.** Empieza en Pro. Si en dos o tres semanas te choca el límite de mensajes en las horas de más trabajo, subes a Max. No pagues Max sin haber sentido el tope primero.

## Paso 3. Instalar Node.js

1. Entra a **[nodejs.org](https://nodejs.org)** y descarga la versión que dice **LTS**.
2. Instalador siguiente-siguiente-siguiente. No cambies ninguna opción.
3. Para comprobar que quedó: abre **PowerShell** (tecla Windows → escribe `powershell` → Enter) y escribe:

   ```powershell
   node --version
   ```

   Si responde algo como `v22.x.x`, quedó bien.

## Paso 4. Ver el sistema funcionando

En PowerShell, entra a la carpeta donde descomprimiste el repositorio y ejecuta el generador:

```powershell
cd "C:\Users\<tu-usuario>\Documents\estudio-ia"
node herramientas/generar.js
```

Va a crear cuatro archivos en la carpeta `salidas/`. Ábrelos con doble clic:

| Archivo | Qué es |
|---|---|
| `goodrich-storyboard.html` | La presentación del proyecto. Navega con las flechas ← → |
| `goodrich-moodboard.html` | El moodboard interactivo. Haz clic en los puntos del render |
| `cotizacion-mm-2026-0142.html` | Cotización de MILLIMETER con el cuadro de ahorro de peso |
| `cotizacion-ali-2026-088.html` | Propuesta de honorarios de diseño |

**Para convertir cualquiera a PDF:** `Ctrl + P` → Destino: *Guardar como PDF*.
En el storyboard, pon orientación **horizontal** y activa **Gráficos de fondo**.

✅ **Hasta aquí ya tienes el sistema instalado y funcionando.**

---

# DÍA 2 — Tus asistentes de Claude

Aquí es donde el sistema deja de ser genérico y se vuelve tuyo. Vas a crear **Proyectos** en Claude: chats que ya saben cómo trabajas, con qué materiales, para qué empresa y en qué formato entregas.

📖 Guía completa: **[`docs/02-proyectos-de-claude.md`](docs/02-proyectos-de-claude.md)**

Resumen de lo que vas a crear:

| Proyecto en Claude | Para qué |
|---|---|
| **Render Studio** | Convierte tu render base de Revit/Lumion en un prompt de render fotorrealista |
| **Storyboard & Specs** | Arma el JSON del proyecto desde tu lista de materiales |
| **MILLIMETER Ventas** | Speech, respuestas a objeciones, seguimiento a arquitectos |
| **Cotizador** | Prepara cotizaciones para las dos empresas |
| **Contenido MILLIMETER** | Instagram, LinkedIn, calendario, captions |
| **Escritorio** | Correos, minutas, actas de obra, seguimiento a proveedores |

Empieza creando **solo dos**: *Render Studio* y *MILLIMETER Ventas*. Son los que más tiempo te devuelven. Los otros los agregas cuando los necesites.

---

# DÍA 3 — Renderizado

📖 Guía completa: **[`prompts/renderizado/`](prompts/renderizado/)**

El flujo es el mismo que ya tienes, con un paso menos:

```
Revit  →  vista con materiales aplicados  →  captura JPG
                                                 ↓
                                    Claude arma el prompt
                                                 ↓
                                    Gemini genera el render
                                                 ↓
                                    ¿ajustes?  →  prompt de revisión
```

Lo importante: **sigue aplicando materiales y colores en el modelo antes de capturar**, como ya lo haces. Eso no es trabajo perdido — es lo que le dice a la IA dónde va cada cosa. Un modelo en gris plano necesita el triple de correcciones.

Lee primero, en este orden:
1. [`01-maestro-render-interior.md`](prompts/renderizado/01-maestro-render-interior.md) — la plantilla base
2. [`03-revisiones-y-ajustes.md`](prompts/renderizado/03-revisiones-y-ajustes.md) — "está muy oscuro", "cambia esa mesa"
3. [`biblioteca-de-materiales.md`](prompts/renderizado/biblioteca-de-materiales.md) — cómo se nombran tus materiales

---

# DÍA 4 — Conectores y marketing

## Conectores

Conectar Claude a tu Drive y tu Gmail es lo que hace que dejes de copiar y pegar.

📖 **[`docs/03-conectores-mcp-y-apis.md`](docs/03-conectores-mcp-y-apis.md)** — qué conectar, en qué orden, y qué **no** vale la pena.

Orden recomendado: Google Drive → Gmail → Canva → (más adelante) Notion.

## Marketing

📖 **[`prompts/marketing/`](prompts/marketing/)**

Una sesión de una hora al mes te deja el calendario de contenido del mes completo, con captions en inglés y español y el análisis de qué funcionó el mes anterior.

---

## Seguridad, antes de que se te olvide

Vas a conectar Claude a tu correo y a tu Drive. Lee **[`docs/04-credenciales-y-seguridad.md`](docs/04-credenciales-y-seguridad.md)** — son cinco minutos y evita el único error que sí duele.

Tres reglas que valen por toda la guía:

1. **Nunca pegues contraseñas dentro de un chat.** Los conectores se autorizan con tu login de Google, no escribiendo la clave en el chat.
2. **Nada de lo que este repositorio genere se envía a un cliente sin que tú lo leas primero.** La IA se equivoca en precios, medidas y nombres de proveedor.
3. **Este repositorio es privado.** Tiene información comercial de las dos empresas. No lo hagas público ni lo reenvíes.

---

## Cuando algo no funcione

| Síntoma | Qué hacer |
|---|---|
| `node` no se reconoce como comando | No quedó instalado Node, o hay que cerrar y volver a abrir PowerShell |
| `No pude leer el archivo de datos` | La ruta está mal escrita. Usa comillas si tiene espacios |
| `no es un JSON válido` | Falta una coma o una comilla. Pega el archivo en Claude y pídele que lo revise |
| `⚠ No encontré la imagen` | La ruta de esa imagen en el JSON no existe. Revisa el nombre del archivo |
| El HTML se abre en blanco | Ábrelo con Chrome, no con el visor de OneDrive |

Cualquier otra cosa: escríbele a Aleck. Tienes **5 horas de acompañamiento** incluidas en el paquete — úsalas para lo que no se resuelva leyendo.
