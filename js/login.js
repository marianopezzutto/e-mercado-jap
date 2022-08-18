function loginRequired(user, pass){
    if ((user == "")||(pass == "")){
        alert("Debes completar todos los campos.")
    }else{
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
    


