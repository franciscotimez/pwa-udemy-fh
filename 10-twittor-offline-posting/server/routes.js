// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

const mensajes = [
  {
    _id: "xxx",
    user: "spiderman",
    mensaje: "Hola mundo"
  },
  {
    _id: "xxx",
    user: "ironman",
    mensaje: "Hola mundo"
  }
]

// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json(mensajes)
});

// Post mensajes
router.post('/', function (req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user,
  }

  mensajes.push(mensaje)

  res.json({
    ok: true,
    mensaje
  })
});

module.exports = router;