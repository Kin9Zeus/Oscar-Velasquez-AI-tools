# Ideas adicionales y refinamientos

> Documento interno de Aleck. Está en el repositorio porque a Oscar le sirve ver hacia dónde puede crecer esto, pero está escrito como propuesta, no como algo ya entregado.

---

# Parte 1 — Refinamientos a lo que ya estaba planteado

Lo que se pidió, y lo que aprendí construyéndolo.

### 1. Los prompts de render: el cuello de botella no es el render, son las revisiones

El planteamiento original era "prompts de renderizado". Construyéndolo se ve que el render en sí ya no es el problema — un prompt bueno lo resuelve en dos minutos. **El problema es el ciclo de revisión**, que es donde hoy se pierden los días.

Por eso la biblioteca de correcciones ([`03-revisiones-y-ajustes.md`](../../prompts/renderizado/03-revisiones-y-ajustes.md)) terminó siendo tan importante como el prompt maestro. Y por eso incluye el método del **recuadro rojo**: Oscar ya marca las revisiones así en las láminas de Aspen Leaf. No hubo que inventar un procedimiento nuevo — solo convertir el que ya existe en instrucción para la IA.

### 2. Los moodboards interactivos: el valor real no es el clic, es la fuente única

La idea era "moodboards con links de proveedor en cada elemento". Eso está construido. Pero el hallazgo importante fue otro: **si los datos del moodboard son los mismos del storyboard y los de la cotización, entonces se especifica una vez y salen tres entregables.**

Ese es el cambio grande. No es un moodboard más bonito: es que cambiar un material deje de significar actualizar tres documentos a mano.

### 3. Las presentaciones automáticas: HTML en vez de Google Slides

El instinto inicial era automatizar Google Slides directamente, ya que es donde Oscar trabaja hoy. Lo descarté por dos razones:

- Requiere permisos de API y scripts que hay que mantener, y se rompe cuando Google cambia algo.
- El HTML generado se convierte a PDF con `Ctrl+P`, se envía como un solo archivo, y se ve igual en cualquier máquina.

**Google Slides sigue teniendo su lugar** para retoques finales y para trabajar en equipo. Pero como formato de generación, el HTML gana. Si más adelante hace falta que la salida caiga directo en Slides, se puede construir — pero conviene ver primero si de verdad se echa de menos.

### 4. El cotizador: la matemática es lo de menos

Cotizar no es difícil por las sumas. Es difícil porque **cada cotización repite las mismas condiciones comerciales** — no hay stock, no hay muestras físicas, la placa mide 120×76, los plazos son de 6 a 8 semanas — y escribirlas cada vez es donde se va el tiempo y donde se cometen omisiones.

Por eso el generador las trae completas por defecto. Y por eso incluye el **cuadro de ahorro de peso**: es el argumento que más convence, y ahora sale automáticamente en cada cotización sin que nadie tenga que acordarse.

### 5. Las skills y los chats entrenados: menos es más

Se podían crear quince asistentes especializados. Sería un error. **Seis Proyectos bien hechos superan a quince a medias**, porque a los quince nunca se les carga bien el contexto y terminan sin usarse.

Por eso el arranque son dos: Render Studio y MILLIMETER Ventas.

---

# Parte 2 — Ideas nuevas

Ordenadas por relación entre impacto y esfuerzo. Las tres primeras son las que yo haría a continuación.

---

## ⭐ 1. Índice de la biblioteca de activos

**El problema, en tus palabras:** *"como hay unas cosas que yo uso recurrentemente, ya las tengo modeladas, entonces simplemente agarrar la cama, agarrar el tapete, lo pongo, le cambio las texturas."*

Eso funciona mientras te acuerdas de qué tienes. Con 5 TB, deja de funcionar.

**Qué es:** un índice consultable de todo lo modelado — muebles, luminarias, materiales, familias de Revit — con etiquetas de estilo, material, dimensiones y en qué proyecto se usó. Vive en un archivo del repositorio, y con el conector de Drive activo Claude lo consulta directamente.

