# Flujos de trabajo — cómo se ve el día a día

🎯 Las piezas sueltas ya están. Esto es cómo encajan.

---

## Flujo 1 · De Revit a render entregado

**Antes:** Juan Esteban modela → renderiza en Lumion → tarda → llega → hay que corregir → vuelve a renderizar → tarda otra vez. Seis baños pedidos, dos entregados y uno mal.

**Ahora:**

```
1. MODELO           Revit, con materiales y colores aplicados          ← Juan Esteban
2. CAPTURA          JPG de la vista, con la cámara donde la quieres    ← Juan Esteban
3. PROMPT           Claude · Render Studio → prompt listo              ← 2 min
4. RENDER           Gemini → imagen fotorrealista                      ← 1–2 min
5. REVISIÓN         Miras. ¿Ajustes?                                   ← 1 min
6. AJUSTE           Prompt de corrección, misma conversación           ← 1 min por ajuste
7. ENTREGA          Al storyboard
```

**Lo que cambia de verdad:** el paso 6. Aclarar un techo dejó de costar una tarde y pasó a costar un mensaje.

**El paso 1 no se elimina.** Sigue aplicando materiales en el modelo. Es lo que le dice a la IA dónde va cada cosa; sin eso, cada render necesita el triple de correcciones.

### El rol de Juan Esteban cambia

De *"la persona que hace los renders y se demora"* a *"la persona que prepara los modelos y ejecuta los prompts"*. Modela, aplica materiales, captura, corre el prompt que ya está escrito, y te manda el resultado. Tú revisas y decides.

Esa es exactamente la frase que dijiste en la reunión: *"que él me lo entregue y yo lo revise y le diga 'esta luz está no sé qué, cámbiala', y que él ya sepa de antemano cómo cambiarla."* La biblioteca de correcciones ([`../prompts/renderizado/03-revisiones-y-ajustes.md`](../prompts/renderizado/03-revisiones-y-ajustes.md)) es literalmente ese "saber de antemano".

---

## Flujo 2 · De la selección de materiales al entregable completo

**Antes:** seleccionas materiales → armas el storyboard en Slides lámina por lámina → pegas los links debajo → media hora larga, y la cotización se arma aparte otra vez.

**Ahora:**

```
1. SELECCIÓN     Escoges materiales (esto no lo automatiza nadie: es tu criterio)
2. IMÁGENES      Recortas y guardas en datos/imagenes/[proyecto]/
                 nombradas con el código: t-12-chevron.jpg
3. JSON          Claude · Storyboard & Specs → el archivo de proyecto
4. GENERAR       node herramientas/generar.js
5. SALEN         Storyboard 16:9  +  Moodboard interactivo
6. COTIZACIÓN    Claude · Cotizador → JSON → generar
```

**Lo importante:** el paso 3 se hace **una vez** y alimenta todo. Cambias un material, editas una línea del JSON, vuelves a generar, y se actualizan storyboard, moodboard y cotización a la vez.

Eso es exactamente lo que pediste: *"si voy a cambiar algo, entonces cambiar el link y decir 'ahora es este' y que me lo cambie."*

---

## Flujo 3 · Del proyecto al contenido

El contenido no se produce aparte: **se recicla del trabajo que ya hiciste**.

```
Un proyecto entregado produce:
· 3–4 renders            → 2 posts de feed + 1 carrusel
· 1 detalle constructivo → 1 post técnico de LinkedIn
· 1 clip de video        → 1 reel
· El moodboard           → 1 carrusel de materiales

Una pieza de mobiliario MILLIMETER produce:
· 4 imágenes de la serie → 1 carrusel completo
· El shot del canto      → el post que mejor rinde, siempre
· 1 órbita en video      → 1 reel
```

**La sesión mensual:** primer lunes del mes, una hora.

1. Exportas métricas de Meta Business Suite (5 min).
2. Claude · Contenido MILLIMETER analiza el mes anterior (10 min).
3. Con ese análisis, armas el calendario del mes siguiente (20 min).
4. Programas en Meta Business Suite (25 min).

Y ya está el mes resuelto.

---

## Flujo 4 · Del contacto al proyecto

```
CONTACTO        BNI · Instagram · referido · LinkedIn
      ↓
REUNIÓN         Claude · MILLIMETER Ventas prepara → speech adaptado
      ↓
MISMO DÍA       Correo de seguimiento con lo que a ELLOS les interesó
      ↓
+7 DÍAS         Cotización (Claude · Cotizador → generador)
      ↓
SEGUIMIENTO     +14, +30, trimestral — cada toque trae algo nuevo
      ↓
PROYECTO        → alimenta el Flujo 2 y el Flujo 3
```

**El círculo se cierra:** el proyecto que vendes genera el contenido que trae el siguiente contacto.

---

## La semana tipo

Esto no es una regla, es una propuesta de estructura. Ajústala.

| | |
|---|---|
| **Lunes AM** | Triaje de correo con Claude · Escritorio. 20 min y la semana queda ordenada |
| **Lunes** *(1er del mes)* | Sesión de contenido. 1 hora, el mes resuelto |
| **Martes–Jueves** | Diseño, renders, obra. El trabajo de verdad |
| **Miércoles** | Bloque de cotizaciones y seguimiento comercial |
| **Viernes AM** | Reportes de estado a clientes. Con el conector de Drive, 15 min |
| **Viernes PM** | Guardar lo que funcionó: prompts, captions, plantillas nuevas |

El viernes es el más importante y el que más se salta. **Es el que hace que el sistema mejore solo.**

---

## Dónde vive cada cosa

| Necesito… | Voy a… |
|---|---|
| Un prompt de render | Claude · Render Studio |
| Corregir un render | La misma conversación de Gemini |
| Armar el JSON de un proyecto | Claude · Storyboard & Specs |
| Generar storyboard o moodboard | PowerShell → `node herramientas/generar.js` |
| Una cotización | Claude · Cotizador → generador |
| Preparar una reunión de venta | Claude · MILLIMETER Ventas |
| Contenido de Instagram | Claude · Contenido MILLIMETER |
| Un correo o una minuta | Claude · Escritorio |
| Buscar en mis archivos | Cualquier Proyecto, con el conector de Drive |

---

## Cuánto tiempo devuelve esto

Estimaciones conservadoras, para ver el orden de magnitud:

| Tarea | Antes | Ahora | Frecuencia |
|---|---|---|---|
| Render de un espacio | 3–6 h *(incluida la espera)* | 15–30 min | Varias por semana |
| Ronda de correcciones | 2–4 h | 5 min | Constante |
| Storyboard de un proyecto | ~30 min | ~10 min | Por proyecto |
| Moodboard con links | incluido arriba | sale gratis con lo anterior | Por proyecto |
| Cotización | 1–2 h | 20 min | Semanal |
| Mes de contenido | no se hacía | 1 h | Mensual |
| Triaje de correo | 45 min/día | 15 min/día | Diario |

**Lo que importa no es el ahorro en sí.** Es en qué se convierte ese tiempo: mandar cotizaciones, buscar clientes, visitar obra. Que fue exactamente lo que dijiste que necesitabas.

---

## Cómo empezar sin abrumarte

**Semana 1** — Solo el Flujo 1, solo con un espacio. Un baño. De principio a fin. Cuando ese salga bien, ya sabes que funciona.

**Semana 2** — El Flujo 2 con ese mismo proyecto. Storyboard y moodboard.

**Semana 3** — Conectores: Drive y Gmail. El Flujo del escritorio.

**Semana 4** — Contenido y ventas.

**No intentes las cuatro semanas en tres días.** Lo que se instala rápido se abandona rápido.
