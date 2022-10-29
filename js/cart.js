let info_cart;
let cartProduct = document.getElementById("infoProductCart");
let value = 1;
let selected;
let arraycarrito = localStorage.getItem("cartobjtoadd");
let form = document.getElementById("formulario");
let formaDePago = document.getElementsByName("formadepago");
let numCuent = document.getElementById("numeroDeCuenta");
let numCard = document.getElementById("numeroDeTarjeta");
let codCard = document.getElementById("codigoDeSeg");
let venciCard = document.getElementById("vencimiento");
let btnformadepago = document.getElementById("btnformapago");
let modal = document.getElementById("exampleModal");
let transferencia = document.getElementById("tranfbancaria");
let tarjeta = document.getElementById("tarjeta");



/* Función para rederigir a product-info.html */

function redirect(id) {
    localStorage.setItem("proID", id)
}

/* Función para seleccionar tipo de envío */

function shippingType() {
    let radios = document.getElementsByName("radio-stacked");
    selected = Array.from(radios).find(radio => radio.checked);

    document.getElementById("shippingType").innerHTML = `U$D ${parseInt((selected.value*value)/100)}`;
    document.getElementById("total").innerHTML = `U$D ${parseInt(value+((selected.value*value)/100))}`;
}

/* Función para deshabilitar inputs de forma de pago */

function validarTarjeta() {
    let mensaje = document.getElementById("mensaje");
    if (transferencia.checked || tarjeta.checked) {
        btnformadepago.className = "mt-2 text-success";
        selected = Array.from(formaDePago).find(radio => radio.checked);
        let tipo = parseInt(selected.value);
        
        if (tipo === 1 ) {
            numCuent.setAttribute("disabled", "");
            numCard.removeAttribute("disabled");
            codCard.removeAttribute("disabled");
            venciCard.removeAttribute("disabled");
            mensaje.innerHTML = "Tarjeta de crédito ";
            
        }else if(tipo === 2){
            numCard.setAttribute("disabled", "");
            codCard.setAttribute("disabled", "");
            venciCard.setAttribute("disabled", "");
            numCuent.removeAttribute("disabled");
            mensaje.innerHTML = "Transferencia bancaria ";
        }
    }else{
        btnformadepago.className = "mt-2 text-danger";
    }

}

/* Función para calcular la suma de subtotales */

function subTotalValues() {
    value = 0;
    for (let i = 0; i < info_cart.length; i++) {
        const element = info_cart[i];

        if (element.currency === "USD") {
            value += (element.count * element.unitCost)
        }else{
            value += element.count * (element.unitCost/41)
        };        
    }
    document.getElementById("totalAmount").innerHTML = `U$D ${parseInt(value)}`
}

/* Función para mostrar los productos del carrito, actualizar sub total y eliminar de la lista */

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
                    <div class="col col-lg-4 col-xl-4">
                        <input type="number" value="${element.count}" min="1" step="1" class="form-control form-control-sm fondoFlotante" form="formulario" required >
                        <div class="valid-feedback">
                            Correcto
                        </div>
                        <div class="invalid-feedback">
                            Debe ser mayor a 0
                        </div>
                    </div>        
                </div>                    
            </td>
            <td class="subTotal">${element.currency} ${element.unitCost*element.count}</td>
            <td class="border text-primary"><i class="fa fa-trash" aria-hidden="true" type="button" alt="Eliminar"></i></td>
        `;
        
        cartProduct.appendChild(tr);
        const input = tr.querySelector("input");
        const remove = tr.querySelector("i");
        
        input.addEventListener("input", function () {
            tr.querySelector(".subTotal").innerHTML = `${element.currency} ${Number(input.value) * element.unitCost}`;
            objcart[i].count = input.value;
            localStorage.setItem("cartobjtoadd", JSON.stringify(info_cart));
            subTotalValues();
            shippingType()
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

/* Escuchas de eventos */

document.addEventListener("DOMContentLoaded", function () {

    if (arraycarrito != null) {
        document.getElementById("irApagar").removeAttribute("disabled");
        info_cart = JSON.parse(arraycarrito);
        showProductsCart(info_cart);
        subTotalValues();
    }
    if(!arraycarrito || info_cart.length === 0){
        document.getElementById("irApagar").setAttribute("hidden", "");
    }

    if (localStorage.getItem("compra")) {
        localStorage.removeItem("compra");
        localStorage.removeItem("cartobjtoadd");
        swal("Felicidades!", "Has completado tu compra!", "success");
    }

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            swal("No se pudo confirmar la compra!", "Por favor, complete todos los campos!", "error");
        } if (form.checkValidity()){
            localStorage.setItem("compra", "enviada");
        }

        form.classList.add('was-validated');
        modal.classList.add('was-validated');
        cartProduct.classList.add('was-validated');
        validarTarjeta()
        
    })
})
