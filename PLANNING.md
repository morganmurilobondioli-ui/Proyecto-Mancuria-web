# Planning Mancuria Web

## Objetivo

Construir un portal web claro y confiable para Mancuria Automotriz, con dos objetivos principales:

- Captar clientes para servicios de diagnostico, mantenimiento y programacion automotriz.
- Permitir que clientes consulten el estado de su Orden de Trabajo por placa/matricula.

## Alcance Actual

### Pagina principal

- Hero con propuesta de valor.
- Seccion de servicios con precios referenciales.
- Galeria preparada para fotos reales del taller.
- Seccion institucional: mision, vision, marcas y tipos de cliente.
- Ubicacion, horarios, correo y WhatsApp.
- CTA para agendar y consultar OT.

### Busqueda de OT

- Formulario por placa/matricula.
- reCAPTCHA v3 en frontend.
- Consulta en tiempo real a Firestore.
- Resultados con estado, cliente, vehiculo, kilometraje, falla, trabajo realizado, fechas y total.
- Mensaje de vacio con contacto por WhatsApp.

## Roadmap Sugerido

### Fase 1 - UI y contenido base

- Pulir estilos visuales responsive.
- Reemplazar placeholders por fotos reales de servicios y taller.
- Normalizar acentos y textos en espanol.
- Revisar textos comerciales para hacerlos mas concretos y consistentes.

### Fase 2 - Seguridad y datos

- Revisar reglas de Firestore para evitar lectura abierta de toda la coleccion.
- Definir modelo final de `ordenes_trabajo`.
- Decidir si la busqueda sera directa desde cliente o mediante Cloud Functions.
- Validar reCAPTCHA en backend si se migra a Firebase Blaze.

### Fase 3 - Experiencia de cliente

- Agregar estados visuales de avance de OT.
- Agregar historial de actualizaciones por orden.
- Agregar boton para compartir consulta por WhatsApp.
- Optimizar mensajes cuando una placa no tiene resultados.

### Fase 4 - Operacion interna

- Crear panel privado para registrar/actualizar OT.
- Agregar autenticacion para personal del taller.
- Cargar fotos o evidencias por OT.
- Exportar reportes simples por fecha, placa o cliente.

### Fase 5 - Produccion y medicion

- Configurar analytics/eventos.
- Medir consultas de OT, clics en WhatsApp y conversiones.
- Revisar SEO local para Chincha/Ica.
- Automatizar despliegue desde GitHub si el flujo del equipo lo necesita.

## Prioridades Inmediatas

1. Reemplazar imagenes placeholder por fotos reales.
2. Revisar seguridad de Firestore.
3. Corregir encoding/textos con caracteres rotos en documentos `.md`.
4. Verificar mobile en home y busqueda OT.
5. Definir si Cloud Functions queda activa o se retira del repo.

## Stack

- Frontend: HTML5, CSS3, JavaScript ES Modules.
- UI base: plantilla Crafto, Bootstrap, Bootstrap Icons, Feather, Font Awesome.
- Interaccion: jQuery y scripts vendor incluidos en la plantilla.
- Backend/BaaS: Firebase Hosting y Cloud Firestore.
- Seguridad: Firestore Rules y reCAPTCHA v3.
- Funciones opcionales: Firebase Cloud Functions con Node.js, Firebase Admin y Axios.
- Build tooling: Gulp, Sass, PostCSS, Autoprefixer, CSSNano y Terser.
- Deploy: Firebase Hosting, proyecto `mancuria-automotriz`.
