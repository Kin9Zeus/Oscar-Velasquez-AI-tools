# Correos, minutas y obra

🎯 **Para qué sirve** — Lo administrativo que se repite todos los días y que se lleva las horas que necesitas para diseñar y cotizar.

🔧 **Dónde se usa** — Proyecto **Escritorio** en Claude. Rinde mucho más con el conector de Gmail activo ([`../../docs/03-conectores-mcp-y-apis.md`](../../docs/03-conectores-mcp-y-apis.md)).

---

## Correo

### 📋 Responder

```
Responde este correo:

[PEGA EL CORREO]

CONTEXTO: [lo que sé del proyecto o del remitente]
QUÉ QUIERO CONSEGUIR: [...]
IDIOMA: [inglés / español]

· Directo, sin relleno
· Si hay varias preguntas, respóndelas todas — numeradas si son más de dos
· Si falta información para responder algo, dilo explícitamente en vez
  de rodearlo
· Cierra con el siguiente paso concreto
· Tono: profesional, cordial, sin adulación
```

### 📋 Triaje de la bandeja de entrada

Con el conector de Gmail activo:

```
Revisa mis correos sin leer de [hoy / esta semana] y organízalos:

1. URGENTE — responder hoy. Por qué.
2. IMPORTANTE — esta semana
3. INFORMATIVO — solo enterarse
4. IGNORAR

Para los de las categorías 1 y 2, dame un borrador de respuesta.
Para los que necesitan información que no tengo, dime qué me falta.

Contexto: trabajo en Aspen Leaf Interiors (diseño interior, USA) y dirijo
MILLIMETER by Casanova (piedra natural). Separa los correos por empresa.
```

### 📋 Correos que se repiten

Cuando notes que escribiste algo parecido tres veces, conviértelo en plantilla:

```
Estos son tres correos que he escrito para lo mismo:
[PEGA LOS TRES]

Conviértelos en una plantilla reutilizable, con los campos variables entre
[CORCHETES]. Dime también en qué situaciones NO debería usarla.
```

Guárdalas en `plantillas/correos/`.

---

## Reuniones

### 📋 Minuta a partir de notas

```
Convierte estas notas de reunión en una minuta:

[PEGA TUS NOTAS, aunque estén desordenadas]

REUNIÓN: [con quién, cuándo, sobre qué]

DAME
1. Resumen en 3 líneas
2. Decisiones tomadas
3. Tareas: qué, quién, para cuándo
4. Temas abiertos que quedaron sin resolver
5. El correo de seguimiento para enviar a los asistentes

Marca claramente lo que quedó ambiguo. No inventes acuerdos que no
estén en mis notas.
```

### 📋 Preparar la reunión

```
Tengo reunión con [quién] sobre [tema] el [cuándo].

ANTECEDENTES: [lo que ha pasado]
LO QUE QUIERO LOGRAR: [...]
LO QUE ME PREOCUPA: [...]

Dame:
· Agenda con tiempos
· Los 3 puntos que no me puedo dejar sin tratar
· Preguntas que me van a hacer, y cómo responderlas
· Qué llevo preparado
· Cómo cierro con un siguiente paso concreto
```

---

## Obra y proveedores

### 📋 Acta de visita de obra

```
Convierte estas notas de visita de obra en un acta:

[PEGA TUS NOTAS]

PROYECTO: [...]  ·  FECHA: [...]  ·  PRESENTES: [...]

DAME
1. Estado general por espacio
2. Trabajo completado desde la visita anterior
3. Problemas detectados — con nivel de urgencia
4. Decisiones que se tomaron en sitio
5. Pendientes con responsable y fecha
6. Qué se necesita de mí antes de la próxima visita
7. Fotos que hacen falta

Formato claro para enviar al contratista y al cliente.
Separa lo que es responsabilidad de cada parte.
```

### 📋 Reclamo o corrección a proveedor

```
Tengo un problema con [proveedor]:
[QUÉ PASÓ — pedido, qué se esperaba, qué llegó, cuándo]

Escribe el correo:
· Los hechos primero, sin emoción
· La afectación concreta al proyecto — plazo, obra, cliente
· Lo que pido específicamente, con fecha
· Firme, sin ser agresivo — quiero seguir trabajando con ellos
· [inglés / español]

Dame también la versión de escalamiento por si esta no funciona.
```

### 📋 Estado semanal para el cliente

```
Arma el reporte semanal de [PROYECTO] para el cliente.

ESTA SEMANA: [qué pasó]
PRÓXIMA SEMANA: [qué viene]
DECISIONES QUE NECESITO DE ELLOS: [...]
PROBLEMAS: [...]

· Máximo una página
· Empieza por lo que necesito de ellos, no por lo que hice yo
· Sin jerga técnica innecesaria
· Si hay un retraso, dilo directo con la fecha nueva — no lo escondas
  a mitad del texto
· [inglés / español]
```

---

## 💡 Notas

**La IA no manda correos sola.** Todo lo que salga de aquí lo lees antes de enviar. Sobre todo si va a un cliente o a Marcio.

**Lo que se repite se convierte en plantilla.** La tercera vez que escribas algo parecido, plantilla. Ahí es donde está el ahorro real, no en pedirle un correo nuevo cada vez.

**Las notas desordenadas están bien.** No pierdas tiempo ordenando tus notas antes de pegarlas. Ese es exactamente el trabajo que le estás delegando.

**Separa las dos empresas.** Aspen Leaf y MILLIMETER tienen tonos, idiomas y clientes distintos. Dile siempre a Claude cuál de las dos es, o va a mezclarlas.
