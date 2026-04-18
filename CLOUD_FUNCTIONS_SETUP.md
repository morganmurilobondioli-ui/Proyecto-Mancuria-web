# Configuración de Cloud Functions para Buscar OT

## ¿Qué se agregó?

Se crearon **Cloud Functions en Firebase** para:
1. **Validar reCAPTCHA v3** en el backend (seguridad máxima)
2. **Buscar órdenes de trabajo** desde Firestore con validación

Esto proporciona:
- ✅ Validación de captcha en backend (no puede ser bypasseada)
- ✅ Protección contra bots automatizados
- ✅ reCAPTCHA v3 (sin widget visible, automático)

## Pasos para configurar

### 1. Tener tu Secret Key de reCAPTCHA

Ve a: https://www.google.com/recaptcha/admin/console

- Selecciona tu sitio "Mancuria Buscar OT"
- Copia la **Secret Key** (NO la Site Key)

### 2. Configurar variables de entorno

En la carpeta `functions/`, crea un archivo `.env.local`:

```bash
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
```

O usa Firebase Environment Variables:

```bash
cd functions
firebase functions:config:set recaptcha.secret_key="tu_secret_key_aqui"
```

### 3. Instalar dependencias

```bash
cd functions
npm install
```

### 4. Deployar las funciones

```bash
firebase deploy --only functions
```

O desde la raíz:
```bash
firebase deploy
```

## Verificar que funciona

Una vez deployadas, en la consola de Firebase verás algo como:

```
✔ functions[validateRecaptcha]: http function initialized at https://us-central1-mancuria-automotriz.cloudfunctions.net/validateRecaptcha
✔ functions[buscarOrdenesTrabajo]: http function initialized at https://us-central1-mancuria-automotriz.cloudfunctions.net/buscarOrdenesTrabajo
✔ functions[health]: http function initialized at https://us-central1-mancuria-automotriz.cloudfunctions.net/health
```

## Cambios implementados

### Frontend (buscarOT.html)
- ✅ Cambio a **reCAPTCHA v3** (automático, no requiere interacción)
- ✅ Integración con **Cloud Functions**
- ✅ Validación de token antes de buscar
- ✅ Mejor seguridad

### Backend (Cloud Functions)
- ✅ `validateRecaptcha()`: Valida el token de reCAPTCHA con Google
- ✅ `buscarOrdenesTrabajo()`: Busca OT en Firestore
- ✅ `health()`: Health check de la aplicación

## Notas de seguridad

- La Secret Key NUNCA debe estar en el código frontend
- Siempre valida en backend (Cloud Functions)
- reCAPTCHA v3 usa puntuación: 0.0 (bot) a 1.0 (humano)
- Las funciones están protegidas por reglas de Firestore

## Troubleshooting

Si no ves el cambio:
1. Espera 2-3 minutos para que se replique
2. Limpiar caché del navegador (Ctrl+Shift+Supr)
3. Verifica en Firebase Console que las funciones estén desplegadas

¿Necesitas ayuda con algo más?
