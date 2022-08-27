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
    


