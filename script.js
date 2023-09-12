// navbar
const mobile_nav = document.querySelector(".mobile-navbar-btn");  
const nav_header = document.querySelector("header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

//carousel
var owl = $('.owl-carousel');
owl.owlCarousel({
    items:1, 
  // items change number for slider display on desktop
  
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true
});

//rendering products
var clothingCardsContainer=document.getElementById("clothingCards");
var accessoriesCardsContainer=document.getElementById("accessoriesCards");

var xhttp= new XMLHttpRequest();
xhttp.open("GEt","https://5d76bf96515d1a0014085cf9.mockapi.io/product",true);
xhttp.onreadystatechange=function(){
    if(this.readyState==4){
      var product_list=JSON.parse(this.responseText);
      console.log(product_list);

      for(var i=0;i<product_list.length;i++){
        if(product_list[i].isAccessory){
          accessoriesCardsContainer.innerHTML+=`<div class="card" id="${product_list[i].id}">
          <a href="product-details.html?product_id=${product_list[i].id}">
            <div class="img">
              <img src="${product_list[i].preview}">
            </div>
            <div class="details">
              <h3>${product_list[i].name}</h3>
              <h4>${product_list[i].brand}</h4>
              <h5>Rs ${product_list[i].price}</h5>
            </div>
          </a>
        </div>`
        }
        else{
          clothingCardsContainer.innerHTML+=`<div class="card" id="${product_list[i].id}">
          <a href="product-details.html?product_id=${product_list[i].id}">
            <div class="img">
              <img src="${product_list[i].preview}">
            </div>
            <div class="details">
              <h3>${product_list[i].name}</h3>
              <h4>${product_list[i].brand}</h4>
              <h5>Rs ${product_list[i].price}</h5>
            </div>
          </a>
        </div>`
        }
      }
    }
    
  }
xhttp.send();
var productCount=JSON.parse(localStorage.getItem("productCount"));
if(productCount!=null){
    document.getElementById("cart-count").innerHTML=`${productCount}`;
}
