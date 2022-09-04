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

function allArrays (){
  all_products_objet = {};
  all_products.push(`${PRODUCTS_URL}101.json`);
  all_products.push(`${PRODUCTS_URL}102.json`);
  all_products.push(`${PRODUCTS_URL}103.json`);
  all_products.push(`${PRODUCTS_URL}104.json`);
  all_products.push(`${PRODUCTS_URL}105.json`);
  all_products.push(`${PRODUCTS_URL}106.json`);
  all_products.push(`${PRODUCTS_URL}107.json`);
  all_products.push(`${PRODUCTS_URL}108.json`);
  all_products.push(`${PRODUCTS_URL}109.json`);

  for (let i = 0; i < all_products.length; i++) {
    element = all_products[i];
    getJSONData(element).then(resultado =>{
    all_products_objet += (resultado.product);
    })
  }
}

  document.addEventListener("DOMContentLoaded", function(){
    let user = localStorage.getItem("usuario");
    const buscador = document.createElement("ul");
    buscador.className = "navbar-nav w-100 justify-content-between";
    buscador.id = "search";

    document.getElementById("navbarNav").appendChild(buscador);
    document.getElementById("search").innerHTML = `
      <li class="nav-item">
        <input type="search" class="nav-item form-control me-sm-1" placeholder = "Buscar productos">
      </li>
      <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hola! ${user}</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="my-profile.html">Editar perfil</a>
        <a class="dropdown-item" href="cart.html">Mi carrito</a>
        <a class="dropdown-item" href="index.html">Cerrar sesión</a>
      </div>
      </li>`;

    document.getElementById("search").addEventListener("input", function(){
      let searching = document.getElementById("search").value;
      allArrays ()
      
    })
  
  
});

