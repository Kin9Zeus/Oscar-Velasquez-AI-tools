# Aspen Leaf Interiors — brand brief

> Este archivo es **contexto para la IA**. Va cargado en los Proyectos de Claude que trabajan para Aspen Leaf. Escrito para que un modelo lo lea y produzca trabajo que pase por trabajo del estudio.

---

## Identidad

| | |
|---|---|
| **Nombre completo** | Aspen Leaf Interiors *by Marcio Decker* |
| **Sector** | Diseño de interiores residencial de alta gama |
| **Mercado** | Estados Unidos — montaña / resort (Aspen, Colorado y similares) |
| **Sitio** | aspenleafinteriors.com |
| **Instagram** | [@aspenleafinteriors](https://www.instagram.com/aspenleafinteriors) |
| **Rol de Oscar** | Diseñador. Modelado, renderizado, selección de materiales, storyboards, documentación y coordinación con proveedores |
| **Equipo** | Marcio Decker (principal). Juan Esteban (modelado Revit / render Lumion) |
| **Idioma de entregables** | **Inglés.** Todo lo que ve el cliente va en inglés |

## Lenguaje de diseño

**Mountain modern de alto nivel.** No es rústico de cabaña ni es minimalismo frío. Es la combinación de tres cosas:

1. **Materiales naturales con carácter** — piedra con veta fuerte (cuarcita, mármol Calacatta Viola), maderas de veta abierta (roble blanco *rift*, nogal), maderas quemadas (*shou sugi ban*), travertino estriado.
2. **Herrajes y metales que contrastan** — negro mate en baños, latón envejecido y níquel pulido en espacios sociales. Los metales se mezclan a propósito, no por descuido.
3. **Un color de acento sanguíneo** — el borgoña / oxblood aparece de forma recurrente en cuero, textiles y almohadas. Es la firma cromática del estudio.

**Paleta base:** blanco cálido, gris piedra, greige, roble natural, verde musgo, nogal oscuro. **Acento:** oxblood.

**Lo que el estudio NO hace:** gris frío corporativo, blanco total sin textura, muebles de catálogo genérico, iluminación plana, simetría rígida.

## Cómo se entrega el trabajo

El entregable es un **storyboard en Google Slides**, una lámina por especialidad, con los enlaces de proveedor debajo. Este es el orden fijo por espacio:

```
1. FLOOR PLAN            plano con códigos de especificación (T-12, P-05, LT-18, S-06, BH-04…)
2. MATERIALS             tiles, piedra, countertop, plumbing, herrajes
3. FURNITURE & LIGHTING  mobiliario, luminarias, textiles, carpintería
4. APPLIANCES            (solo cocinas) range, hood, oven, microwave, coffee machine — con links y acabados
5. RENDERINGS            las vistas del espacio
6. FINISH SCHEDULE       tabla con código, proveedor, acabado, formato y enlace
```

### Formato visual de la lámina

- Banda gris clara arriba a la izquierda: **`Nombre del espacio`** en serif + barra vertical + **`CATEGORÍA`** en sans mayúscula negrita.
- **Nombre del proyecto en vertical** sobre el borde derecho, en mayúsculas espaciadas (ej. `GOODRICH`).
- **Logo de Aspen Leaf abajo a la derecha.**
- Fondo blanco. Los objetos van recortados sin fondo (*remove background*) sobre texturas de material.
- Las anotaciones de revisión se marcan con **recuadro rojo**.

### Códigos de especificación

| Prefijo | Categoría |
|---|---|
| `T-` | Tile / cerámica |
| `S-` | Piedra / countertop |
| `P-` | Plumbing (grifería, sanitarios, drenajes) |
| `LT-` | Iluminación |
| `BH-` | Herrajes de baño / gabinete |
| `F-` | Mobiliario |
| `MW-` | Carpintería / millwork |
| `TX-` | Textiles |
| `AC-` | Accesorios |

## Herramientas actuales

Revit (modelado) · Lumion (render) · Google Slides (presentación) · Google Drive 5 TB (biblioteca de activos) · remove.bg (recortes)

## Tono de la comunicación al cliente

Sobrio, técnico, sin adjetivos de venta. Se afirma lo que se sabe y se dice explícitamente lo que falta confirmar. Frases cortas. Se nombra el material por su nombre real, nunca "una piedra bonita".

**Bien:** *"Honed Verde Alpi countertop, 3 cm slab with a 1½" mitered edge. Undermount sinks. The same slab is used for the shower bench."*

**Mal:** *"A stunning natural stone countertop that brings warmth and elegance to the space."*

## Restricciones que la IA debe respetar

- El material que no esté confirmado se marca como **TBD**, nunca se inventa.
- Nunca inventar SKU, precio ni URL de proveedor. Si no está el dato, se deja el campo vacío.
- Las medidas se dan en **pies y pulgadas** (`8'-6"`, `12" x 48"`), nunca en métrico.
- El cliente final es de Estados Unidos: fechas `MM/DD/YYYY`, moneda USD.
- Nada de lo generado se envía sin revisión de Oscar.
