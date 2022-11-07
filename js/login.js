const URL = "https://636655e379b0914b75cea869.mockapi.io/users/";
let datos = [];

let getJSONData = function (url) {
    let result = {};
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        result.status = 'ok';
        result.data = response;
        return result;
      })
      .catch(function (error) {
        result.status = 'error';
        result.data = error;
        return result;
      });
  }

function handleCredentialResponse(response) {
    
    const responsePayload = jwt_decode(response.credential);
    localStorage.setItem("usuario", responsePayload.email);
    localStorage.setItem("foto", responsePayload.picture);
    localStorage.setItem("nombre", responsePayload.name);

    getJSONData(URL).then(resultado =>{
        if (resultado.status == "ok"){
            datos = resultado.data;
            const user = datos.find(usuario=>usuario.email === responsePayload.email);
            if (user === undefined){
                fetch(URL, 
                    {method:"POST",
                    headers: { 'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        nombre:responsePayload.name,
                        email:responsePayload.email,
                        foto:responsePayload.picture
                        })          
                    }
                );
                window.location.href = "inicio.html";
            }else{
                window.location.href = "inicio.html";
            }

        }else{
            alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
        };
    })
}

function loginRequired(user, pass){
    if ((user == "")||(pass == "")){
        swal("Error", "Tienes que completar todos los campos!", "error");
    }else{
        localStorage.setItem("usuario", user)
        window.location.href = "inicio.html";
    };
};

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("ingreso").addEventListener("click", function(){
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        loginRequired(email, password);
    });

});