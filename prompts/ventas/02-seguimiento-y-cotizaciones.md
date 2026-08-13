# Seguimiento y cotizaciones

🎯 **Para qué sirve** — Lo que pasa después de la reunión, que es donde se pierden la mayoría de los negocios: el correo de seguimiento, la cotización, el recordatorio que no incomoda.

🔧 **Dónde se usa** — Proyectos **MILLIMETER Ventas** y **Cotizador** en Claude.

---

## La secuencia de seguimiento

| Cuándo | Qué |
|---|---|
| Mismo día | Correo de resumen — lo que hablaron, lo que sigue |
| +3 días | Material de apoyo: brochure, imágenes de aplicación similar |
| +7 días | Cotización, si hay proyecto definido |
| +14 días | Seguimiento suave con un ángulo nuevo, no un "¿ya lo viste?" |
| +30 días | Contenido de valor, sin pedir nada |
| Trimestral | Un proyecto nuevo que le pueda interesar |

**Regla:** nunca un seguimiento que solo diga "haciendo seguimiento". Cada contacto trae algo nuevo.

---

## 📋 Prompt — correo posterior a la reunión

```
Escribe el correo de seguimiento de esta reunión.

CON QUIÉN: [nombre, cargo, empresa]
QUÉ HABLAMOS: [notas, aunque sean desordenadas]
QUÉ LES INTERESÓ MÁS: [...]
OBJECIONES QUE SALIERON: [...]
QUÉ QUEDAMOS DE HACER: [ambas partes]
IDIOMA: [inglés / español]

· Asunto que se abra
· Máximo 150 palabras
· Recoge lo que a ELLOS les interesó, no lo que yo quería contar
· Un solo siguiente paso, concreto y fácil de aceptar
· Adjuntos que menciono: [...]
· Tono de MILLIMETER: directo, técnico, sin adulación

Nada de "fue un placer conocerte" ni "quedo atento a tus comentarios".
```

---

## 📋 Prompt — armar la cotización

```
Prepara el archivo JSON de cotización de MILLIMETER para este proyecto.

CLIENTE: [nombre, empresa, ubicación]
PROYECTO: [descripción]
ALCANCE
· [Elemento] — [material] — [espesor] — [área o cantidad] — [acabado]
· [...]

FABRICACIÓN Y LOGÍSTICA: [CNC, curvado, laminación, embalaje, flete, montaje]
IMPUESTOS: [estado / tasa]
NOTAS: [lo que haya que aclarar]

Devuélveme el JSON siguiendo el esquema de datos/cotizaciones/, con:
· Secciones separadas por espesor (5 mm, 1 mm, 2 cm tradicional)
· Los cargos de fabricación, embalaje, flete y supervisión aparte
· Plan de pagos: 50% con aprobación del bloque, 40% al terminar
  fabricación, 10% en entrega
· Las condiciones estándar de MILLIMETER completas

NO inventes precios unitarios. Déjalos en 0 y márcalos para que yo los
llene, salvo que te los haya dado explícitamente.
```

Después:

```powershell
node herramientas/generar.js cotizacion datos/cotizaciones/[archivo].json
```

> El generador calcula solo el **cuadro de ahorro de peso** frente a piedra tradicional de 2 cm. Es la parte de la cotización que más convence, y sale sin que hagas nada.

---

## 📋 Prompt — presentar la cotización

La cotización sola no vende. El correo que la acompaña, sí.

```
Escribe el correo que acompaña esta cotización.

PROYECTO: [...]  ·  TOTAL: [...]  ·  DESTINATARIO: [...]
LO QUE MÁS LES IMPORTABA: [de la reunión]

· Recuerda en una línea el problema que esto resuelve — antes del número
· Menciona el ahorro de peso concreto de ESTE proyecto
· Explica sin justificar por qué se selecciona bloque directo
· Deja claro el siguiente paso: aprobar el bloque
· Máximo 200 palabras
· [inglés / español]

No pidas disculpas por el precio ni lo justifiques de más. El precio es
el que es, y las posibilidades de diseño lo respaldan.
```

---

## 📋 Prompt — seguimiento cuando no responden

```
Cotizamos a [cliente] el [fecha] por [monto] para [proyecto].
No han respondido en [N] días. Último contacto: [qué se dijo].

Escríbeme el mensaje de seguimiento:
· Que NO parezca presión
· Que traiga algo nuevo — una imagen, un dato, una aplicación parecida
· Que le dé una salida fácil si el proyecto se congeló
· 3 líneas máximo
· [WhatsApp / correo]

Y dime honestamente: ¿[N] días es momento de escribir, o es demasiado
pronto o demasiado tarde?
```

---

## 📋 Prompt — reactivar clientes antiguos

```
Tengo esta lista de contactos con los que hablé y no se concretó:
[LISTA: nombre, empresa, cuándo, por qué no se dio]

Para cada uno:
1. ¿Vale la pena reactivar? Si no, dilo.
2. Con qué ángulo nuevo — no repetir el mismo argumento
3. El mensaje de reapertura, corto
4. En qué orden los contacto y con cuánto espacio entre uno y otro

Prioriza por probabilidad real, no por tamaño del proyecto.
```

---

## 💡 Notas

**El seguimiento es donde se pierde el negocio.** No en la reunión. La mayoría de los proyectos se caen porque nadie volvió a escribir, no porque el precio estuviera mal.

**Lleva un registro.** Una hoja de cálculo simple: contacto, empresa, fecha del último toque, siguiente paso, fecha del siguiente toque. Sin eso, ninguna secuencia de seguimiento se sostiene por muchos prompts que tengas.

**Revisa siempre las cifras antes de enviar.** La IA arma el formato; los precios y las áreas son tuyos. Un error en una cotización cuesta más que todo el tiempo que este sistema te ahorra.
