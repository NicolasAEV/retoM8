let token = localStorage.getItem('jwt');
let login = document.getElementById("login");
let registro = document.getElementById("registro");
let salir = document.getElementById("logout")
let publicar = document.getElementById("publicar")


if (token) {
    login.style.display = "none";
    registro.style.display = "none";

} else {
    salir.style.display = "none";
    publicar.style.display = "none";

}

publicar.addEventListener("click", (event) => {
    event.preventDefault();
    if(token){
        location.href = "/inventario?token="+token
    }else{
        alert("Debe loguearse para obtener permisos a esa ruta.")
    }
})
salir.addEventListener("click", (event) => {
    localStorage.clear();
    location.href = "/";
})