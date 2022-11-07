function showUserData() {
    let name = localStorage.getItem("nombre");
    let foto = localStorage.getItem("foto");
    let inputMail = document.getElementById("validationCustom04");
    let storageEmail = localStorage.getItem("usuario");
    let all_user_data = JSON.parse(localStorage.getItem("user"));
    if (name) {
        document.getElementById("nombre").innerHTML = name;
    }
    if (foto) {
        document.getElementById("fotoPerfil").src = foto;
    }
    if (all_user_data) {
       let inputs = document.getElementsByTagName("input");
       inputs[1].value = all_user_data.fnombre;
       inputs[2].value = all_user_data.snombre;
       inputs[3].value = all_user_data.fapellido;
       inputs[4].value = all_user_data.sapellido;
       inputs[5].value = all_user_data.email;
       inputs[6].value = all_user_data.tel;
       inputs[7].value = all_user_data.imguser;
       
    }
    inputMail.value = storageEmail;
}

function saveUserData() {
    let user_obj = {
        fnombre: document.getElementById("validationCustom01").value,
        snombre: document.getElementById("validationCustom02").value,
        fapellido: document.getElementById("validationCustomUsername").value,
        sapellido: document.getElementById("validationCustom03").value,
        email: document.getElementById("validationCustom04").value,
        tel: document.getElementById("validationCustom05").value,
        imguser: document.getElementById("validationCustom06").value
    }

    localStorage.setItem("user", JSON.stringify(user_obj));

}

document.addEventListener("DOMContentLoaded", function () {
    showUserData()
    let form = document.getElementById("perfilForm")
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (form.checkValidity()){
            saveUserData()
        }
        form.classList.add('was-validated')
    }, false)
})