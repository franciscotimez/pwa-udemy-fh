const fs = require("fs");
const URLSafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");

const suscripciones = require("./subs-db.json");

module.exports.getKey = () => {
  return URLSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
  console.log(suscripciones);
};
