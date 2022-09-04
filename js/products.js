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

function addContentToHtml(){
        
    let htmlContentToAppend = "";
    for(let i = 0; i < productos.length; i++){
        let product = productos[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active mb-3">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
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


   
