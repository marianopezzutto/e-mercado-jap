let id_product = localStorage.getItem("proID");
let info_product_url = PRODUCT_INFO_URL + id_product + EXT_TYPE;
let coment_product = PRODUCT_INFO_COMMENTS_URL + id_product + EXT_TYPE;
let new_comment_Array = [];
let comment;
let cart_info_array = [];
let producto;
function redirigir(){
    let object_info_cart = {
        id:localStorage.getItem("proID"),
        name:producto.name,
        count:1,
        unitCost:producto.cost,
        currency:producto.currency,
        image:producto.images[0],
    };
    if (localStorage.getItem("cartobjtoadd") != null){
       for (const objetoguardao of JSON.parse(localStorage.getItem("cartobjtoadd"))) {
        cart_info_array.push(objetoguardao);
       } ;
    };
    cart_info_array.push(object_info_cart);
    localStorage.setItem("cartobjtoadd", JSON.stringify(cart_info_array));
    console.log(cart_info_array)
    window.location = "cart.html"; 

}
function setProID(id) {
    localStorage.setItem("proID", id);
    window.location = "product-info.html"
}

/* ------------------ Function that show information of the products. ------------------ */
function showInfoProduct(infopro) {

    /* To add the img-carousel of the selected product */
    let carousel_active =
        `<div class="carousel-item active">
            <img src="${infopro.images[0]}" class="d-block w-100" alt="...">
        </div>`;
    for (let i = 1; i < infopro.images.length; i++) {
        const element = infopro.images[i];

        carousel_active +=
            `<div class="carousel-item">
                <img src="${element}" class="d-block w-100" alt="...">
            </div>`;
    }
    document.getElementById("showCarousel").innerHTML = carousel_active;

    let show_photos = "";
    for (let i = 0; i < infopro.images.length; i++) {
        const miniature = infopro.images[i];

        show_photos +=
            `<div class="col px-1 py-1">
                <a class="" href="#showCarousel" role="button" data-slide-to="${i}">
                    <img src="${miniature}" class="img-fluid" alt="Responsive image">
                </a>
            </div>`
    }
    document.getElementById("miniSlides").innerHTML = show_photos;

    /* To add the information of the selected product */
    let show_info_products =
        `<div class="col-5 mt-3">
            <h1 class="">${infopro.name}</h1>
            <p class="" id="promScore"></p>
            <p class=""><strong>Precio:</strong> ${infopro.cost}${infopro.currency}</p>
            <p class=""><strong>Descripción:</strong> ${infopro.description}</p>
            <p class=""><strong>Categoria:</strong> ${infopro.category}</p>
            <p class=""><strong>Cantidad vendida:</strong> ${infopro.soldCount}</p>
        </div>`;
    document.getElementById("colInfoPro").innerHTML += show_info_products;

    /* To add the related products of the selected product */
    let related_card = "";
    related_card += `<h4 class="mt-3">Tambien te puede interesar:</h4>`;
    for (let i = 0; i < infopro.relatedProducts.length; i++) {
        const related_products = infopro.relatedProducts[i];
        related_card +=
            `<div class="col">
                <div onclick="setProID(${related_products.id})" class="card cursor-active">
                    <div class="card-body">
                        <img class="bd-placeholder-img card-img-top img-thumbnail" src="${related_products.image}">
                        <p class="card-text">${related_products.name}</p>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("relatedPro").innerHTML = related_card;
}


/* ------------------ Function that show comments of each product. ------------------ */
function showComment(comentarios) {

    let htmlCommentToAppend = "";
    for (let i = 0; i < comentarios.length; i++) {
        const element = comentarios[i];
        if (element.product == id_product) {
            htmlCommentToAppend +=

                `<div class="card text-left">
                    <div class="card-body">
                        <p class="card-title"><strong>${element.user}</strong> - ${element.dateTime} - </p>
                        <p class="card-text">${showScore(parseInt(element.score))}</p>
                        <p class="card-text">${element.description}</p>
                    </div>
                </div>`;
        }
    }
    document.getElementById("commentContainer").innerHTML += htmlCommentToAppend;
}


/* ------------------ Function that show the posibility to send a comment. ------------------ */
function showInputComment() {
    let htmlInputToAppend = "";
    htmlInputToAppend +=
        `
    <div class="form-group">
        <label for="">Nos encanta escuchar tu opinión!</label>
        <textarea class="form-control" name="" id="comment-text" rows="3"></textarea>
        <label for="exampleSelect1" class="form-label mt-3">Puntuación</label>
        <select class="form-select" id="select-score">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>                  
            <option>4</option>
            <option>5</option>
        </select>
        <button type="button" class="btn btn-primary mt-3" id="sendButton">Enviar</button>
    </div>
    `;
    document.getElementById("inputContainer").innerHTML += htmlInputToAppend;
}


/* ------------------ Function to show the rating stars of each comment. ------------------*/
function showScore(numero) {
    let stars = `<span class="fa fa-star checked"></span>`;
    let black_stars = `<span class="fa fa-star"></span>`;
    let score = stars.repeat(numero) + black_stars.repeat(5 - numero);

    return score
}

function promScore() {
    let total = 0;
    let reviews_cant = 0;
    let local = JSON.parse(localStorage.getItem("newCommentArray"));
    if (local != null) {
        for (const element of local) {
            if (element.product == id_product) {
                reviews_cant++;
                total += parseFloat(element.score);
            }
        }
    }

    for (const element of comment) {
        reviews_cant++;
        total += parseFloat(element.score);
    }
    total = total / reviews_cant
    document.getElementById("promScore").innerHTML +=
        `${showScore(Math.round(total))} (${reviews_cant} reviews)
    `
}

document.addEventListener("DOMContentLoaded", function () {

    getJSONData(info_product_url).then(resultado => {
        if (resultado.status == "ok") {

            producto = resultado.data;
            showInfoProduct(producto);
           
            getJSONData(coment_product).then(resultado => {
                if (resultado.status == "ok") {

                    comment = resultado.data;
                    showComment(comment);
                    showInputComment();
                    promScore()

                    if (localStorage.getItem("newCommentArray") != null) {
                        showComment(JSON.parse(localStorage.getItem("newCommentArray")));

                    }

                    document.getElementById("sendButton").addEventListener("click", function () {
                        let text_comment_string = document.getElementById("comment-text").value;

                        if (text_comment_string.length > 0) {
                            let date = new Date();
                            let new_comment = {
                                product: id_product,
                                score: document.getElementById("select-score").value,
                                description: document.getElementById("comment-text").value,
                                user: localStorage.getItem("usuario"),
                                dateTime: date.toISOString(),

                            };
                            if (localStorage.getItem("newCommentArray") != null){
                                new_comment_Array = JSON.parse(localStorage.getItem("newCommentArray"));
                            }
                            new_comment_Array.push(new_comment);
                            localStorage.setItem("newCommentArray", JSON.stringify(new_comment_Array))
                            window.location = "product-info.html";
                            
                        
                        } else {
                            alert("Debes completar todos los campos para enviar un comentario!")
                        }
                    });

                } else {
                    alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
                };
            });

        } else {
            alert(resultado.data + " - No es posible acceder a esa información en este momento, vuelva a intentarlo más tarde.");
        };
    });



});
