let id_number = localStorage.getItem("catID");
const allProducts_url = PRODUCTS_URL + id_number + ".json";
let productos = [];

const ORDER_ASC_BY_PRICE = "+$";
const ORDER_DESC_BY_PRICE = "-$";
const ORDER_BY_PROD_REL = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        productos = productsArray;
    }

    productos = sortProducts(currentSortCriteria, productos);

    //Muestro los productos ordenados
    addContentToHtml();
}

function setProID(id) {
    localStorage.setItem("proID", id);
    window.location = "product-info.html"
}

function addContentToHtml(){
        
    let htmlContentToAppend = "";
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <div onclick="setProID(${product.id})" class="col-md onLoadAnimation">
                <div class="shadow card cursor-active mx-0 fondoBlackFlotante" style="height:410px;">
                    <img src="${product.image}" alt="${product.description}" class="card-img-top">
                    <div class="card-body"> 
                        <h5 class="card-title text-warning">${product.name}</h5>
                        <p class="mb-0">$${product.currency} ${product.cost}</p>
                        <small class="text-muted mt-0">${product.soldCount} vendidos</small>
                        <p><small>${product.description}</small></p> 
                        <a onclick="setProID(${product.id})" href="product-info.html" class="fixed-bottom btn btn-outline-info mx-5">Ver más</a>
                    </div>
                </div>        
            </div>`;
        }

        let contents = document.getElementById("lista-productos");
        contents.innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(allProducts_url).then(resultado =>{
        if (resultado.status == "ok"){

            document.getElementById("nombreCat").innerHTML = resultado.data.catName;
            productos = resultado.data.products;
            addContentToHtml();

        }else{
            alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
        };
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts( ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        addContentToHtml();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        /* Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        de productos por categoría. */
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        addContentToHtml();
    });

});


   
