var userOderData = JSON.parse(localStorage.getItem("addToCart"));
pageload();
function pageload() {
  document.getElementById("cartitem").innerText = "";
  userOderData.map(function (element, index) {
    var totalprice = element.price;
    var item = `
            <img src="${element.image_url}" alt="${element.name}">
            <div>
                <h2>${element.name}</h2>
                <div>
                    <span> &#8377; ${totalprice}</span>
                    <div>
                        <button onclick="dicProduct(${element.id})"><strong>-</strong></button>
                        <span id="quanti">${element.quantiItem}</span>
                        <button onclick="incProduct(${element.id})"><strong>+</strong></button>
                    </div>
                    <button type="submit" onclick="removeProductToCart(${index})">Remove from Cart</button>
                </div>
            </div>
        `;
    var itemBox = document.createElement("div");
    itemBox.innerHTML = item;
    var contener = document.getElementById("cartitem");
    contener.append(itemBox);
  });

  
  var cartTotal = document.getElementById("cartCount");
  cartTotal.innerText = userOderData.length;
  var totalprice = userOderData.reduce(function (val, pri) {
    return (val += Number(pri.price * pri.quantiItem));
  }, 0);
  paymentOfPro(totalprice);
}

// Apply Promo code
document.querySelector("form").addEventListener("submit", applypromo);
var trv = true;
function applypromo(event) {
  event.preventDefault();
  var promo = document.getElementById("promo").value;
  var totalprice = localStorage.getItem("makePayment");
  console.log(totalprice)
  Number(totalprice.value);
  if (promo === "masai30") {
    alert("Promo Apply Successful");
    if (trv) {
      totalprice -= (totalprice * 30) / 100;
      paymentOfPro(totalprice);
      trv = false;
    } else {
      alert("Promo not Valid");
    }
  } else {
    alert("Promo not Valid");
  }

}
function paymentOfPro(totalprice){
  var cartTotalPrice = document.getElementById("cartTotalPrice");
  cartTotalPrice.innerText = totalprice;
  localStorage.setItem("makePayment", totalprice)
}


// On clicking increase 1 by 1
function dicProduct(val) {
  var myProduct = userOderData.map(function (element) {
    if (element.id == val && element.quantiItem > 1) {
      element.quantiItem = element.quantiItem - 1;
    }
    return element;
  });
  localStorage.setItem("addToCart", JSON.stringify(myProduct));
  pageload();
}
// On clicking decrease 1 by 1
function incProduct(val) {
  var myProduct = userOderData.map(function (element) {
    if (element.id == val) {
      element.quantiItem = element.quantiItem + 1;
    }
    return element;
  });
  localStorage.setItem("addToCart", JSON.stringify(myProduct));
  pageload();
}

// remove Product To Cart
function removeProductToCart(val) {
  userOderData.splice(val, 1)
  localStorage.setItem("addToCart", JSON.stringify(userOderData));
  pageload();
}