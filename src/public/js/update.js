let actualizar = document.getElementById("actualizar");
let id =document.getElementById("id");
let token = localStorage.getItem('jwt');

actualizar.addEventListener("submit", (event) => {

    event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("authorization", "Bearer " + localStorage.getItem("jwt"));

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        // body: JSON.stringify(objeto),
        body: new FormData(actualizar),
        redirect: 'follow'
    };

    fetch("/api/autos/"+id.value, requestOptions)
    .then(response => {
        if(response.status == 413){
            return alert("Imagen supera el limite permitido")
        }
        return response.json()
    })
    .then(result => {
        if(result.code ==201){
            alert(result.message)
            // location.href = "/inventario?token="+token
        }else{
            alert(result.message)
        }
    })
    .catch(error => console.log('error', error));
})
