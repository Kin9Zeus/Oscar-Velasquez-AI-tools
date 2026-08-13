# Conectores, MCP y APIs — qué conectar y en qué orden

🎯 Un conector le da a Claude acceso a una herramienta que ya usas: tu Drive, tu correo, tu Canva. Deja de ser un chat al que le pegas cosas y pasa a ser un asistente que trabaja **dentro** de tus herramientas.

---

## Antes de conectar nada, entiende esto

**Conectar = dar acceso.** Si conectas Gmail, Claude puede leer tus correos. Si conectas Drive, puede leer tus archivos. Eso es exactamente lo que lo hace útil, y también lo que hay que hacer con cabeza.

Tres reglas:

1. **Un conector a la vez.** Conecta, úsalo una semana, y solo entonces conecta el siguiente. Si conectas seis de golpe no vas a usar ninguno bien.
2. **Empieza por lectura.** Los conectores que solo leen son inofensivos. Los que escriben o envían — correo, publicar — necesitan más cuidado.
3. **Puedes desconectar cuando quieras.** `Settings → Connectors → Disconnect`. No es irreversible.

📖 El detalle de seguridad está en [`04-credenciales-y-seguridad.md`](04-credenciales-y-seguridad.md).

---

## Orden recomendado

| Orden | Conector | Qué te resuelve | Esfuerzo |
|:--:|---|---|:--:|
| 1️⃣ | **Google Drive** | Claude lee tus proyectos, planos, especificaciones y presentaciones sin que subas nada | Bajo |
| 2️⃣ | **Gmail** | Triaje de bandeja, borradores de respuesta, extraer datos de correos de proveedor | Bajo |
| 3️⃣ | **Google Calendar** | Preparar reuniones con contexto, agendar seguimientos | Bajo |
| 4️⃣ | **Canva** | Armar y editar piezas gráficas desde Claude | Medio |
| 5️⃣ | **Notion** *(opcional)* | Si decides llevar el registro de proyectos y clientes ahí | Medio |
| — | Meta Business Suite | Métricas de Instagram. **No hay conector directo** — se exporta y se pega | — |

---

## 1 · Google Drive — el primero, siempre

**Por qué primero:** tienes 5 TB con todos tus proyectos, modelos, láminas y referencias. Conectarlo convierte esa carpeta en la memoria de tu asistente.

