const fs = require("fs");
const URLSafeBase64 = require("urlsafe-base64");
const vapidKeys = require("./vapid.json");

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:franciscotimez@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let suscripciones = require("./subs-db.json");

module.exports.getKey = () => {
  return URLSafeBase64.decode(vapidKeys.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
  suscripciones.push(suscripcion);

  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
  console.log(suscripciones);
};

// https://web.dev/articles/push-notifications-display-a-notification?hl=es-419
module.exports.sendPush = (post) => {
  const notificacionesEnviadas = [];

  suscripciones.forEach((suscripcion, i) => {
    const pushPromise = webpush
      .sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log)
      .catch((err) => {
        if (err.statusCode === 410) {
          suscripciones[i].gone = true;
        }
      });
    notificacionesEnviadas.push(pushPromise);
  });

  Promise.all(notificacionesEnviadas).then(() => {
    suscripciones = suscripciones.filter((subs) => !subs.gone);

    fs.writeFileSync(
      `${__dirname}/subs-db.json`,
      JSON.stringify(suscripciones)
    );
  });
};
