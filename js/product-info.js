let id_product = localStorage.getItem("proID");
let info_product_url = PRODUCT_INFO_URL + id_product + EXT_TYPE;
let coment_product = PRODUCT_INFO_COMMENTS_URL + id_product + EXT_TYPE;
let com = {};


/* Function that show the information of the products */

function showInfoProduct(infopro) {
    
   let htmlContentToAppend = 
   `
    <div class="card mt-3">
        <div class="card-body">
            <h1 class="card-title">${infopro.name}</h1>
            <p class=""><strong>Precio:</strong> ${infopro.cost}${infopro.currency}</p>
            <p class=""><strong>Descripción:</strong> ${infopro.description}</p>
            <p class=""><strong>Categoria:</strong> ${infopro.category}</p>
            <p class=""><strong>Cantidad vendida:</strong> ${infopro.soldCount}</p>
            <p class=""><strong>Imágenes ilustrativas:</strong></p>
        </div>
        <div class="row">
    `
    for (let i = 0; i < infopro.images.length; i++) {
        const element = infopro.images[i];
        
        htmlContentToAppend += 
        `<div class="col-md-3 mb-3">
            <img class="bd-placeholder-img card-img-top img-thumbnail" src="${element}">
        </div>
        ` 
    }
    htmlContentToAppend +=
        `    
            </div>
        </div>
        <div class="d-grid gap-2 mt-4 mb-4">
            <button class="btn btn-lg btn-primary" type="button">Agregar al carrito</button>
        </div>
        <div class="container card">
            <div class="row align-items-start pb-3" id="">
                <div class="col-md-6" >
                    <h3 class="mt-3">Comentarios</h3>
                    <div id="commentContainer" style="height:400px; overflow: scroll;"></div>
                </div>
                <div class="col-md-6" id="inputContainer">
                    <h3 class="mt-3">Dejar un comentario:</h3>
                </div>
        `;

    document.getElementById("infoContainer").innerHTML = htmlContentToAppend;
}


/* Function that show the comments of each product */

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


/* Function that show the posibility to send a comment */

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


/* function to show the rating stars of each comment */

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
                        document.getElementById("select-score").value = "";
                        document.getElementById("comment-text").value = "";

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
