// Codigo de la app

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}

// if (window.caches) {
//   // Crea una cache
//   caches.open("prueba-1");
//   caches.open("prueba-2");

//   // Si existe la cache, devuelve una promesa
//   caches.has("prueba-3").then(console.log);

//   // Elimina una cache, devuelve una promesa
//   caches.has("prueba-1").then(console.log);

//   // Creo cache 1.1
//   caches.open("cache-v1.1").then((cache) => {
//     // cache.add("/index.html");

//     cache
//       .addAll(["/index.html", "/css/style.css", "/img/main.jpg"])
//       .then(() => {
//         // cache.delete("/css/style.css");

//         // Reemplazo cosas en la cache
//         cache.put("/index.html", new Response("Hola mundo"));
//       });

//     // cache.match("/index.html").then((resp) => {
//     //   resp.text().then(console.log);
//     // });
//   });

//   caches.keys().then(console.log);
// }
