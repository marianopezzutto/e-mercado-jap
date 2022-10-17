import * as jose from 'jose'

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
    
async function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.

    const secretKey = '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';
    const { payload, protectedHeader } = await jose.jwtDecrypt(response, secretKey);

   /* const jwt = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..KVcNLqK-3-8ZkYIC.xSwF4VxO0kUMUD2W-cifsNUxnr-swyBq-nADBptyt6y9n79-iNc5b0AALJpRwc0wwDkJw8hNOMjApNUTMsK9b-asToZ3DXFMvwfJ6n1aWefvd7RsoZ2LInWFfVAuttJDzoGB.uuexQoWHwrLMEYRElT8pBQ' */
   /* const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secretKey); */

   console.log(protectedHeader);
   console.log(payload);

   /*  const responsePayload = decodeJwtResponse(response.credential); */

    /* console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email); */
 }



