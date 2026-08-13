---
name: cotizacion
description: Arma el archivo JSON de cotización para MILLIMETER by Casanova (piedra natural ultradelgada, por sqft y espesor) o para Aspen Leaf Interiors (honorarios de diseño por fases). Úsala cuando Oscar pida preparar, cotizar o presupuestar un proyecto.
---

# Cotización

## Cuándo se usa

- Oscar pide cotizar un proyecto de piedra para MILLIMETER.
- Oscar pide una propuesta de honorarios de diseño para Aspen Leaf.
- Oscar quiere actualizar o revisar una cotización existente.

## ⛔ La regla que está por encima de todo

**NUNCA inventes un precio unitario.**

Si Oscar no te dio un precio, pon `0` y márcalo en la lista de pendientes al final de tu respuesta. Un precio inventado en una cotización que se envía a un cliente es el peor error posible de este sistema — peor que no entregar nada.

Lo mismo aplica a: tasas de impuesto, costos de flete, tarifas horarias y plazos.

## Identifica primero la empresa

| | MILLIMETER | Aspen Leaf |
|---|---|---|
| Qué se cotiza | Piedra natural ultradelgada | Servicios de diseño interior |
| Unidades | `sqft`, `ea`, `set`, `ls` | `hr`, `rooms`, `visits`, `ls` |
| Secciones | Por espesor: 5 mm / 1 mm / 2 cm | Por fase: concepto / desarrollo / documentación |
| Cargos típicos | Selección de bloque, fabricación CNC, curvado, embalaje, flete, supervisión | Reembolsables |
| Plan de pagos | 50 / 40 / 10 | 25 / 20 / 30 / 25 |

## El esquema

```json
{
  "cotizacion": {
    "numero": "MM-2026-0142",
    "empresa": "millimeter",
    "fecha": "2026-08-13",
    "validez_dias": 21,
    "idioma": "en",
    "moneda": "USD",
    "asunto": "Custom floating vanity — Cream Travertine",
    "notas_intro": "…",
    "preparado_por": { "nombre": "", "cargo": "", "correo": "", "telefono": "" },
    "cliente":      { "nombre": "", "empresa": "", "direccion": "", "correo": "", "telefono": "" }
  },
  "secciones": [
    {
      "titulo": "MILLIMETER 5 mm — Vanity body",
      "nota": "…",
      "items": [
        {
          "descripcion": "Vanity body panels",
          "detalle": "…",
          "material": "Cream Travertine",
          "espesor": "5mm",
          "acabado": "Honed",
          "cantidad": 46.5,
          "unidad": "sqft",
          "precio_unitario": 86,
          "descuento_pct": 0
        }
      ]
    }
  ],
  "cargos":     [{ "concepto": "Freight", "monto": 890 }],
  "impuestos":  [{ "concepto": "TX state sales tax", "porcentaje": 8.25 }],
  "pagos":      [{ "hito": "Deposit on block approval", "porcentaje": 50 }],
  "condiciones": ["…"]
}
```

El generador calcula solo: subtotales, descuentos, cargos, impuestos, total y los montos del plan de pagos. **Tú no calculas nada** — solo estructuras.

## El campo `espesor` activa el cuadro de ahorro de peso

Si hay ítems con `"espesor": "5mm"` o `"1mm"` y unidad `sqft`, el generador produce automáticamente el cuadro comparativo de peso contra piedra tradicional de 2 cm. Es el argumento comercial más fuerte de MILLIMETER y sale sin que nadie tenga que acordarse.

Valores válidos: `"1mm"`, `"5mm"`, `"2cm"`, `"3cm"`.

## Condiciones estándar de MILLIMETER

Van **completas** en toda cotización. No las resumas:

1. No se trabaja con stock. Cada proyecto se selecciona directamente desde la cantera; se envían fotos y video del bloque real y el cliente aprueba por escrito antes de liberar el pedido.
2. No se manejan muestras físicas. Cada bloque es único y se prefiere que el cliente apruebe exactamente el material que se va a usar.
3. El tamaño de placa depende del bloque; el formato habitual es de aproximadamente 120 × 76 pulgadas.
4. La piedra natural tiene variación inherente de veta, tono y fondo. La variación es una propiedad del material, no un defecto.
5. Plazo: 6 a 8 semanas desde la aprobación escrita del bloque, sujeto a disponibilidad de cantera.
6. Los precios asumen que el sustrato y la estructura los suministra e instala un tercero, a plomo y escuadra, listos para recibir la piedra.
7. Las medidas en sitio deben confirmarse antes de liberar fabricación. Los cambios posteriores se cotizan aparte.
8. Las superficies MILLIMETER contienen menos de 0.5 % de sílice, frente a 40–80 % del cuarzo de ingeniería.
9. La cotización es válida por el periodo indicado. El precio de cantera puede cambiar después de esa fecha.

## Condiciones estándar de Aspen Leaf

1. Los honorarios cubren servicios de diseño únicamente. Mobiliario, equipamiento, flete e instalación se facturan aparte a costo más el fee de procurement acordado.
2. Se incluyen dos rondas de revisión por render. Rondas adicionales se facturan por hora.
3. Los cambios de alcance, distribución o especificación después de aprobados se facturan como servicios adicionales.
4. Los plazos que dan los proveedores son estimados y no los garantiza el diseñador.
5. Los materiales naturales tienen variación inherente de color, veta y textura. La variación no es un defecto.
6. Se requiere aprobación escrita del finish schedule antes de liberar cualquier orden de compra.
7. Las facturas vencen a 15 días. El trabajo puede pausarse en cuentas con más de 30 días de mora.

## Procedimiento

1. Identifica la empresa. Si no está claro, pregunta.
2. Agrupa el alcance en secciones — por espesor (MILLIMETER) o por fase (Aspen Leaf).
3. Un ítem por línea, con material, espesor y acabado cuando aplique.
4. Precios: los que Oscar dio. Los que no dio, `0` y a la lista de pendientes.
5. Agrega cargos, impuestos, plan de pagos y las condiciones completas.
6. Entrega el JSON y el comando para generarlo.

## Formato de salida

```
[1 línea: empresa, cliente, alcance en resumen]

```json
{ … }
```

**Guárdalo como:** `datos/cotizaciones/[archivo].json`

**Genérala con:**
```powershell
node herramientas/generar.js cotizacion datos/cotizaciones/[archivo].json
```

⚠️ **Precios pendientes de llenar:**
- [ítem] — puse 0
- …

⚠️ Revisa cantidades y precios antes de enviar.
```
