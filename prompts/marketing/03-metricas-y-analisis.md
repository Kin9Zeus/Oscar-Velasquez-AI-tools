# Métricas y análisis

🎯 **Para qué sirve** — Responder las preguntas que ya te haces: *¿quién me está viendo?, ¿quién no?, ¿esto lo vuelvo a publicar?, ¿a esta persona le hablo?* — pero con los números delante en vez de a ojo.

🔧 **Dónde se usa** — Proyecto **Contenido MILLIMETER** en Claude.

---

## De dónde sacar los datos

Usas Instagram desde la app. Sirve, pero para analizar en serio conviene entrar por **Meta Business Suite** (`business.facebook.com`), que da tres cosas que la app no da bien:

1. **Exportar** los datos en vez de leerlos en pantalla.
2. **Comparar periodos** — este mes contra el anterior.
3. **Programar** publicaciones gratis.

📖 Cómo conectarlo: [`../../docs/03-conectores-mcp-y-apis.md`](../../docs/03-conectores-mcp-y-apis.md)

### Qué copiar para el análisis mensual

Por cada publicación del mes:

```
Fecha | Formato | Tema/pilar | Alcance | Interacciones | Guardados | Compartidos | Seguidores ganados
```

Y del perfil: seguidores totales, alcance del mes, visitas al perfil, clics al enlace, y el desglose de audiencia (ciudad, país, edad, horario activo).

**Guardados y compartidos son las métricas que importan.** Un like es un reflejo; un guardado es un arquitecto archivando tu material para un proyecto. En este negocio, un guardado vale veinte likes.

---

## 📋 Prompt — análisis mensual

```
Analiza el rendimiento de [@cuenta] en [MES].

DATOS DEL PERFIL
· Seguidores al inicio / al final: [N] / [N]
· Alcance total: [N] · Visitas al perfil: [N] · Clics al enlace: [N]
· Audiencia: [ciudades, países, edades, horas activas]

PUBLICACIONES DEL MES
[Pega la tabla]

MES ANTERIOR (para comparar)
[Pega los totales]

DAME
1. Qué pasó este mes, en 3 líneas. Sin rodeos.
2. Los 3 posts que mejor rindieron y QUÉ tienen en común
3. Los 3 que peor rindieron y qué falló — formato, tema, gancho u horario
4. Qué pilar de contenido está rindiendo mejor y cuál está de más
5. Qué formato conviene priorizar el mes que viene
6. Mejores horarios reales según los datos, no según la teoría
7. Qué dice el perfil de audiencia sobre a quién NO estamos llegando
   y deberíamos
8. 5 decisiones concretas para el mes siguiente

Sé directo. Si algo no funciona, dilo. Si un dato no alcanza para
concluir algo, dilo también en vez de inventar una explicación.
```

---

## 📋 Prompt — ¿republico esto?

La pregunta que ya te haces, ahora con criterio.

```
Este post rindió [métricas] cuando se publicó el [fecha]:
[descripción del post]

¿Vale la pena volver a publicarlo o reciclarlo?
· Si sí: ¿tal cual, en otro formato, o con otro gancho?
· Si es en otro formato, dime cuál y por qué
· ¿Cuánto tiempo conviene esperar entre una publicación y la otra?
· Reescríbeme el caption con un ángulo distinto

Considera que el contenido técnico y de producto envejece mucho más
lento que el contenido de actualidad.
```

---

## 📋 Prompt — a quién le hablo

```
Del análisis de audiencia de [@cuenta]:
[PEGA los datos de audiencia y la lista de cuentas que más interactúan]

DAME
1. Perfiles que interactúan seguido y que valdría la pena contactar directo
2. Para cada uno: por qué es interesante para MILLIMETER
3. Un mensaje directo de apertura para cada uno — corto, sin sonar a venta
4. Qué tipo de cuenta nos falta atraer y qué contenido la traería

Recuerda que el cliente objetivo es arquitecto, diseñador de interiores
o fabricador en Estados Unidos y Sudamérica.
```

---

## 📋 Prompt — informe para presentar

Cuando quieras mostrarle resultados a alguien — un socio, Marcio, un cliente.

```
Con estos datos, arma un informe de una página para presentar:
[PEGA los datos]

· Titular con el dato más importante del periodo
· 3 métricas clave con su variación frente al periodo anterior
· Los 3 mejores contenidos, con la razón de por qué funcionaron
· Qué estamos haciendo el mes que viene
· Sin jerga de marketing. Que lo entienda alguien que no vive en Instagram.

Formato: markdown, listo para pasar a una lámina.
```

---

## 💡 Notas

**Una vez al mes es suficiente.** Mirar métricas todos los días no cambia nada y sí quema tiempo.

**Dos meses de datos antes de concluir.** Un mes solo te dice qué pasó; dos te empiezan a decir por qué.

**Lo que se mide de verdad son los proyectos, no los seguidores.** La pregunta final no es "¿cuántos seguidores gané?", es "¿cuántos arquitectos me escribieron por un proyecto?". Lleva esa cuenta aparte, aunque sea en una libreta: es la única métrica que paga.
