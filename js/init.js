const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let all_products = [];
let products_to_show = [];

/* Function to get all products */

function getProducts() {

  let productos;
  let contador = [];
  getJSONData(CATEGORIES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      all_categories = resultObj.data;
    }
    let contador = [];
    for (let i = 0; i < all_categories.length; i++) {
      const element = all_categories[i];
      let url = PRODUCTS_URL + element.id + ".json"
      getJSONData(url).then(function (result) {
        if (result.status === "ok") {
          productos = result.data.products;
          all_products = all_products.concat(productos);
        }
      });
    }
  });
}

/* Display spinner */

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

/* Function to get JSON data */

let getJSONData = function (url) {
  let result = {};
  showSpinner();
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
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

/* Function to close sesion  */

function cerrarSesion() {
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

/* Function to show products search */

function prueba1() {
  let contenedor = document.getElementById("contenedorBusqueda");
  contenedor.innerHTML = ""
  let busqueda = document.getElementById("buscarYa").value;
  if (busqueda != "") {
    for (const articulo of all_products) {
      if ((articulo.description.toLowerCase()).includes(busqueda.toLowerCase())
          || (articulo.name.toLowerCase()).includes(busqueda.toLowerCase())) {
        contenedor.innerHTML += `
        <div onclick="setProID(${articulo.id})" class="col-md onLoadAnimation">
            <div class="shadow card cursor-active mx-0 fondoBlackFlotante" style="height:405px;">
                <img src="${articulo.image}" alt="${articulo.description}" class="card-img-top">
                <div class="card-body"> 
                    <h5 class="card-title text-warning">${articulo.name}</h5>
                    <p class="mb-0">$${articulo.currency} ${articulo.cost}</p>
                    <small class="text-muted mt-0">${articulo.soldCount} vendidos</small>
                    <p><small>${articulo.description}</small></p> 
                    <a onclick="setProID(${articulo.id})" href="product-info.html" class="fixed-bottom btn btn-outline-info mx-5">Ver más</a>
                </div>
            </div>        
        </div>`;
      }
    }
  }
  console.log(all_products[1])
}

/* Event listener  */

document.addEventListener("DOMContentLoaded", function () {
 
  let user = localStorage.getItem("usuario");
  let user_foto = localStorage.getItem("foto");
  let imguser = "";
  
  if (user == null) {
    window.location = "index.html"
  };

  if (user_foto != null) {
    imguser = ` <img src="${user_foto}" class="my-auto nav-item img-fluil rounded-circle" alt="" style="min-width: 20px; width: 20px; height: 20px;">`;
  } else {
    imguser = ` <i class="	far fa-user-circle"></i>
    `;
  };

  const buscador = document.createElement("ul");
  buscador.className = "navbar-nav w-100 justify-content-between";
  buscador.id = "search";

  document.getElementById("navbarNav").appendChild(buscador);
  document.getElementById("search").innerHTML = `
  
    <li class="nav-item">
      <div class="input-group">
        <input id="buscarYa" onchange="prueba1()" type="search" class="nav-item form-control fondoFlotante" placeholder= "Buscar productos">
        <a onclick="prueba1()" class="input-group-text fondoFlotante"><i class="fas fa-search"></i></a>
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

    getProducts();

});


