# Moodboard interactivo — el entregable que nadie más está enviando

🎯 **Para qué sirve** — Convertir tu selección de materiales en una página web de un solo archivo donde el cliente hace **clic en cada elemento y llega al proveedor**. Se envía por correo o WhatsApp, se abre en cualquier navegador y funciona sin internet.

Es la versión que sí funciona de lo que hoy haces pegando links debajo de cada lámina de Slides.

---

## Qué ve el cliente

- **Fichas** de cada material: foto, código de especificación, proveedor, acabado, formato, cantidad y notas.
- **Botón directo al proveedor** en cada ficha.
- **Filtros por categoría** — el cliente que solo quiere ver la grifería, filtra plumbing.
- **Buscador** — escribe "brass" y ve todo lo que es latón.
- **Puntos sobre el render**: hace clic en la lámpara del render y la página salta a su ficha con el enlace.
- **Se imprime como PDF limpio** si lo prefiere en papel.

---

## Cómo se produce

### Paso 1 — Reunir las imágenes

Guarda las fotos de producto en `datos/imagenes/[proyecto]/`, nombradas con el código de especificación:

```
datos/imagenes/goodrich/
   t-12-chevron-mosaic.jpg
   lt-18-pendant.jpg
   p-05-wall-faucet.jpg
   ...
```

### Paso 2 — Que Claude arme el JSON

Este es el paso que te ahorra el tiempo. Abre tu Proyecto **Storyboard & Specs** en Claude y usa este prompt:

```
Arma el archivo de proyecto JSON con esta selección de materiales.

PROYECTO
· Código:     [GOODRICH]
· Nombre:     [Goodrich Residence]
· Cliente:    [Mr. & Mrs. Goodrich]
· Ubicación:  [Aspen, CO]
· Empresa:    [aspen-leaf]

ESPACIO: [Upper Bath 3]

MATERIALES:
[Pega aquí tu lista tal como la tengas — de Slides, de un correo, de una
hoja de cálculo, o simplemente escrita a mano. No la ordenes, yo la ordeno.]

IMÁGENES DISPONIBLES en datos/imagenes/[proyecto]/:
[Pega el listado de nombres de archivo]

PLANOS Y RENDERS:
[Rutas de los archivos]

Devuélveme el JSON completo siguiendo el esquema del sistema, con los códigos
de especificación en la nomenclatura del estudio (T-, S-, P-, LT-, BH-, F-,
MW-, TX-, AC-). Deja vacío cualquier campo que no te haya dado; no inventes
proveedores, URLs ni precios.
```

Guardas lo que te devuelve como `datos/proyectos/[nombre].json`.

### Paso 3 — Generar

```powershell
node herramientas/generar.js datos/proyectos/[nombre].json
```

Salen los dos archivos de una vez: el moodboard interactivo **y** el storyboard.

---

## Los puntos sobre el render

Esto es lo que hace que el entregable no se parezca a nada que el cliente haya recibido antes.

En el JSON, cada elemento puede llevar un `hotspot`:

```json
"hotspot": { "render": 0, "x": 57, "y": 45 }
```

| Campo | Qué significa |
|---|---|
| `render` | Cuál de los renders del espacio (0 = el primero) |
| `x` | Posición horizontal en **porcentaje** de izquierda a derecha |
| `y` | Posición vertical en **porcentaje** de arriba hacia abajo |

**Cómo sacar las coordenadas sin sufrir:** abre el render, imagina una cuadrícula. Si el objeto está a media imagen horizontal y a tres cuartos de altura → `x: 50, y: 75`. Genera, mira dónde cayó el punto, ajusta. Dos intentos y quedó.

No hace falta ponerle hotspot a todo. **Cinco o seis por render, en lo que más va a preguntar el cliente.**

---

## Cómo se lo envías al cliente

El archivo generado es **un solo HTML con todo adentro** — imágenes incluidas. No hay carpetas ni enlaces rotos.

| Vía | Cómo |
|---|---|
| **Correo** | Adjunta el `.html` directamente. Pesa 1–3 MB |
| **WhatsApp** | Enviar como documento |
| **Drive** | Súbelo y comparte el enlace |
| **En PDF** | Ábrelo, `Ctrl+P` → Guardar como PDF |

Un mensaje que funciona:

> *"Attached is the interactive material board for Upper Bath 3. Open it in any browser — every item links directly to the vendor page, and you can click the numbered points on the rendering to jump to that item's spec. Let me know which selections you'd like to revisit."*

---

## 💡 Notas

**El enlace correcto es el de la página del producto**, no el de la home del proveedor. Es lo que le ahorra al cliente la búsqueda, y es la diferencia entre un entregable útil y uno que solo se ve bonito.

**Los precios son opcionales.** Si el moodboard es para el cliente final, normalmente se dejan fuera y van en la cotización aparte. Si es para el contratista o para procurement, se incluyen. Basta con no poner `precio_unitario` en el JSON.

**Reutiliza.** El JSON de un baño te sirve como base para el siguiente: copias el archivo, cambias lo que cambia. La segunda vez tardas cinco minutos.

**Esto es un diferenciador comercial, no solo una comodidad.** Ningún estudio del tamaño de Aspen Leaf está enviando esto. Vale la pena mencionarlo cuando lo mandes por primera vez.
