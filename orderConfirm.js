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