**Cómo se ve usándolo:**

> *"¿Qué mesas de comedor tengo modeladas para 10 puestos, en madera oscura?"*
> *"¿En qué proyectos usé el travertino crema y cómo quedó?"*
> *"Necesito un ottoman para un baño. ¿Qué tengo que sirva?"*

**Por qué importa:** es el multiplicador de todo lo demás. Cada proyecto nuevo se arma con piezas que ya existen, y la biblioteca crece sola con el trabajo.

**Esfuerzo:** medio. Lo pesado es catalogar lo que ya hay. Se puede hacer por lotes: cada proyecto que entregues, lo catalogas al cerrar.

---

## ⭐ 2. Revisión de consistencia de la especificación

**El problema:** los errores de especificación no se descubren en el escritorio, se descubren en obra — y ahí cuestan dinero.

**Qué es:** antes de liberar un finish schedule, Claude lo revisa buscando contradicciones:

- Grifería de pared especificada con un countertop cuya profundidad no la permite.
- Drenaje lineal con una pendiente de tile que no llega.
- Un metal que rompe la lógica del resto del espacio sin que sea intencional.
- Un plazo de proveedor que no cabe en el cronograma de obra.
- Una cantidad que no cuadra con el área del plano.
- Un material especificado para una aplicación que no soporta.

**Cómo se ve usándolo:** pegas el finish schedule y devuelve una lista de "esto revísalo, y por esto".

**Por qué importa:** un solo error evitado paga el sistema completo. Y es el tipo de revisión que se salta justo cuando hay prisa, que es justo cuando ocurren los errores.

**Esfuerzo:** bajo. Es una Skill más una lista de verificación bien hecha, que se afina con cada error real que aparezca.

---

## ⭐ 3. Calculadora de peso MILLIMETER — para el teléfono

**El problema:** en una reunión, en BNI o en una feria, los números de peso son *el* argumento. Hoy hay que recordarlos y hacer la cuenta mental.

**Qué es:** una página web de un solo archivo que abres en el celular. Metes el área y el espesor, y muestra al instante:

- Peso en piedra tradicional de 2 cm vs MILLIMETER 5 mm vs 1 mm.
- El porcentaje de reducción.
- La comparación de sílice.
- Una barra visual, no solo cifras.

Funciona sin internet. Se le pasa a un arquitecto por WhatsApp y se la queda.

**Por qué importa:** convierte el argumento más fuerte de la marca en algo que la otra persona puede tocar. Y con un código QR, es la herramienta perfecta para BNI y para ferias — el arquitecto se va con la calculadora en el teléfono, con tu marca encima.

**Esfuerzo:** bajo. La lógica ya está construida dentro del generador de cotizaciones; hay que sacarla a una página propia.

---

## 4. Kit de arranque para Juan Esteban

**El problema:** todo esto se apoya en que Juan pueda ejecutar sin depender de que tú le expliques cada vez.

**Qué es:** una versión reducida del repositorio con lo que Juan necesita y nada más:

- Los prompts de render, ya llenos por tipo de espacio.
- La biblioteca de correcciones — el *"que él ya sepa de antemano cómo cambiarla"*.
- Un procedimiento de cinco pasos: modelar → aplicar materiales → capturar → prompt → entregar.
- Convención de nombres de archivo para que las versiones no se pierdan.
- Qué decidir él y qué preguntarte a ti.

**Por qué importa:** es lo que hace que el sistema escale más allá de tus horas. Sin esto, sigues siendo el cuello de botella.

**Esfuerzo:** bajo. Ya está casi todo escrito; es reorganizarlo y hacer una sesión con él.

---

## 5. Catálogo digital de piezas MILLIMETER

**El problema:** estás diseñando mesas, consolas, sillas, entrepaños, portavasos y floreros. Hoy viven como imágenes sueltas.

**Qué es:** el mismo motor del moodboard interactivo, aplicado a producto. Una página por colección con cada pieza: fotos, materiales disponibles, medidas, espesores, precio de referencia. Se envía por WhatsApp, se abre sin internet, se imprime a PDF.

