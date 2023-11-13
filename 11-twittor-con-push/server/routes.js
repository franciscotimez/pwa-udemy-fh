// Routes.js - Módulo de rutas
const express = require("express");
const router = express.Router();
const push = require("./push");

const mensajes = [
  {
    _id: "XXX",
    user: "spiderman",
    mensaje: "Hola Mundo",
  },
];

// Get mensajes
router.get("/", function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensaje
router.post("/", function (req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user,
  };

  mensajes.push(mensaje);

  console.log(mensajes);

  res.json({
    ok: true,
    mensaje,
  });
});

// Notificaciones
// Almacenar subscripcion
router.post("/subscribe", function (req, res) {
  const suscripcion = req.body;
  console.log(suscripcion);

  push.addSubscription(suscripcion);

  res.json({
    ok: true,
  });
});

// Obtener key publico
router.get("/key", function (req, res) {
  const key = push.getKey();
  res.send(key);
});

// Enviar notificaciones Push
// SOLO se controla desde el backend
router.post("/push", function (req, res) {
  const notificacion = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario,
  };

  push.sendPush(notificacion);
  
  res.json({
    ok: true,
    notificacion,
  });
});

module.exports = router;
