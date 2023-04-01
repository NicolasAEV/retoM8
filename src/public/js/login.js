let formularioLogin = document.getElementById('formularioLogin')
let email = document.getElementById('email')
let password = document.getElementById('password')

formularioLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
    email: email.value,
    password: password.value
    });
    console.log(raw)
    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("/api/login", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.code == 200){
            alert("Usuario autenticado con éxito.")
            console.log(result.token)
            localStorage.setItem("jwt", result.token)
            location.href = "/";
        }else if(result.code == 401){
            alert(result.message)
        }else{
            alert("Login fallido.")
        }
    })
    .catch(error => console.log('error', error));
})


let formularioRegstro = document.getElementById('formularioRegstro')
let emailRegistro = document.getElementById('emailRegistro')
let passwordRegistro = document.getElementById('passwordRegistro')

formularioRegstro.addEventListener("submit", (event) => {
    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
    email: emailRegistro.value,
    password: passwordRegistro.value
    });
    console.log(raw)
    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("/api/regitro", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.code == 200){
            alert("Usuario creado con éxito.")
            location.href = "/"
        }else if(result.code == 401){
            alert(result.message)
        }else{
            alert("Login fallido.")
        }
    })
    .catch(error => console.log('error', error));
})