//I will use local storage to store the data
//the name of the array that contains the products is
//      cart-JSGE472HDTA82H

function getCart() {
    var CART = localStorage.getItem("cart-JSGE472HDTA82H");
    if (CART === "null") {
        localStorage.setItem("cart-JSGE472HDTA82H", JSON.stringify([]));
        return [];
    }
    return JSON.parse(CART);
}
function storeCart(CART) {
    localStorage.setItem("cart-JSGE472HDTA82H", JSON.stringify(CART));
}

//get the cart initially
var cart = getCart();
//fill in the price values with their values
function fill() {
    let Subtotal = document.getElementById('Subtotal');
    let Shipping = document.getElementById('Shipping');
    let Total = document.getElementsByClassName('Total');
    let total = 0;
    let ship = 0;
    for (var c = 0; c < cart.length; c++) {
        let product = JSON.parse(cart[c]);
        total += product['price'];
    }
    //Shipping is 20% of the price
    ship = total * 0.2;
    //fill in values
    Subtotal.innerHTML = ""+total;
    Shipping.innerHTML = "" + ship;
    Total[0].innerHTML = "" + (total + ship);
    Total[1].innerHTML = "" + (total + ship) + "  ";
}
function cartLength() {
    return cart.length;
}
function addItem(ITEM) {
    cart.push(ITEM);
    storeCart(cart);
    //add a snackbar
    showSnackbar("Added to your cart", "success");
    document.getElementsByClassName('cart-badge')[0].innerHTML = "" + cartLength();
}
function deleteItem(ID) {
    cart = cart.filter(x => JSON.parse(x)['id'] !== ID);
    storeCart(cart);
    showCart();
    fill();
    document.getElementsByClassName('cart-badge')[0].innerHTML = "" + cartLength();
}
function deleteCart() {
    cart = [];
    storeCart(null);
    showCart();
    fill();
    document.getElementsByClassName('cart-badge')[0].innerHTML = "" + cartLength();
}

function showCount() {
    document.getElementsByClassName('cart-badge')[0].innerHTML = "" + cartLength();
}

function showCart() {
    let cartContainer = document.getElementById("cartModal");
    if (cartContainer) {
        //cartContainer.classList.add("show");
        var cartProducts = document.getElementById("cart-products");
        //cartProducts.style.display = "block";
        cartProducts.innerHTML = "";
        //fill the span with it's value
        let countProducts = document.getElementById('countProducts');
        countProducts.innerHTML = "";
        countProducts.innerHTML = cartLength();
        for (var i = 0; i < cart.length; i++) {
            let product = JSON.parse(cart[i]);
            cartProducts.innerHTML += `
                <div class="card mb-2 mb-lg-1">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div>
                                    <img src="img/jewelryItems/${product.picture}" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;height: 60px;">
                                </div>
                                <div class="ms-3">
                                    <h5>${product.name}</h5>
                                    <p class="small mb-0">${product.category}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 50px;">
                                    <h5 class="fw-normal mb-0">${product.quantity}</h5>
                                </div>
                                <div style="width: 80px;">
                                    <h5 class="mb-0">$${product.price}</h5>
                                </div>
                                <a class="deleteIcon" style="color: #cecece;" onclick="deleteItem(${product.id})"  data-bs-toggle="tooltip" data-bs-placement="buttom" title="Remove Item">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

}
function closeCart() {
    let cartContainer = document.getElementById("cartModal");
    cartProducts.style.display = "none";
    cartContainer.classList.remove("show");
}
function sortPrice() {
    cart.sort(function (x, y) {
        let a = JSON.parse(x);
        let b = JSON.parse(y);
        return a.price - b.price;
    });
    showCart();
}
function sortAlphabetic() {
    cart.sort(function (x, y) {
        let a = JSON.parse(x);
        let b = JSON.parse(y);
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    showCart();
}
function sortCart() {
    let opt = document.getElementById("sort");
    let val = opt.value;
    if (val == 'Price') sortPrice();
    else if (val == 'Name') sortAlphabetic();
}
//sort cart initially on price
sortPrice();
