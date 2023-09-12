// navbar
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector("header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

//showing productCount in header
var productCount=JSON.parse(localStorage.getItem("productCount"));
if(productCount!=null){
    document.getElementById("cart-count").innerHTML=`${productCount}`;
}

//display products in cart
var cart=JSON.parse(localStorage.getItem("cart"));
var cart_items_container=document.getElementById("cart-item-container");
if(cart){
    var totalAmount=0;
for(var i=0;i<cart.length;i++){
    console.log(i);
    cart_items_container.innerHTML +=`
    <div class="item">
        <img src="${cart[i].image}">
        <div class="detail">
            <h3>${cart[i].name}</h3>
            <p>quantity:${cart[i].count}</p>
            <p>price:Rs ${cart[i].price} per piece</p>
        </div>
    </div>`

    totalAmount=totalAmount+(cart[i].price * cart[i].count);
    console.log(totalAmount);
}
//showing product count
document.getElementById("number-of-item").innerHTML=`${productCount}`
//showing total amount
document.getElementById("total-amount").innerHTML=`${totalAmount}`
}else{
    document.getElementById("cart").innerHTML=`<h1 class="emptyCart">Cart Is Empty</h1>`
}


//placing order
var placeOrderBtn=document.getElementById("place-order");
placeOrderBtn.addEventListener("click",function(){
    localStorage.removeItem("cart");
    localStorage.removeItem("productCount");
    window.location.assign("/orderconfirm.html");
    // location.reload();
})