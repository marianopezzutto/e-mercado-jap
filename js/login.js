function loginRequired(user, pass){
    if ((user == "")||(pass == "")){
        swal("Error", "Tienes que completar todos los campos!", "error");
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

    document.getElementById("singin").addEventListener("click", function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          
    });
});
    


