let formulario = document.getElementById("formulario");
let marca = document.getElementById("marca");
let modelo = document.getElementById("modelo");
let year = document.getElementById("year");
let imagen = document.getElementById("imagen");




formulario.addEventListener("submit", (event) => {

    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + localStorage.getItem("jwt"));
    console.log(myHeaders)
    let objeto = {
        marca : marca.value,
        modelo : modelo.value,
        year : year.value,
        imagen : imagen.value,
    }
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        // body: JSON.stringify(objeto),
        body: new FormData(formulario),
        redirect: 'follow'
    };
    console.log(requestOptions)
    fetch("/api/autos", requestOptions)
    .then(response => {
        if(response.status == 413){
            return alert("Imagen supera el limite permitido")
        }
        return response.json()
    })
    .then(result => {
        if(result.code ==201){
            alert(result.message)
            formulario.reset();
            location.reload()
        }else{
            alert(result.message)
        }
    })
    .catch(error => console.log('error', error));
})


const eliminar = (id) =>{
    let myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + localStorage.getItem("jwt"));
    fetch("/api/auto/"+id, {
        headers : myHeaders,
        method: "DELETE",
    })
     .then(response => response.json())
     .then((data) => {
        console.log(data.code)
        if(data.code == 400 || data.code == 500 ){
            console.log(data.message)
        }
        else{
            alert('borrado con exito')
            location.reload();
        }
    })
    .catch(error => {
        console.log(error)
        alert("Algo ha salido mal al eliminar el vehiculo.")
    })
}

const actualizar = (id) =>{
    // event.preventDefault();

        if(token){
            location.href = `/inventario/${id}?token=`+token
        }else{
            alert("Debe loguearse para obtener permisos a esa ruta.")
        }
}
