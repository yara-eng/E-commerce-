const scriptURL="https://script.google.com/macros/s/AKfycbyWDgX7-AsNN3eIhRFRPRX7IdACUrzrjsIjwa7PmS3Lwyc514uQ6ZbW37cdkm0M5UuG/exec"

let form = document.getElementById("form_contact");
form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch(scriptURL,{
        method: "POST",
        body: new FormData(form),
    })
    .then((response)=>{
        setTimeout(()=>{
            localStorage.removeItem("cart")
            window.location.reload()
        },3000)
    })
    .catch((error) => console.error("error!" ,error.message))
})