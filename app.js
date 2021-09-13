//-----variables------
const foto = document.getElementById("captura");
const video = document.getElementById("video");
let camara = document.getElementById("camara");
const btnDownloads = document.getElementById("btn-descargar");
let enlaceDesacarga = document.getElementById("download");

//-----eventos-----

//tomar foto
foto.addEventListener(
  "click",
  function (ev) {
    ev.preventDefault();
    const listaCanvas = document.querySelectorAll("canvas");
    //Controlamos que el usuario no tome más de 5 fotos
    if (listaCanvas.length < 5) {
      takepicture();
    } else {
      const txt =
        "No se pueden tomar más de 5 fotos, guarde o borrelas para seguir tomando más.";
      mostrarMensaje(txt);
      // console.log(listaCanvas);
    }
  },
  false
);

//descargar fotos
btnDownloads.addEventListener("click", (e) => {
  e.preventDefault();
  const listaCanvas = document.querySelectorAll("canvas");
  //verificamos que existan elementos de imagen
  if (listaCanvas.length > 0) {
    //alerta
    const confirmacion = confirm(
      "Seguro quiere descargar las fotos en su computadora?"
    );
    //pregunta si quiere guardar las imagenes
    if (confirmacion) {
      //recorre las imagenes para descargar mediante etiqueta "a"
      listaCanvas.forEach((imagen, index) => {
        enlaceDesacarga.href = imagen.toDataURL("image/png");
        enlaceDesacarga.download = `imagen-${index + 1}`;
        enlaceDesacarga.click();
      });
    } else {
      // cancelar guardado
      const txt = "Las imagenes no se descargaron.";
      mostrarMensaje(txt);
    }
  } else {
    const txt = "No hay imagenes para descargar.";
    mostrarMensaje(txt);
  }
});

//------funciones-------
//configuracion de navegador para los dispositivos
navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: true,
  })
  .then((respuesta) => {
    //obtenemos la camara y video
    camara.srcObject = respuesta;
    camara.onloadedmetadata = (e) => camara.play();
  })
  .catch((error) => {
    console.log(error);
  });
//funcion que captura la imagen y la coloca en canvas
function takepicture() {
  const contenedor = document.querySelector(".canvas-contenedor");
  const canvas = document.createElement("canvas");
  canvas.classList.add("canvas");
  canvas.width = 400;
  canvas.height = 400;
  canvas.getContext("2d").drawImage(camara, 0, 0, 400, 400);

  // aggregamos la imagen al contenedor
  contenedor.appendChild(canvas);
}
//funcion que permite mostrar los mensajes de alertar personalizados
function mostrarMensaje(texto) {
  const mensaje = document.querySelector(".mensaje");

  mensaje.textContent = texto;
  mensaje.classList.toggle("activo");
  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.classList.toggle("activo");
  }, 4000);
}
