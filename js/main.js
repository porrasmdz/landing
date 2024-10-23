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
          }
        debugger
    })


}
window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)