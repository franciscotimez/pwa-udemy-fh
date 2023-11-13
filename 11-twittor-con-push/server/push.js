const URLSafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");

const suscripciones = []

module.exports.getKey = () => {
  return URLSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion)

  console.log(suscripciones);
};
