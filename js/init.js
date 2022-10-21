const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let all_products = [];
let all_products_objet = {};



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function cerrarSesion(){
  swal({
    title: "Estas seguro que quieres cerrar sesión?",
    text: "Una vez cerrada tendras que volver a logearte",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Has cerrado tu sesión!", {
        icon: "success",
      });
      localStorage.removeItem("usuario");
      localStorage.removeItem("foto");
      window.location = "index.html";
    } else {
      swal("Nos alegra que te quedes!");
    }
  });
}
document.addEventListener("DOMContentLoaded", function(){
  let user = localStorage.getItem("usuario");
  let user_foto = localStorage.getItem("foto");
  let imguser = "";

  if (user == null) {
    window.location = "index.html"
  };

   if (user_foto != null){
    imguser = ` <img src=${user_foto} class="my-auto nav-item img-fluil rounded-circle" alt="" style="min-width: 20px; width: 20px; height: 20px;">`;
  } else {
    imguser = ` <i class="	far fa-user-circle"></i>
    `;
  } ;
  
  const buscador = document.createElement("ul");
  buscador.className = "navbar-nav w-100 justify-content-between";
  buscador.id = "search";

  document.getElementById("navbarNav").appendChild(buscador);
  document.getElementById("search").innerHTML = `
  
    <li class="nav-item">
      <div class="input-group">
        <input type="search" class="nav-item form-control fondoFlotante" placeholder= "Buscar productos">
        <a class="input-group-text fondoFlotante"><i class="fas fa-search"></i></a>
      </div>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hola! ${user}${imguser}</a>
      <div class="dropdown-menu fondoFlotante fondoBlackFlotante">
        <a class="dropdown-item fondoFlotante" href="my-profile.html"><i class="fas fa-user-edit"></i> Mi perfil</a>
        <a class="dropdown-item fondoFlotante" href="cart.html"><i class="fas fa-cart-arrow-down" aria-hidden="true"></i> Mi carrito</a>
        <hr>
        <a class="dropdown-item fondoFlotante" onclick="cerrarSesion()">Cerrar sesión</a>
      </div>
      
    </li>`;
});

