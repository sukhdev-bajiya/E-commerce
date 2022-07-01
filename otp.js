document.querySelector("form").addEventListener("submit", makePayment);

function makePayment(event) {
  event.preventDefault();
  var payOtp = document.getElementById("payOtp").value;

  if (payOtp === "1234") {
    alert("Payment Successful");
    setTimeout(function () {
      window.open("index.html", "_self");
    }, 60);
    localStorage.setItem("makePayment", 0);
    var myProduct = [];
    localStorage.setItem("addToCart", JSON.stringify(myProduct));
  } else {
    alert("Enter Valid Otp");
  }
}