**Cómo:**
1. En [claude.ai](https://claude.ai): `Settings` → `Connectors`.
2. Busca **Google Drive** → `Connect`.
3. Autoriza con tu cuenta de Google. **La autorización se hace en la pantalla de Google, nunca escribiendo tu contraseña en el chat.**

**Qué puedes pedirle después:**

```
Busca en mi Drive la carpeta del proyecto [nombre] y dime qué espacios
tiene documentados y qué materiales están especificados en cada uno.
```

```
Lee la presentación de [proyecto] y arma el finish schedule completo
en una tabla, con proveedor y acabado de cada elemento.
```

```
Compara la especificación de este proyecto con la del proyecto [otro]
y dime qué materiales se repiten. Quiero saber qué puedo reutilizar.
```

> **Consejo de organización:** ordena Drive por proyecto, no por tipo de archivo. `Proyectos/Goodrich/01-planos/`, `/02-materiales/`, `/03-renders/`. Cuanto más limpia la estructura, mejor trabaja el asistente — y mejor trabajas tú.

---

## 2 · Gmail — donde está el tiempo perdido

**Cómo:** `Settings` → `Connectors` → **Gmail** → `Connect` → autorizar con Google.

**Qué puedes pedirle:**

```
Revisa mis correos sin leer de hoy. Organízalos en urgente / importante /
informativo / ignorar, separando los de Aspen Leaf de los de MILLIMETER.
Para los urgentes, dame un borrador de respuesta.
```

```
Busca todos los correos de [proveedor] de los últimos dos meses y dime
en qué quedó el pedido de [material]: qué se pidió, qué confirmaron
y qué está pendiente.
```

```
Encuentra los correos donde el cliente aprobó materiales del proyecto
[nombre] y hazme la lista de lo aprobado con la fecha de cada aprobación.
```

> **Claude no envía correos por su cuenta.** Prepara borradores; tú los revisas y los mandas.

---

## 3 · Google Calendar

**Cómo:** igual que los anteriores.

```
¿Qué tengo esta semana? Para cada reunión dime qué debería llevar
preparado y con quién es.
```

```
Tengo reunión con [cliente] el jueves. Busca en Drive y en el correo
todo lo relacionado con ese proyecto y prepárame un resumen de una
página con el estado y los pendientes.
```

Este último es el que más impresiona: cruza calendario, correo y Drive en una sola respuesta.

---

## 4 · Canva

**Por qué:** es donde armas las piezas gráficas que no salen de los generadores — posts, carruseles, brochures, láminas con texto encima.

**Cómo:** `Settings` → `Connectors` → **Canva** → `Connect` → autorizar con tu cuenta de Canva.

**Qué puedes pedirle:**

```
Busca mis diseños de Canva relacionados con MILLIMETER y dime cuáles
puedo reutilizar como plantilla para un carrusel nuevo.
```

```
Con la plantilla de carrusel de MILLIMETER, arma las 7 láminas de este
tema: [tema]. El texto de cada lámina es el que te doy abajo.
```

> **Vale la pena crear una *Brand Kit* en Canva para cada empresa**, con los logos, tipografías y colores. Después todo lo que se genere sale ya con la identidad correcta.

---

## 5 · Notion *(solo si lo vas a usar de verdad)*

**Honestamente:** solo tiene sentido si adoptas Notion como sistema de registro. Si no llevas nada estructurado hoy y tu registro vive en tu cabeza y en el correo, Notion sí resolvería un problema real: tener en un lugar el estado de cada proyecto, cada cliente y cada cotización.

**Si decides adoptarlo**, la estructura mínima que serviría:

| Base de datos | Campos |
|---|---|
| **Proyectos** | Nombre · Empresa · Cliente · Estado · Espacios · Fecha de entrega · Enlace a Drive |
| **Contactos** | Nombre · Empresa · Rol · Origen (BNI/IG/referido) · Último contacto · Siguiente paso |
| **Cotizaciones** | Número · Cliente · Monto · Estado · Fecha de envío · Fecha de seguimiento |
| **Materiales** | Material · Proveedor · Enlace · Acabado · Formato · Proyectos donde se usó |

Esa última — la biblioteca de materiales — es la que más valor acumula con el tiempo. Es tu "ya lo tengo modelado, solo lo agarro y le cambio la textura", pero para especificaciones.

**Si no vas a mantenerlo, no lo conectes.** Un Notion abandonado es peor que no tener Notion.

---

## Instagram y métricas — la realidad

**No hay conector directo de Instagram para Claude.** El flujo real es:

1. Entra a **Meta Business Suite** (`business.facebook.com`) con la cuenta de Instagram de MILLIMETER.
2. `Insights` → selecciona el periodo → exporta o copia la tabla.
3. Pega los datos en el Proyecto **Contenido MILLIMETER**.

Suena manual, pero son cinco minutos una vez al mes. 📖 [`../prompts/marketing/03-metricas-y-analisis.md`](../prompts/marketing/03-metricas-y-analisis.md)

**Para programar publicaciones:** Meta Business Suite lo hace gratis para Instagram y Facebook. LinkedIn programa nativo. No necesitas pagar nada más.

---

## Qué es MCP (y por qué te lo menciono)

**MCP** (*Model Context Protocol*) es el estándar que hace que Claude pueda conectarse a herramientas externas. Los conectores de arriba usan MCP por debajo — no tienes que hacer nada especial para usarlos.

**Lo que te importa saber:** si en el futuro necesitas conectar algo que no está en la lista — tu software de contabilidad, un ERP, una base de datos de proveedores — se puede construir un conector a medida. No es algo que necesites ahora. Cuando lo necesites, se hace.

---

## Lo que NO vale la pena todavía

Para ser honestos, hay cosas que suenan bien y no aportan en tu caso:

| Herramienta | Por qué no, por ahora |
|---|---|
| Automatizadores tipo Zapier / Make | Añaden una capa y un costo mensual para resolver algo que hoy haces en dos clics. Cuando tengas volumen, se revisa |
| CRM completo (HubSpot, Salesforce) | Sobredimensionado. Una hoja de cálculo bien llevada te sirve hasta bastante más adelante |
| Herramientas de programación de redes de pago | Meta Business Suite y LinkedIn lo hacen gratis |
| API directa de Claude | Solo tiene sentido si vamos a construir software a medida. Hoy no hace falta |

**El criterio:** cada herramienta nueva cuesta dinero y, sobre todo, atención. Si no resuelve un problema que sientes esta semana, no entra.

---

## Resumen de costos

| | Costo | Estado |
|---|---|---|
| Claude Pro | ~USD 20/mes | Por activar |
| Google AI Pro | ya lo pagas | ✅ |
| Google Workspace | ya lo pagas | ✅ |
| Node.js | gratis | Por instalar |
| Meta Business Suite | gratis | Por configurar |
| Canva | el plan que ya tengas | ✅ |
| Notion | gratis para uso personal | Opcional |

**El costo real de todo esto es un Claude Pro.** El resto ya lo tienes o es gratis.
