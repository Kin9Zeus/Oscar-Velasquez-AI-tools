# Glosario — la IA en cristiano

🎯 Los términos que vas a oír, explicados desde cero y con el ejemplo de tu propio trabajo. Léelo de corrido una vez; después vuelve cuando algo no te suene.

---

## Lo básico

**Prompt**
La instrucción que le das a la IA. Es el equivalente a un briefing: entre mejor esté escrito, mejor sale el trabajo. Un prompt bueno no es una frase, es una especificación — igual que un finish schedule.

**Modelo**
El "motor" de IA. Claude, Gemini y ChatGPT son modelos distintos, con fortalezas distintas. En tu caso: **Claude piensa y escribe, Gemini dibuja.**

**Contexto**
Todo lo que la IA tiene presente en una conversación. Cuando le subes un plano, ese plano entra al contexto. El contexto tiene límite: en conversaciones muy largas, lo del principio se va difuminando. Por eso conviene abrir conversación nueva para tareas nuevas.

**Alucinación**
Cuando la IA inventa algo con total seguridad. Es el riesgo real de esta tecnología y por eso todo lo que produzca se revisa antes de enviarlo. Inventa sobre todo: precios, URLs, nombres de producto y datos técnicos que no le diste.

**Token**
La unidad en que la IA "cuenta" el texto. Aproximadamente ¾ de una palabra. Solo importa si algún día se factura por uso; con una suscripción mensual, no.

---

## Lo que vas a usar

**Proyecto** *(de Claude)*
Un chat con memoria permanente. Le cargas una vez las instrucciones y los documentos, y todas las conversaciones dentro ya saben para qué empresa es, qué materiales manejas y cómo entregas. Es la diferencia entre explicar tu contexto cada vez y no explicarlo nunca más.
📖 [`02-proyectos-de-claude.md`](02-proyectos-de-claude.md)

**Skill**
Un procedimiento empaquetado que Claude carga cuando lo necesita. Un Proyecto define *quién es* el asistente; una Skill define *cómo hace* una tarea concreta paso a paso. En este repositorio están en `skills/`.

**Conector**
Un puente entre Claude y una herramienta que ya usas: Drive, Gmail, Canva. Deja de ser un chat al que le pegas cosas y pasa a ser un asistente que trabaja dentro de tus herramientas.
📖 [`03-conectores-mcp-y-apis.md`](03-conectores-mcp-y-apis.md)

**MCP** *(Model Context Protocol)*
El estándar técnico que hace posibles los conectores. No tienes que hacer nada con esto; solo saber que si mañana necesitas conectar una herramienta que no está en la lista, se puede construir.

**API**
La forma en que dos programas se hablan entre sí sin persona en el medio. Relevante solo si alguna vez construimos software a medida. Hoy no lo necesitas.

---

## De renderizado

**Imagen a imagen** *(img2img)*
Le das una imagen de entrada y la IA produce una versión nueva basada en ella. Es exactamente tu flujo: tu vista de Revit entra, el render fotorrealista sale. Lo contrario sería *texto a imagen*, donde la IA se inventa todo — y ahí pierdes el control de la geometría.

**Prompt negativo**
Lo que le dices a la IA que **no** haga. En tus prompts es el bloque `DO NOT`. Es tan importante como lo que sí pides: sin él, te agrega plantas, toallas y muebles que nunca especificaste.

**Semilla** *(seed)*
Un número que hace que un resultado se pueda repetir. Misma semilla + mismo prompt = misma imagen. Útil cuando quieres variaciones controladas de algo que ya funcionó.

**Inpainting**
Regenerar solo una parte de la imagen, dejando el resto intacto. Es lo que pasa cuando marcas con recuadro rojo el mueble que quieres cambiar.

**Upscaling**
Aumentar la resolución de una imagen añadiendo detalle. Útil cuando el render sale bien pero lo necesitas grande para imprimir.

**Fotorrealismo**
Que la imagen parezca fotografía y no render. Lo que lo consigue no son los adjetivos, son tres cosas concretas: comportamiento correcto de la luz, reflejos reales, y **imperfección**. Un render perfecto se ve falso.

---

## De marketing

**Alcance** *(reach)*
Cuántas personas distintas vieron el contenido.

**Impresiones**
Cuántas veces se mostró, contando repeticiones. Alcance 100 e impresiones 300 = cada persona lo vio tres veces.

**Interacción** *(engagement)*
Likes, comentarios, guardados y compartidos.

**Guardados** *(saves)*
**La métrica que importa en tu negocio.** Un like es un reflejo; un guardado es un arquitecto archivando tu material para un proyecto futuro. Un guardado vale veinte likes.

**Alcance orgánico**
Lo que llegas sin pagar publicidad.

**Pilar de contenido**
Una categoría temática de lo que publicas. MILLIMETER tiene cinco. Si un post no cae en ninguno, no se publica.
📖 [`../prompts/marketing/01-estrategia-y-calendario.md`](../prompts/marketing/01-estrategia-y-calendario.md)

**Gancho** *(hook)*
La primera línea o los primeros dos segundos. Es lo único que decide si alguien sigue viendo. El 80% del trabajo de un post está ahí.

---

## De este repositorio

**Repositorio**
Una carpeta de trabajo con historial de cambios. Está en GitHub para que se pueda compartir y actualizar sin mandar ZIPs por WhatsApp.

**JSON**
Un formato de archivo de texto para guardar datos estructurados. Los archivos de `datos/` son JSON: describen tu proyecto con sus espacios, materiales, proveedores y enlaces. Es feo de leer pero es lo que permite que un solo archivo alimente storyboard, moodboard y cotización a la vez.

**Node.js**
El programa que ejecuta los generadores. Se instala una vez y no se vuelve a tocar.

**HTML**
El formato de las salidas. Se abre en cualquier navegador, se envía por correo, y se convierte a PDF con `Ctrl + P`.

**Generador**
Los programas de `herramientas/`. Leen un JSON y producen el HTML.

**PowerShell**
La ventana negra de Windows donde escribes los comandos. Se abre con tecla Windows → `powershell`. Solo la usas para una línea: `node herramientas/generar.js`.

---

## Tres ideas que cambian cómo usas esto

**1. La IA es un colaborador rápido, no un oráculo.**
Trátala como a alguien muy capaz que acaba de entrar al estudio: sabe muchísimo, trabaja rapidísimo, y no conoce tus proyectos ni a tus clientes. Le das contexto, revisas el trabajo, corriges. Igual que con una persona nueva.

**2. La calidad de lo que sale depende de lo que entra.**
No es una frase bonita: es literal. Un modelo con materiales aplicados produce un render bueno a la primera. Un modelo en gris plano produce tres rondas de correcciones. Tu criterio de diseño sigue siendo el activo — la IA solo lo ejecuta más rápido.

**3. El sistema mejora si lo alimentas.**
Cada prompt que funcione, guárdalo. Cada corrección que hagas dos veces, súbela a las Instructions de tu Proyecto. En seis meses vas a tener algo que ningún competidor puede comprar, porque está hecho con tus materiales, tu estilo y tus clientes.