**Por qué importa:** cierra el círculo entre el sistema constructivo y el producto terminado. Un arquitecto que no tiene proyecto para MILLIMETER hoy, quizá sí quiere una consola.

**Esfuerzo:** bajo. El generador ya existe; hay que adaptar la ficha de material a ficha de producto.

---

## 6. Comparador de opciones A/B para el cliente

**El problema:** cuando el cliente no sabe qué quiere, se hacen dos propuestas completas y se pierden días. O peor: se hace una, no le gusta, y se hace otra.

**Qué es:** una página que muestra dos esquemas de material lado a lado para el mismo espacio, con sus renders y sus fichas de proveedor. El cliente compara y elige.

**Por qué importa:** ataca directamente el ciclo de revisiones. Una decisión temprana y explícita evita tres rondas de cambios.

**Esfuerzo:** medio. Es una variante del moodboard con dos columnas.

---

## 7. Nota de voz → tareas y minutas

**El problema:** buena parte de tu día transcurre en movimiento — en obra, en el carro, en el entrenamiento de tu hijo. Las decisiones se toman ahí y se pierden ahí.

**Qué es:** grabas una nota de voz al salir de la obra, la subes, y sale el acta estructurada: pendientes, responsables, fechas y el correo de seguimiento listo.

**Por qué importa:** es el hábito de menor fricción posible. No requiere sentarse ni abrir el computador — que es exactamente el momento en que hoy se pierde la información.

**Esfuerzo:** bajo. Claude transcribe y estructura; solo hay que fijar el formato.

---

## 8. Paquete de entrega al cliente

**Qué es:** un comando que empaqueta todo lo de un proyecto en una carpeta lista para enviar: storyboard en PDF, moodboard interactivo, finish schedule en Excel, renders en alta y la cotización.

**Por qué importa:** estandariza el momento de entrega, que hoy se arma a mano cada vez. Y se ve profesional de una forma que se nota.

**Esfuerzo:** bajo. Es un script adicional sobre lo ya construido.

---

## 9. Registro comercial mínimo

**El problema:** el seguimiento comercial no se cae por falta de argumentos, se cae porque nadie volvió a escribir.

**Qué es:** una hoja de cálculo — no un CRM — con contacto, empresa, origen, último toque, siguiente paso y fecha. Claude la lee y cada lunes te dice a quién toca escribirle y con qué ángulo.

**Por qué importa:** la mayoría de los negocios perdidos se pierden en el silencio, no en la negociación.

**Esfuerzo:** muy bajo. Y es probablemente la idea de esta lista con mejor retorno inmediato.

---

## 10. Una página de resultados para Marcio

**El contexto:** dijiste que ibas a sentarte con Marcio a mostrarle el flujo, y que si él quiere entrar, entra.

**Qué es:** una página de una hoja, generada con datos reales de tus proyectos: el render base y el final lado a lado, el tiempo antes y después, y qué significa eso en capacidad de entrega para el estudio.

**Por qué importa:** convierte una conversación sobre "estoy usando IA" en una conversación sobre "el estudio puede entregar el triple de renders". Son conversaciones muy distintas, y la segunda es la que puede terminar en que Aspen Leaf contrate la implementación completa.

**Esfuerzo:** bajo, en cuanto tengas dos o tres casos reales con tiempos medidos.

---

# Parte 3 — Lo que yo haría a continuación

Si tuviera que elegir tres, en orden:

1. **La calculadora de peso** — dos horas de trabajo, y la usas la semana siguiente en la próxima reunión de BNI.
2. **El registro comercial** — es lo que hace que todo el trabajo de venta no se evapore.
3. **El kit de Juan Esteban** — es lo que hace que el sistema deje de depender de tus horas.

Las tres son de esfuerzo bajo. El índice de la biblioteca de activos es la de mayor impacto a largo plazo, pero pide constancia: solo funciona si se cataloga cada proyecto al cerrarlo.
