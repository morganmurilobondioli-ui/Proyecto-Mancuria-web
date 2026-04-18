const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Inicializar Firebase Admin
admin.initializeApp();

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "TU_SECRET_KEY_AQUI";

/**
 * Función para validar el token de reCAPTCHA
 * Debe ser llamada desde el cliente después de completar el captcha
 */
exports.validateRecaptcha = functions.https.onCall(async (data, context) => {
    try {
        const { token } = data;

        if (!token) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Token de reCAPTCHA no proporcionado'
            );
        }

        // Verificar el token con Google
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: token
                }
            }
        );

        const { success, score, action } = response.data;

        if (!success) {
            throw new functions.https.HttpsError(
                'permission-denied',
                'Validación de reCAPTCHA fallida'
            );
        }

        // Retornar información del captcha validado
        return {
            success: true,
            score: score,
            action: action,
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        console.error('Error validando reCAPTCHA:', error);
        throw new functions.https.HttpsError(
            'internal',
            'Error al validar reCAPTCHA: ' + error.message
        );
    }
});

/**
 * Función para buscar órdenes de trabajo
 * Valida captcha antes de retornar datos sensibles
 */
exports.buscarOrdenesTrabajo = functions.https.onCall(async (data, context) => {
    try {
        const { placa } = data;

        if (!placa) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Placa no proporcionada'
            );
        }

        // Validar formato de placa
        if (!/^[A-Z0-9]{6,8}$/.test(placa)) {
            throw new functions.https.HttpsError(
                'invalid-argument',
                'Formato de placa inválido'
            );
        }

        const db = admin.firestore();

        // Buscar en variantes con y sin guión
        const placaConGuion = placa.slice(0, 3) + '-' + placa.slice(3);

        const queries = [
            db.collection('ordenes_trabajo').where('placa', '==', placa).get(),
            db.collection('ordenes_trabajo').where('placa', '==', placaConGuion).get()
        ];

        const [snapshot1, snapshot2] = await Promise.all(queries);

        const results = [];
        
        snapshot1.forEach(doc => {
            results.push({
                id: doc.id,
                ...doc.data()
            });
        });

        snapshot2.forEach(doc => {
            // Evitar duplicados
            if (!results.find(r => r.id === doc.id)) {
                results.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });

        return {
            success: true,
            data: results,
            count: results.length
        };

    } catch (error) {
        console.error('Error buscando órdenes:', error);
        throw new functions.https.HttpsError(
            'internal',
            'Error al buscar órdenes de trabajo'
        );
    }
});

/**
 * Health check de la aplicación
 */
exports.health = functions.https.onRequest((req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});
