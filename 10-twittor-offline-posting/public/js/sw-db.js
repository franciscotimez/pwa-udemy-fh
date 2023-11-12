// Utilidades para grabar PouchDB
const db = new PouchDB("mensajes")

function guardarMensaje(mensaje) {
    mensaje._id = new Date().toISOString()

    db.put(mensaje).then(() => {
        console.log("mensaje guardado");
    })
}
