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
      window.location = "index.html";
    } else {
      swal("Nos alegra que te quedes!");
    }
  });
}
document.addEventListener("DOMContentLoaded", function(){
  let user = localStorage.getItem("usuario");
  if (user == null) {
    window.location = "index.html"
  }
  const buscador = document.createElement("ul");
  buscador.className = "navbar-nav w-100 justify-content-between"
  buscador.id = "search"

  document.getElementById("navbarNav").appendChild(buscador);
  document.getElementById("search").innerHTML = `
    <li class="nav-item">
      <input type="search" class="nav-item form-control me-sm-2" placeholder= "Buscar productos">
    </li>
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hola! ${user}</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <a class="dropdown-item" onclick="cerrarSesion()">Cerrar sesión</a>
    </div>
    </li>`;
  
});

