---
name: revision-de-especificacion
description: Revisa un finish schedule o una especificación de materiales buscando contradicciones, omisiones y riesgos de obra antes de liberarla al cliente o al contratista. Úsala cuando Oscar esté por enviar una especificación, cerrar un proyecto, o pregunte si algo está bien especificado.
---

# Revisión de especificación

## Cuándo se usa

- Antes de liberar un finish schedule al cliente o al contratista.
- Antes de emitir órdenes de compra.
- Cuando Oscar pregunte si una especificación está completa.
- Al cerrar un espacio o un proyecto.

## Por qué existe

Los errores de especificación no se descubren en el escritorio: se descubren en obra, donde cuestan dinero, tiempo y credibilidad. Esta revisión toma dos minutos y es exactamente la que se salta cuando hay prisa — que es justo cuando ocurren los errores.

## Qué revisar

### 1. Completitud

- [ ] ¿Toda superficie visible en el plano y en los renders tiene material asignado? Piso, muros, cielo, salpicadero, tope, frentes de mueble.
- [ ] ¿Cada elemento tiene código, proveedor, acabado y formato?
- [ ] ¿Hay algo marcado como **TBD** que ya debería estar resuelto a esta altura del proyecto?
- [ ] ¿Los enlaces llevan a la **página del producto** o solo a la home del proveedor?
- [ ] ¿Están las cantidades de todo lo que se compra por área o por unidad?

### 2. Conflictos físicos

Los que más aparecen:

| Conflicto | Qué revisar |
|---|---|
| Grifería de pared | ¿La profundidad del tope y el espesor del muro permiten el alcance del pico? ¿Está especificada la válvula de empotrar? |
| Drenaje lineal | ¿La pendiente del tile llega al drenaje? ¿El formato del tile permite esa pendiente? |
| Espejos y luminarias | ¿Chocan? ¿La altura del colgante deja pasar la puerta de un gabinete? |
| Tile de gran formato | ¿Cabe por el acceso? ¿El muro está lo bastante plano? |
| Puertas correderas | ¿El herraje pasa por delante de un interruptor o una toma? |
| Toallero eléctrico | ¿Está previsto el punto eléctrico antes del enchape? |
| Piedra ultradelgada | ¿Hay sustrato estructural definido? ¿A plomo y escuadra? |
| Mueble existente que se conserva | ¿Las medidas nuevas encajan con lo que se queda? |

### 3. Coherencia de diseño

- [ ] Los metales: ¿la mezcla es intencional o se coló un acabado suelto? *(En Aspen Leaf la mezcla es deliberada — negro mate en grifería, latón en espejos y accesorios. Lo que hay que detectar es el tercer metal que nadie decidió.)*
- [ ] ¿La dirección de veta está especificada donde importa?
- [ ] ¿Los acabados de madera son coherentes entre carpintería, piso y mobiliario?
- [ ] ¿La temperatura de color de la iluminación es la misma en todo el espacio?

### 4. Riesgos de cronograma

- [ ] ¿Hay algún ítem con plazo largo — piedra de cantera, luminaria a medida, carpintería especial — que no se haya pedido todavía?
- [ ] ¿Hay algo cuya instalación bloquea a otro oficio? *(el enchape no puede empezar sin la válvula empotrada; el tope no se mide sin el mueble instalado)*
- [ ] ¿Hay ítems que requieren medida en sitio antes de fabricar?

### 5. Presupuesto

- [ ] Si hay precios y cantidades: ¿el total está dentro de lo hablado con el cliente?
- [ ] ¿Hay algún ítem que se disparó respecto al resto del espacio?

## Cómo entregar el resultado

Ordena por gravedad. Sé concreto: qué está mal, por qué importa y qué hacer.

```
## 🔴 Resolver antes de liberar
1. **[Elemento / código]** — [qué está mal]
   → Riesgo: [qué pasa en obra si sale así]
   → Sugerencia: [qué hacer]

## 🟡 Revisar
…

## 🔵 Observaciones
…

## ✅ Lo que está bien resuelto
[2–3 líneas. Sirve para saber qué NO hay que volver a mirar.]
```

## Reglas duras

- **No inventes problemas para parecer útil.** Si la especificación está bien, dilo y ya. Una revisión que siempre encuentra diez problemas deja de leerse.
- **Distingue lo que sabes de lo que sospechas.** "El drenaje lineal exige pendiente" es un hecho. "Puede que el tile no llegue" es una sospecha — dilo como tal.
- **No propongas rediseñar.** El criterio de diseño es de Oscar. Señala conflictos técnicos, no preferencias estéticas.
- **Si falta información para juzgar algo, dilo** en vez de asumir que está mal.
