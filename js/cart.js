let info_cart;
let cartProduct = document.getElementById("infoProductCart");
let value = 1;

function redirect(id) {
    localStorage.setItem("proID", id)
}

function shippingType() {
    var radios = document.getElementsByName("optionsRadios");
    var selected = Array.from(radios).find(radio => radio.checked);

    document.getElementById("shippingType").innerHTML = `Gastos de envìo: $${parseInt((selected.value*value)/100)}`
        
}
function subTotalValues() {
    
    for (let i = 0; i < info_cart.length; i++) {
        const element = info_cart[i];

        if (element.currency === "USD") {
            value += (element.count * element.unitCost)
        }else{
            value += element.count * (element.unitCost/41)
        };        
    }
    document.getElementById("totalAmount").innerHTML = `Sub total = U$D ${parseInt(value)}`
}


function showProductsCart(objcart) {

    for (let i = 0; i < objcart.length; i++) {

        const element = objcart[i];
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
                    <input type="number" value="${element.count}" min="1" step="1" class="form-control fondoFlotante" >
                    </div>        
                </div>                    
            </td>
            <td class="subTotal">${element.currency} ${element.unitCost*element.count}</td>
            <td><i class="fa fa-trash" aria-hidden="true" type="button" alt="Eliminar"></i></td>
        `;
        
        cartProduct.appendChild(tr);
        const input = tr.querySelector("input");
        const remove = tr.querySelector("i");
        
        input.addEventListener("input", function () {
            tr.querySelector(".subTotal").innerHTML = `${element.currency} ${Number(input.value) * element.unitCost}`;
            objcart[i].count = input.value;
            localStorage.setItem("cartobjtoadd", JSON.stringify(info_cart));
            subTotalValues();
            
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

    if (localStorage.getItem("cartobjtoadd") != null) {

        info_cart = JSON.parse(localStorage.getItem("cartobjtoadd"));
        showProductsCart(info_cart);
        subTotalValues();
    }

})
