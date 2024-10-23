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
        if (emailText.length === 0) {
            emailElement.focus()
          }
        debugger
    })


}
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)