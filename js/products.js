let id_number = localStorage.getItem("catID");

const allProducts_url = PRODUCTS_URL + id_number + ".json";

function addContentToHtml(productsArray){
        
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let product = productsArray[i];

            htmlContentToAppend += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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

        let contents = document.getElementById("lista-productos");
        contents.innerHTML = htmlContentToAppend;
    };
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(allProducts_url).then(resultado =>{
        if (resultado.status == "ok"){

            document.getElementById("nombreCat").innerHTML = resultado.data.catName;
            let productos = resultado.data.products;
            addContentToHtml(productos);

        }else{
            alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
        };
    });
});


   
