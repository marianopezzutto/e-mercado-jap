let id_product = localStorage.getItem("proID");
let info_product_url = PRODUCT_INFO_URL + id_product + EXT_TYPE;
let coment_product = PRODUCT_INFO_COMMENTS_URL + id_product + EXT_TYPE;
let com = {};

function setProID(id) {
    localStorage.setItem("proID", id);
    window.location = "product-info.html"
}

/* ------------------ Function that show information of the products. ------------------ */

function showInfoProduct(infopro) {
    
   let htmlContentToAppend = 
   `<div class="card mt-3 alert-secondary">
        <div class="row align-items-start">
      
            <div class="col-8">
                <div id="carouselExampleControls" class="carousel slide carousel-dark" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${infopro.images[0]}" class="d-block w-100" alt="...">
                        </div>`;
                        for (let i = 1; i < infopro.images.length; i++) {
                            const element = infopro.images[i];
                            
                            htmlContentToAppend += 
                        `<div class="carousel-item">
                            <img src="${element}" class="d-block w-100" alt="...">
                        </div>`;
                        }
                            htmlContentToAppend +=
                    `</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
                  
            <div class="col-4">
                <h1 class="">${infopro.name}</h1>
                <p class=""><strong>Precio:</strong> ${infopro.cost}${infopro.currency}</p>
                <p class=""><strong>Descripción:</strong> ${infopro.description}</p>
                <p class=""><strong>Categoria:</strong> ${infopro.category}</p>
                <p class=""><strong>Cantidad vendida:</strong> ${infopro.soldCount}</p>
            </div>

        </div>    
    </div>
    
        <div class="d-grid gap-2 mt-4 mb-4">
            <button class="btn btn-lg btn-primary" type="button">Agregar al carrito</button>
        </div>
        <div class="container card">
            <div class="row align-items-start pb-3 alert-secondary" id="">
                <div class="col-md-6" >
                    <h3 class="mt-3">Comentarios</h3>
                    <div id="commentContainer" style="height:400px; overflow: scroll;"></div>
                </div>
                <div class="col-md-6" id="inputContainer">
                    <h3 class="mt-3">Dejar un comentario:</h3>
                </div>
            </div>
        </div>
        <div class="container card mt-3 alert-secondary">
            <div class="row align-items-start pb-3" id="">       
                <h3 class="mt-3">Productos relacionados</h3>`
                for (let i = 0; i < infopro.relatedProducts.length; i++) {
                    const related_products = infopro.relatedProducts[i];
                    htmlContentToAppend +=
                    `
                    <div class="col">
                      <div onclick="setProID(${related_products.id})" class="card cursor-active">
                        <div class="card-body">
                        <img class="bd-placeholder-img card-img-top img-thumbnail" src="${related_products.image}">
                          <p class="card-text">${related_products.name}</p>
                        </div>
                      </div>
                    </div>
                    `
                }

    document.getElementById("infoContainer").innerHTML = htmlContentToAppend;
}


/* ------------------ Function that show comments of each product. ------------------ */

function showComment(comentarios) {
    
    let htmlCommentToAppend = "";
    if (comentarios != "" || comentarios == "" || comentarios == undefined) {
        for (let i = 0; i < comentarios.length; i++) {
            const element = comentarios[i];

            htmlCommentToAppend +=
            
            `<div class="card text-left">
                <div class="card-body">
                    <p class="card-title"><strong>${element.user}</strong> - ${element.dateTime} - </p>
                    <p class="card-text">${showScore(parseInt(element.score))}</p>
                    <p class="card-text">${element.description}</p>
                </div>
            </div>`;
        }
    document.getElementById("commentContainer").innerHTML += htmlCommentToAppend;
    }
   
}


/* ------------------ Function that show the posibility to send a comment. ------------------ */

function showInputComment(){
    let htmlInputToAppend ="";
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


function mostrar(){
    let info = JSON.parse(localStorage.getItem("newComment"));
    if (info != null && info.product === id_product){
        let html = "";
        html = 

        `<div class="card text-left">
            <div class="card-body">
                <p class="card-title"><strong>${info.user}</strong> - ${info.dateTime} - </p>
                <p class="card-text">${showScore(parseInt(info.score))}</p>
                <p class="card-text">${info.description}</p>
            </div>
        </div>`;

    document.getElementById("commentContainer").innerHTML += html;
    document.getElementById("select-score").value = "";
    document.getElementById("comment-text").value = "";
    }
    
}





document.addEventListener("DOMContentLoaded", function () {
    
    getJSONData(info_product_url).then(resultado => {
        if (resultado.status == "ok") {

            let producto = resultado.data;
            showInfoProduct(producto);
            getJSONData(coment_product).then(resultado => {
                if (resultado.status == "ok") {

                    let comment = resultado.data;
                    showComment(comment);
                    showInputComment();
                    if (localStorage.getItem("newComment") != ""){
                        mostrar();
                    }

                    document.getElementById("sendButton").addEventListener("click", function() {
                        
                            let date = new Date();
                            let new_comment = {
                                product: id_product,
                                score: document.getElementById("select-score").value,
                                description: document.getElementById("comment-text").value,
                                user: localStorage.getItem("usuario"),
                                dateTime: date.toISOString(),
                        
                            };
                            localStorage.setItem("newComment", JSON.stringify(new_comment))
                        
                        mostrar();
                        

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
