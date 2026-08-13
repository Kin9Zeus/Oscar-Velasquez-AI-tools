# Credenciales y seguridad

🎯 Cinco minutos de lectura que evitan el único error de este proyecto que sí duele.

---

## Lo primero: cómo se autoriza de verdad

En la reunión inicial dijiste, textual: *"si tú me dices, necesito la clave del Instagram, necesito la clave del Facebook, hágale"*. Se agradece la confianza — y precisamente por eso vale la pena dejar esto claro:

> **No hace falta.** Y no se debe.

Los conectores de Claude se autorizan con el sistema de permisos de Google, de Canva o de Meta. El flujo es: haces clic en `Connect`, se abre **la pantalla del propio Google**, inicias sesión ahí, y le das permiso a Claude. La contraseña nunca pasa por el chat, ni la ve Claude, ni la ve nadie más.

### La regla que no tiene excepciones

**Nunca escribas una contraseña dentro de un chat.** Ni de Claude, ni de Gemini, ni de ningún asistente. No porque el modelo vaya a hacer algo malo con ella, sino porque queda escrita en el historial de la conversación, que se sincroniza, se respalda y puede quedar visible en una pantalla compartida.

Lo mismo aplica a: números de tarjeta, cuentas bancarias, documentos de identidad y datos personales de clientes que no necesites para la tarea.

---

## Contraseñas: cómo llevarlas bien

Ya que estamos, esto es lo más rentable que puedes hacer en media hora:

1. **Instala un gestor de contraseñas.** Bitwarden es gratis y suficiente. 1Password si prefieres pagar por mejor experiencia.
2. **Activa verificación en dos pasos** en: Google, Instagram, Facebook, LinkedIn y Claude. Es lo que evita que te roben la cuenta de Instagram de la empresa.
3. **Contraseñas distintas** en cada servicio. El gestor las genera y las recuerda por ti.

> El robo de cuentas de Instagram de empresas es común y es devastador: se pierde el histórico, los seguidores y la credibilidad. La verificación en dos pasos lo previene casi por completo.

---

## Compartir accesos con Juan Esteban

Cuando Juan Esteban entre al flujo, vas a necesitar darle acceso a cosas. Hazlo así:

| Qué | Cómo | No hagas |
|---|---|---|
| Carpetas de Drive | Compartir la carpeta específica con su correo | Darle tu contraseña de Google |
| Instagram | Agregarlo como usuario en Meta Business Suite | Pasarle la clave del Instagram |
| Claude | Que tenga su propia cuenta | Compartir la tuya |
| Este repositorio | Agregarlo como colaborador en GitHub | Mandarle el ZIP por WhatsApp |

**Principio:** acceso al mínimo necesario, con su propia identidad. Si mañana cambia de rol, le quitas el acceso sin cambiar todas tus contraseñas.

---

## Los datos de tus clientes

Estás manejando información de terceros: planos de casas, presupuestos, correos, a veces direcciones. Eso obliga a un mínimo de cuidado.

**Sí puedes:**
- Subir planos, especificaciones y renders a Claude para trabajarlos.
- Pegar correos de clientes para redactar respuestas.
- Analizar presupuestos y cotizaciones.

**Evita:**
- Subir contratos firmados con datos personales completos si no hace falta para la tarea.
- Compartir información de un cliente en un contexto donde no aporta nada.
- Guardar el moodboard de un cliente en una carpeta pública de Drive.

**Con Aspen Leaf hay un matiz:** el trabajo que haces ahí es de la empresa de Marcio, no tuyo. Antes de subir material de proyectos de Aspen Leaf a herramientas externas, vale la pena tener esa conversación con él. No es una formalidad vacía: es lo que te protege si algún día alguien pregunta.

> Ya le comentaste que ibas a dedicar tiempo a esto. Mencionar que además usas herramientas de IA con material de proyectos es la conversación natural que sigue — y probablemente termine en que él también lo quiera.

---

## Este repositorio

**Debe ser privado.** Contiene información comercial de las dos empresas: modelo de precios, condiciones, speech de ventas, brand briefs, datos de proyectos.

- En GitHub: repositorio **Private**, y Oscar agregado como colaborador.
- No lo hagas público.
- No lo reenvíes fuera del equipo.

### Qué nunca debe entrar al repositorio

Si en algún momento agregas archivos:

- ❌ Contraseñas o claves de API
- ❌ Contratos firmados
- ❌ Datos personales de clientes (direcciones completas, documentos)
- ❌ Información financiera de Aspen Leaf que no sea tuya

El archivo `.gitignore` ya excluye la carpeta `salidas/` y las carpetas de credenciales, pero la primera línea de defensa eres tú al decidir qué guardas ahí.

---

## Qué revisar siempre antes de enviar

La IA se equivoca. Lo hace con seguridad y con buena redacción, que es justo lo que la hace peligrosa. Antes de que algo salga hacia un cliente, un proveedor o Marcio:

| Revisa | Por qué |
|---|---|
| **Precios y montos** | Es el error más caro posible |
| **Medidas y cantidades** | Un sqft mal calculado se paga en obra |
| **Nombres propios** | Cliente, proyecto, proveedor, colega |
| **Fechas y plazos** | Un plazo prometido de más no se recupera |
| **URLs de proveedor** | Que lleven al producto correcto, no a la home |
| **Datos técnicos de MILLIMETER** | Un error técnico frente a un arquitecto cuesta credibilidad |

**No es desconfianza, es proceso.** Igual que revisas un plano antes de mandarlo a obra.

---

## Copias de seguridad

Tres cosas que conviene tener respaldadas:

1. **Los JSON de proyecto** (`datos/`) — son la especificación de cada trabajo. Si están en Drive, ya están respaldados.
2. **Los prompts que funcionan** — cada uno es tiempo que ya invertiste. Guárdalos.
3. **Las Instructions de tus Proyectos de Claude** — cópialas a un documento. Si algún día se pierden, reconstruirlas cuesta.

---

## Si algo sale mal

| Situación | Qué hacer |
|---|---|
| Pegaste una contraseña en un chat | Cambia esa contraseña **ahora**. Después borra la conversación |
| Un conector está haciendo algo raro | `Settings → Connectors → Disconnect`. Se puede volver a conectar después |
| Enviaste algo con un error a un cliente | Corrígelo de frente y rápido. Un correo directo con el dato correcto cierra el tema; una corrección tardía lo agranda |
| Perdiste acceso a una cuenta | Usa la recuperación del servicio. Si tenías verificación en dos pasos, es cuestión de minutos |
