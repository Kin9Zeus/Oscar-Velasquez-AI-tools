# Captions y publicaciones

🎯 **Para qué sirve** — Escribir el texto de cada publicación en el tono de la marca, en inglés y en español, sin que suene a agencia.

🔧 **Dónde se usa** — Proyecto **Contenido MILLIMETER** en Claude.

---

## El tono

MILLIMETER **no vende con adjetivos, vende con números y con hechos**. El mismo tono del speech de ventas: directo, técnico, seguro, sin exagerar.

| ❌ No | ✅ Sí |
|---|---|
| "Stunning marble that transforms any space ✨" | "5 mm. Real natural stone. Not porcelain." |
| "We are passionate about design excellence" | "440 lb → 40 lb. Same stone." |
| "Discover the beauty of natural stone 🌿💎" | "This curve is not possible at 2 cm." |

**Reglas duras:**
- MILLIMETER siempre en mayúsculas.
- Nunca decir porcelánico, imitación, ni "efecto mármol" al hablar del producto.
- Máximo un emoji por caption, y muchas veces cero.
- Nunca prometer una veta específica: cada bloque es único.

---

## 📋 Prompt — caption desde una imagen

```
Escribe el caption para esta publicación de MILLIMETER by Casanova.

LA IMAGEN: [descríbela o adjúntala]
PILAR: [el canto / lo imposible / proyecto real / material y cantera / salud]
CUENTA: [@_casanovadesign_ inglés / @casanova_southamerica español]
DATOS TÉCNICOS: [material, espesor, aplicación, ubicación]

ESTRUCTURA
· Primera línea: el gancho. Tiene que funcionar sola, porque es lo único
  que se ve antes del "ver más". Corta. Sin emoji.
· 2–4 líneas de desarrollo: qué es, por qué importa, el dato técnico
· Cierre: una pregunta o una invitación concreta
· 8–12 hashtags al final, separados del texto

REGLAS
· Tono del brand brief de MILLIMETER: directo, técnico, sin adjetivos de venta
· Máximo un emoji, o ninguno
· No inventes datos técnicos, ubicaciones ni clientes
· Si falta un dato para que el caption funcione, pídemelo en vez de inventarlo

Dame 3 versiones con ganchos distintos.
```

---

## 📋 Prompt — carrusel

El formato que mejor rinde para producto técnico.

```
Arma un carrusel de [7] láminas para MILLIMETER sobre [TEMA].

CUENTA: [@cuenta] · IDIOMA: [inglés/español]

PARA CADA LÁMINA
· El texto en pantalla (máximo 12 palabras — se lee en el celular)
· Qué imagen va, y si hay que generarla, el prompt listo
· Por qué esa lámina va en esa posición

ESTRUCTURA QUE FUNCIONA
1. Gancho — una afirmación que detenga el scroll
2. El problema del material tradicional
3–5. El desarrollo: los números, la demostración, el caso
6. La aplicación real
7. Cierre con llamado a la acción

Después del carrusel, dame el caption completo y los hashtags.
```

---

## 📋 Prompt — reel a partir de renders

```
Diseña un reel de [15] segundos para MILLIMETER con este material:
[LISTA de renders / clips / fotos disponibles]

DAME
· Guion segundo a segundo: qué se ve y qué texto aparece en pantalla
· El gancho de los primeros 2 segundos — es lo único que decide si lo ven
· Orden de los clips y duración de cada uno
· Texto de portada (el que se ve en el grid del perfil)
· Caption y hashtags
· Sugerencia de audio: tipo de música o sonido ambiente
  (nada con derechos — solo librería de la plataforma)

El reel tiene que funcionar SIN sonido: la mayoría lo va a ver en mudo.
```

---

## 📋 Prompt — adaptar de USA a Sudamérica

```
Adapta esta publicación de @_casanovadesign_ para @casanova_southamerica:

[PEGA EL POST ORIGINAL]

· Traduce al español, sin que suene a traducción literal
· Ajusta las unidades cuando tenga sentido para la audiencia local
  (mantén pulgadas y libras si el dato es de un proyecto en USA)
· Adapta las referencias culturales o de mercado
· Conserva exactamente el mismo nivel técnico y el mismo tono
· Hashtags relevantes para la región, no los mismos traducidos

La cuenta de Sudamérica debe verse igual de sofisticada que la de USA.
```

---

## 📋 Prompt — respuestas a comentarios y mensajes

```
Escríbeme la respuesta a este comentario / mensaje directo:

[PEGA EL MENSAJE]

CONTEXTO: [quién parece ser — arquitecto, fabricador, cliente final, curioso]

· Tono de MILLIMETER: directo, técnico, cordial pero no efusivo
· Si es una pregunta técnica, responde con el dato concreto
· Si es una oportunidad comercial, lleva a la conversación siguiente
  sin sonar vendedor
· Si pregunta precio, explica que depende de la selección de bloque
  y propone revisar el proyecto
· Máximo 3 líneas

Dame 2 versiones: una más corta y una más completa.
```

---

## 💡 Notas

**La primera línea es el 80% del trabajo.** Es lo único que se ve antes del "ver más". Si no funciona sola, el resto del caption no existe.

**Los datos son el contenido.** `13–15 lb/ft² → 3–4 lb/ft²` vale más que cualquier adjetivo. Ten el brand brief a mano: [`../../marca/millimeter-by-casanova.md`](../../marca/millimeter-by-casanova.md).

**Revisa siempre antes de publicar.** Sobre todo los datos técnicos y los nombres de proyecto o cliente. Un error técnico en la cuenta de una empresa de materiales cuesta credibilidad con arquitectos, que es exactamente la audiencia que importa.

**Guarda los que funcionan.** Cuando un caption rinda bien, pégalo en el Proyecto de Claude como referencia. Con el tiempo el asistente aprende tu voz de verdad, no la que le describiste.
