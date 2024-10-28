const databaseURL = ""
let sendData = () => {
  // Obtén los datos del formulario
  const formData = new FormData(form); //form es el id del elemento del form de donde quiero sacar los datos
  const data = Object.fromEntries(formData.entries());
  data['saved'] = new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' })
  fetch(databaseURL, {
    method: 'POST', // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Especifica que los datos están en formato JSON
    },
    body: JSON.stringify(data) // Convierte los datos a JSON
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json(); // Procesa la respuesta como JSON
    })
    .then(result => {
      alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
      form.reset()
    })
    .catch(error => {
      alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}
let ready = () => {
  console.log('DOM está listo')
}

let loaded = () => {
  console.log('Iframes e Images cargadas')
  let myform = document.getElementById("form")
  myform.addEventListener("submit", (eventSubmit) => {
    eventSubmit.preventDefault()

    const emailElement = document.querySelector(".form-control-lg");
    const emailText = emailElement.value
    const keyframes = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(15px)' },
      { transform: 'translateY(-15px)' },
    ];

    const timing = {
      duration: 400, // in milliseconds
      easing: "linear",
    };

    const animation = new KeyframeEffect(emailElement, keyframes, timing);

    const animationPlayer = new Animation(animation);
    if (emailText.length === 0) {
      emailElement.focus()
      animationPlayer.play()
      return;
    }
    sendData();
  })


}
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)