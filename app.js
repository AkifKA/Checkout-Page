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

const calculateCardPrice = () => {
  const productTotalPriceDivs = document.querySelectorAll(
    ".product-line-price"
  );

  //? forEach==> Nodelist, Array
  /*  const productTotalPriceDivs=[...document.getElementsByClassName("product-line-price")]; */
  productTotalPriceDivs.forEach((div) => {
    let subTotal = 0;
    subTotal += parseFloat(div.innerText);
    const taxPrice = subTotal * localStorage.getItem("taxRate");
    const shippingPrice =
      subTotal > 0 && subTotal < localStorage.getItem("shippingPrice")
        ? localStorage.getItem("shippingPrice")
        : 0;
  });
};
