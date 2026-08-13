# Cómo usar esta biblioteca de prompts

## La idea

Un prompt no es una frase mágica. Es una **especificación**: le dices a la IA qué tiene que respetar, qué tiene que cambiar y qué no puede inventar. Igual que un finish schedule, pero para una máquina.

Todos los prompts de esta carpeta están escritos con la misma estructura, y todos están calibrados con los materiales, el estilo y el formato reales de tus empresas. Eso es lo que hace que no salga "una imagen de IA" sino un render que se parece a tu trabajo.

---

## Cómo se lee un prompt de esta biblioteca

```
🎯 PARA QUÉ SIRVE       en una línea
🔧 DÓNDE SE USA         Gemini / Claude / la app que sea
📥 QUÉ NECESITAS ANTES  imagen base, lista de materiales, etc.
📋 EL PROMPT            el bloque para copiar y pegar
✏️ QUÉ CAMBIAR          lo que va entre [CORCHETES]
💡 NOTAS                lo que aprendimos usándolo
```

Todo lo que aparezca entre `[CORCHETES EN MAYÚSCULA]` **lo reemplazas tú**. Si dejas un corchete sin llenar, el resultado va a salir genérico.

---

## Las tres reglas que cambian el resultado

### 1. Específico gana a bonito

`"un baño elegante y lujoso"` → resultado genérico, de catálogo.
`"chevron marble mosaic with brass inlay, polished, full height on the vanity wall"` → resultado tuyo.

Los adjetivos de venta (*stunning, luxurious, breathtaking*) no aportan información. Los nombres de material sí. Escribe como escribes un finish schedule.

### 2. Di qué NO se puede tocar

Este es el que más se olvida y el que más tiempo cuesta. Si no dices que la cámara y la geometría se respetan, la IA te va a mover el muro, cambiar la ventana y agregar una planta que nunca especificaste. La sección `PRESERVE EXACTLY` del prompt maestro existe para eso y **no se borra nunca**.

### 3. Corrige, no empieces de cero

Cuando algo sale mal, no vuelvas a lanzar el prompt completo con un cambio. **Sigue en la misma conversación** y pide el ajuste puntual. La IA mantiene el contexto de la imagen anterior y solo cambia lo que le pides. Volver a empezar te da una imagen distinta y pierdes lo que ya estaba bien.

Para esto está [`renderizado/03-revisiones-y-ajustes.md`](renderizado/03-revisiones-y-ajustes.md), que es la biblioteca de correcciones — incluido el clásico *"está muy oscuro"*.

---

## En qué herramienta va cada cosa

| Necesito… | Herramienta | Por qué |
|---|---|---|
| Convertir mi render base en fotorrealista | **Gemini** (imagen) | Ya tienes Google AI Pro. Edita sobre tu imagen conservando la geometría |
| Que alguien me arme el prompt bien escrito | **Claude** | Lee tu finish schedule y produce el prompt completo |
| Video / recorrido corto | **Gemini (Veo)** | Incluido en tu plan de Google |
| Redactar, analizar, organizar, cotizar | **Claude** | Mejor con texto largo, datos y formato |
| Recortar fondos | remove.bg / Canva | Lo que ya usas |

**Regla práctica:** *Claude piensa y escribe. Gemini dibuja.*

---

## El error más caro

Aplicar los materiales en el modelo **sí vale la pena**, aunque después el render lo haga la IA.

Un modelo en gris plano obliga a la IA a adivinar dónde va cada material, y cada adivinada mal son dos o tres rondas de corrección. Un modelo con madera donde va madera, vidrio donde va vidrio y piedra donde va piedra le da a la IA el mapa completo: solo tiene que mejorar el realismo, no inventar el diseño.

**El paso de aplicar materiales en Revit no se elimina. Se elimina el render largo de Lumion.**

---

## Orden de lectura recomendado

1. [`renderizado/01-maestro-render-interior.md`](renderizado/01-maestro-render-interior.md) — la plantilla base, la que más vas a usar
2. [`renderizado/03-revisiones-y-ajustes.md`](renderizado/03-revisiones-y-ajustes.md) — las correcciones
3. [`renderizado/biblioteca-de-materiales.md`](renderizado/biblioteca-de-materiales.md) — cómo se nombran tus materiales en inglés técnico
4. El resto, cuando lo necesites
