# APP_SECRET histórico retirado

El commit `71b4cdf48104d0abf4d7ca0aaefd0cc8159cf2c3` incluyó un APP_SECRET
en `.env`. La copia actual del repositorio no lo contiene.

El 2026-11-02 se generaron dos valores independientes de 32 bytes aleatorios,
uno para producción y otro para preview, y se almacenaron fuera de Git en
Coolify como variables runtime. La comprobación del kernel desplegado
inicialmente devolvía EnvNotFoundException para kernel.secret en ambas
instancias; no se considera suficiente comprobar solo la pantalla de entorno.

El reinicio solicitado a Coolify intentó recompilar la rama principal y falló
en npm con `Cannot read properties of null (reading 'edgesOut')`; las imágenes
y las instancias anteriores continuaron funcionando. Se instalaron los nuevos
valores en `.env.local` del runtime, con permisos 0600, conservando cualquier
configuración ajena. La configuración persistente de Coolify servirá los mismos
valores en próximos despliegues. No se guardaron valores en el repositorio ni
se utilizó el secreto histórico para autenticar peticiones.

La comparación en memoria de kernel.secret confirmó el valor nuevo esperado
en producción y en PR10. Una petición GET `/` a través de cada kernel produjo
HTML y estado 200. La comprobación pública desde CLI obtuvo 403 de Cloudflare;
no acredita accesibilidad pública ni validación humana del formulario. No se
envió correo. Las evidencias operativas con fechas, IDs y comparaciones
booleanas se conservan fuera del repositorio en el informe de rotación.

Gitleaks mantiene una única excepción para el fingerprint exacto de ese
commit, archivo, regla y línea. Es un secreto histórico retirado, no un falso
positivo. El historial compartido no se reescribe. Una reintroducción en otro
commit tiene otro fingerprint y debe bloquear la CI. No añadir excepciones
generales por ruta, variable o patrón.
