

/*****************GetJson Function*****************/

async function getJson() {
    const response = await fetch('json/json.json');
    const data = await response.json();
    return data;
}

/*****************load Featured Products*****************/
function load_Products_in_home() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "json/json.json", true);
    xhttp.send();
    let Products;
    let outputP;

    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            Products = JSON.parse(this.responseText);
            outputP = "";
            for (var i = 0; i < 8; i++) {
                /* console.log(Products[i].pName); */
                let R = Math.floor(Math.random() * 39);
                outputP += `
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden">
                        <img class="img-fluid w-100" src="${Products[R].pictureLink}" alt="">
                        <div class="product-action">
                            <a class="btn btn-outline-dark btn-square" PID="${Products[R].pId}" onclick="addI(this)"><i class="fa fa-shopping-cart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                            <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" href="">${Products[R].pName}</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>$${Products[R].price}</h5><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
            `;
            }
            document.querySelector(".FeaturedP").innerHTML = outputP;
        }
    }
}

function loadI() {
    load_Products_in_home();
}
/***************************** Add to Cart *******************************/
function addI(V) {
    console.log("added");
    sessionStorage.setItem(`PID${V.getAttribute("PID")}`, V.getAttribute("PID"));
    Show_Cart_Count();
}

/***************************** Showing Cart Count *******************************/
function Show_Cart_Count() {
    if (sessionStorage.getItem("IsThisFirstTime_Log_From_LiveServer") == "true") {
        document.querySelectorAll(".fa-shopping-cart+span")[0].innerText = sessionStorage.length - 1;
        document.querySelectorAll(".fa-shopping-cart+span")[1].innerText = sessionStorage.length - 1;
    }
    else {
        document.querySelectorAll(".fa-shopping-cart+span")[0].innerText = sessionStorage.length;
        document.querySelectorAll(".fa-shopping-cart+span")[1].innerText = sessionStorage.length;
    }
}
Show_Cart_Count();


/***************************** Shopping Cart / Showing cart items *******************************/

/* Object.values(localStorage)[0]*/
/* ${data[Object.values(sessionStorage)[i]]} */
function Showing_cart_items() {
    let sessionSL = sessionStorage.length;
    let Cart = "";
    getJson().then(function (data) {
        for (let i = 0; i < sessionSL; i++) {
            if (Object.values(sessionStorage)[i] == "true") { continue }
            Cart += `
        <tr>
            <td class="align-middle"><img src="${data[Object.values(sessionStorage)[i]].pictureLink}" alt="" style="width: 50px;">${data[Object.values(sessionStorage)[i]].pName}</td>
            <td class="align-middle PPrice">$${data[Object.values(sessionStorage)[i]].price}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" onclick="pQuantity(this)">
                        <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="1">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" onclick="pQuantity(this)">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle totalP">$${data[Object.values(sessionStorage)[i]].price}</td>
            <td class="align-middle"><button class="btn btn-sm btn-danger" onclick="DeleteI(this)" PID="${data[Object.values(sessionStorage)[i]].pId}"><i class="fa fa-times"></i></button></td>
        </tr>
        `;
        }

        document.querySelector(".Cart_Container").innerHTML = Cart;
    });
}

function LoadCP()
{
    Showing_cart_items();
}

/***************************** delete item from cart *******************************/
function DeleteI(V) {
    let button = V;
    console.log(button);

    sessionStorage.removeItem(`PID${button.getAttribute("PID")}`);
    Show_Cart_Count();
    Showing_cart_items();
}

/***************************** in/decreasing Product Quantity *******************************/

function pQuantity(V)
{
    let button = $(V);
    let oldValue = button.parent().parent().find('input').val();
    let Product_price = +button.parent().parent().parent().parent().find('.PPrice').text().slice(1);
    let total_price;
    
    if (button.hasClass('btn-plus')) {
        var newVal = parseFloat(oldValue) + 1;
    } else {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    button.parent().parent().find('input').val(newVal);
    button.parent().parent().parent().parent().find('.totalP').text(`$${+newVal * Product_price}`);
}























