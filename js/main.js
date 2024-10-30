const databaseURL = "https://landing-f6015-default-rtdb.firebaseio.com/data.json"
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
      getData()
    })
    .catch(error => {
      alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

let ready = () => {
  console.log('DOM está listo')
  getData();
}

let getData = async () => {
  try {
    const response = await fetch(databaseURL);
    if (!response.ok) {
      alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    }
    const data = await response.json();
    if (data != null) {

      // Cuente el número de suscriptores registrados por fecha a partir del objeto data
      let countSuscribers = new Map()

      if (Object.keys(data).length > 0) {
        for (let key in data) {

          let { email, saved } = data[key]

          let date = saved.split(",")[0]

          let count = countSuscribers.get(date) || 0;
          countSuscribers.set(date, count + 1)
        }
      }
      // END
      // Genere y agregue filas de una tabla HTML para mostrar fechas y cantidades de suscriptores almacenadas 
      if (countSuscribers.size > 0) {

        subscribers.innerHTML = ''

        for (let [date, count] of countSuscribers) {
          const countIdx = [...countSuscribers?.keys()]?.indexOf(date) +  1 ?? 0
          let rowTemplate = `
                  <tr>
                      <th scope="row">${countIdx}</th>
                      <td>${date}</td>
                      <td>${count}</td>
                  </tr>`
          subscribers.innerHTML += rowTemplate
        }
      }
      // END

    }

  } catch (error) {
    // Muestra cualquier error que ocurra durante la petición
    alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
  }
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