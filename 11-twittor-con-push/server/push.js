const URLSafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");

module.exports.getKey = () => {
  return URLSafeBase64.decode(vapid.publicKey);
};
