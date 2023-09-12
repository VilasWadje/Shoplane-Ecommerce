// navbar
const mobile_nav = document.querySelector(".mobile-navbar-btn");
const nav_header = document.querySelector("header");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

//for accesin product_id from currnt url 
// let url_str = window.location.href;
// let url = new URL(url_str);
let url = new URL(window.location.href);
let search_params = url.searchParams;
let id = search_params.get('product_id');
console.log(id);

//showing productCount in header
var productCount = JSON.parse(localStorage.getItem("productCount"));
if (productCount != null) {
  document.getElementById("cart-count").innerHTML = `${productCount}`;
}
var apiUrl = `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", apiUrl, true);
xhttp.onreadystatechange = function () {
  if (this.readyState == 4) {
    console.log(JSON.parse(this.responseText));

    var produt_details = JSON.parse(this.responseText);

    document.getElementById("product").innerHTML = `
    <div class="left-column">
      <img id="productImg" class="productImg" src="${produt_details.preview}" alt="">
    </div>
    <div class="right-column ">
      <div class="product-description">
          <h1>${produt_details.name}</h1>
          <h4>${produt_details.brand}</h4>
          <h3>Price: Rs <span id="price">${produt_details.price}</span></h3>
          <div class="description">
              <h3>Description</h3>
              <p id="description">${produt_details.description}</p>
          </div>
          <div class="product-preview">
              <h3>Product Preview</h3>
              <div id="previewImg" class="previewImg">

              </div>
          </div>
      </div>
      <div id="addToCartBtn" class="btn">
          <button id="add-to-cart">Add to Cart</button>
      </div>
    </div>`

    for (var i = 0; i < produt_details.photos.length; i++) {
      var imageee = document.createElement("img");
      imageee.src = produt_details.photos[i];
      imageee.classList.add("imageClass");
      document.getElementById("previewImg").appendChild(imageee);
    }

    var previewImages = document.getElementsByClassName("imageClass");
    previewImages[0].classList.add("active");
    for (var i = 0; i < previewImages.length; i++) {
      previewImages[i].addEventListener("click", function (e) {
        //for removing border of previous image
        document.querySelector(".active").classList.remove("active");
        //for adding border
        this.classList.add("active");

        document.getElementById("productImg").src = this.src;
        //for displaying big image
      })
    }


    /////add to cart in localstorage
    var addToCartBtn = document.getElementById("addToCartBtn");

    addToCartBtn.addEventListener("click", function () {
      var cart = JSON.parse(localStorage.getItem("cart"));
      var productCount=JSON.parse(localStorage.getItem("productCount"));
      if (cart == null) {
        var cart = [];
        obj = {
          id: produt_details.id,
          count: 1,
          name: produt_details.name,
          image:produt_details.preview,
          price: produt_details.price
        }
        cart.push(obj);
        localStorage.setItem("cart", JSON.stringify(cart));

        //productCount
        productCount=1;
        localStorage.setItem("productCount", JSON.stringify(productCount));

      }
      else{
        for(var i=0;i<cart.length;i++){
          var productId=JSON.parse(cart[i].id);
          if(productId==produt_details.id){
            cart[i].count=cart[i].count+1;
            localStorage.setItem("cart", JSON.stringify(cart));
            productCount++;
            localStorage.setItem("productCount", JSON.stringify(productCount));
            break;
          }else if(i==cart.length-1){
            obj = {
              id: produt_details.id,
              count: 1,
              name: produt_details.name,
              image:produt_details.preview,
              price: produt_details.price
            }
            cart.push(obj);
            console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            productCount++;
            localStorage.setItem("productCount", JSON.stringify(productCount));
            break;
          }
        }

        
      }console.log(cart);
      //showing productCount in header
      var productCount = JSON.parse(localStorage.getItem("productCount"));
      if (productCount != null) {
        document.getElementById("cart-count").innerHTML = `${productCount}`;
      }
    })

  }
}
xhttp.send();

