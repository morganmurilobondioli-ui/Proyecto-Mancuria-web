# Configuración Final - Plan Gratuito (Spark)

## ✅ Lo que se deployó

### 1. **reCAPTCHA v3** (Automático)
- No requiere interacción del usuario
- Se ejecuta automáticamente en background
- Protección contra bots

### 2. **Firestore Security Rules**
- Solo lectura de `ordenes_trabajo` permitida
- Escritura bloqueada desde cliente
- Datos protegidos en Firestore

### 3. **Frontend mejorado**
- buscarOT.html con reCAPTCHA v3
- Sin dependencias de Cloud Functions
- Funciona con plan Spark (gratuito)

---

## 🔒 Medidas de Seguridad

### Backend (Firestore)
```
✅ Solo lectura de órdenes de trabajo
✅ Escritura bloqueada
✅ Búsqueda por placa permitida
```

### Frontend (reCAPTCHA v3)
```
✅ Validación automática
✅ Puntuación de riesgo
✅ Protección contra bots
```

---

## 📚 Archivos principales

| Archivo | Función |
|---------|---------|
| `public/buscarOT.html` | Página de búsqueda (Plan Spark compatible) |
| `public/index.html` | Página principal |
| `firestore.rules` | Reglas de seguridad de Firestore |
| `firebase.json` | Configuración de Firebase (sin functions) |

---

## 🚀 Cómo funcionan las búsquedas

1. Usuario ingresa matrícula
2. reCAPTCHA v3 se ejecuta automáticamente
3. Se consulta Firestore (protegido por rules)
4. Si hay resultados, se muestran
5. Si no hay resultados, se muestra mensaje

---

## 📊 Límites del Plan Spark

| Recurso | Límite |
|---------|--------|
| Almacenamiento | 1 GB |
| Descargas/mes | 10 GB |
| Escrituras/día | 20,000 |
| Lecturas/día | 50,000 |
| Deleteiones/día | 20,000 |

**Para buscar OT**: Las lecturas son muy económicas, así que estarás bien dentro del límite.

---

## 🆙 Upgradear a Blaze (Opcional)

Si en el futuro necesitas:
- Cloud Functions
- Más capacidad
- Autenticación avanzada

**URL**: https://console.firebase.google.com/project/mancuria-automotriz/usage/details

---

## ✨ URLs en vivo

- **Principal**: https://mancuria-automotriz.web.app
- **Buscar OT**: https://mancuria-automotriz.web.app/buscarOT.html

---

## 📝 Notas finales

✅ Todo funciona sin pagos  
✅ Datos protegidos con Firestore Rules  
✅ reCAPTCHA v3 activo  
✅ Listo para producción  

¿Necesitas ayuda con algo más?
