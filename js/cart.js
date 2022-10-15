let info_cart_url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let info_cart;
let cartProduct = document.getElementById("infoProductCart");

function redirect(id) {
    localStorage.setItem("proID", id)
}


function showProductsCart(objcart) {

    for (let i = 0; i < objcart.articles.length; i++) {

        const element = objcart.articles[i];
        const tr = document.createElement("tr");
        tr.className += "text-center text-light";
        tr.innerHTML =
            `   
            <td class="col-md-1 d-none d-sm-table-cell d-md-table-cell">
                <div class="px-1" onclick="redirect(${element.id})">
                    <a class="" href="product-info.html" role="button">
                        <img src="${element.image}" class="img-fluid inline" alt="Responsive image">
                    </a>
                </div>
            </td>
            <td>${element.name}</td>
            <td>${element.currency} ${element.unitCost}</td>
            <td>
                <div class="row justify-content-center">
                    <div class="col col-lg-3 col-xl-3" >
                    <input type="number" value="1" min="0" class="form-control" >
                    </div>        
                </div>                    
            </td>
            <td class="subTotal">${element.currency} ${element.unitCost}</td>
            <td><i class="fa fa-trash" aria-hidden="true" type="button"></i></td>
            
        `;

        cartProduct.appendChild(tr);
        const input = tr.querySelector("input");
        const remove = tr.querySelector("i");

        input.addEventListener("input", function () {
            tr.querySelector(".subTotal").innerHTML = `${element.currency} ${Number(input.value) * element.unitCost}`;
        });

        remove.addEventListener("click", function () {
            let objCartArray = JSON.parse(localStorage.getItem("cartobjtoadd"));

            for (let i = 0; i < objCartArray.length; i++) {
                let articleObj = objCartArray[i];

                if (element.id == articleObj.id) {
                    objCartArray.splice(i, 1);
                    localStorage.setItem("cartobjtoadd", JSON.stringify(objCartArray));
                    window.location = "cart.html";
                }
            }

        })
    }

}

document.addEventListener("DOMContentLoaded", function () {

    getJSONData(info_cart_url).then(resultado => {
        if (resultado.status == "ok") {

            info_cart = resultado.data;
            if (localStorage.getItem("cartobjtoadd") != null) {
                for (const article_object of JSON.parse(localStorage.getItem("cartobjtoadd"))) {
                    info_cart.articles.push(article_object);
                }
            };
            showProductsCart(info_cart);

        } else {
            alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
        }
    })
})