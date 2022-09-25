const taxRate = 0.18;
const shippingPrice = 50;
const shippingFreePrice = 600;
window.addEventListener("load", () => {
  //? set items to LocalStorage
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //? set items to sessionStorage
  sessionStorage.setItem("taxRate", taxRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");
//? //Capturing vs. Bubbling
productsDiv.addEventListener("click", (event) => {
  if (event.target.className == "fa-solid fa-minus") {
    /*    console.log("minus btn clicked"); */
    if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
      event.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(event.target);
      calculateCardPrice();
    } else {
      if (confirm("Product will be removed??")) {
        //? remove
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCardPrice();
      }
    }
  } else if (event.target.classList.contains("fa-plus")) {
    // console.log("plus btn clicked");
    event.target.previousElementSibling.innerText++;
    calculateProductPrice(event.target);
    calculateCardPrice();
  } else if (event.target.className == "remove-product") {
    console.log("remove btn clicked");
    calculateCardPrice();
  } else {
    console.log("other elements clicked");
  }
});
const calculateProductPrice = (clickedBtn) => {
  const productInfoDiv = clickedBtn.parentElement.parentElement;
  /* console.log(productInfoDiv); */
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
};

const calculateProductPrice = (btn) => {
  const productInfoDiv = btn.parentElement.parentElement;
  //console.log(productInfoDiv);
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText;
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
  productTotalDiv.innerText = (price * quantity).toFixed(2);
  //alert(quantity);
};

const calculateCartPrice = () => {
  const productsTotalPricesDivs = document.querySelectorAll(
    ".product-line-price"
  );
  //foreach ==> NodeList, Array
  //const productsTotalPricesDivs = [...document.getElementsByClassName("product-line-price")];

  let subtotal = 0;
  productsTotalPricesDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  //console.log(subtotal);
  const taxPrice = subtotal * localStorage.getItem("taxRate");

  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  console.log(shippingPrice);

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").children[1].innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText = (
    subtotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
