// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

const mensajes = [
  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }
];

// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensaje
router.post('/', function (req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push(mensaje);

  console.log(mensajes);

  res.json({
    ok: true,
    mensaje
  });
});

// Notificaciones
// Almacenar subscripcion
router.post('/subscribe', function (req, res) {

  res.json({
    ok: true,
  });
});

// Obtener key publico
router.get('/key', function (req, res) {

  res.json({
    ok: true,
  });
});

// Enviar notificaciones Push
// SOLO se controla desde el backend
router.post('/push', function (req, res) {

  res.json({
    ok: true,
  });
});


module.exports = router;