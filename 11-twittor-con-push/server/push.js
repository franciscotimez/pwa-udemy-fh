const fs = require("fs");
const URLSafeBase64 = require("urlsafe-base64");
const vapidKeys = require("./vapid.json");

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:franciscotimez@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const suscripciones = require("./subs-db.json");

module.exports.getKey = () => {
  return URLSafeBase64.decode(vapidKeys.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
  console.log(suscripciones);
};

module.exports.sendPush = (post) => {
  suscripciones.forEach((suscripcion, i) => {
    webpush.sendNotification(suscripcion, post.titulo);
  });
};
