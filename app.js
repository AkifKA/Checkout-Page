const taxRate = 0.18;
const shippingPrice = 50;
const shippingFreePrice = 600;

window.addEventListener("load", () => {
  calculateCartPrice();
  //set items to LocalStorage
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //set items to sessionStorage
  //  sessionStorage.setItem("taxRate", taxRate);
  //  sessionStorage.setItem("shippingPrice", shippingPrice);
  //  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");
//Capturing vs. Bubbling
productsDiv.addEventListener("click", (event) => {
  if (event.target.className == "fa-solid fa-minus") {
    //console.log("minus btn is clicked!");
    if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
      event.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductPrice(event.target);
      calculateCartPrice();
    } else {
      if (
        confirm(
          `${
            event.target.parentElement.parentElement.querySelector("h2")
              .innerText
          } will be deleted!!!`
        )
      ) {
        //remove
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
      }
    }
  } else if (event.target.classList.contains("fa-plus")) {
    //console.log("plus btn is clicked!");
    event.target.previousElementSibling.innerText++;
    calculateProductPrice(event.target);
    calculateCartPrice();
  } else if (event.target.className == "remove-product") {
    //console.log("remove btn is clicked!");
    event.target.parentElement.parentElement.parentElement.remove();
    calculateCartPrice();
    document.querySelector("#cart-discount").remove();
    document.querySelector("#cart-total-with-discount").remove();
  } else {
    //console.log("other element is clicked!");
  }
});

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

  // console.log(shippingPrice);
  let totalPrice = subtotal + taxPrice + shippingPrice;
  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);
  document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
  document.querySelector("#cart-shipping").children[1].innerText =
    shippingPrice.toFixed(2);
  document.querySelector("#cart-total").lastElementChild.innerText =
    totalPrice.toFixed(2);
  let clicked = true;
  let discountPrice = totalPrice * 0.2;
  document.querySelector("#apply-discount").addEventListener("click", () => {
    if (clicked) {
      document.querySelector("#cart-total").lastElementChild.innerText =
        totalPrice.toFixed(2);
      console.log(document.querySelector("#cart-total"));
      document.querySelector("#cart-discount").classList.add("buy-detail");
      document.querySelector("#cart-discount p:nth-child(1)").innerText =
        "Discount";
      document.querySelector("#cart-discount p:nth-child(2)").innerText =
        parseFloat(-discountPrice).toFixed(2);
      document
        .querySelector("#cart-total-with-discount")
        .classList.add("buy-detail");
      document.querySelector(
        "#cart-total-with-discount p:nth-child(1)"
      ).innerText = "Total With Discount";
      document.querySelector(
        "#cart-total-with-discount p:nth-child(2)"
      ).innerText = parseFloat(totalPrice - discountPrice).toFixed(2);
      document.querySelector("#remove-discount").disabled = false;
      console.log(document.querySelectorAll(".fa-solid"));
      document.querySelectorAll(".quantity-controller").forEach((item) => {
        item.remove();
      });
      clicked = false;
    } else {
      document.querySelector("#cart-total").disabled = true;
    }
  });
  document.getElementById("remove-discount").addEventListener("click", () => {
    clicked = true;
    document.querySelector(
      "#cart-total-with-discount p:nth-child(2)"
    ).innerText = parseFloat(totalPrice + discountPrice).toFixed(2);
    document.querySelector("#cart-discount").remove();
    document.querySelector("#cart-total-with-discount").remove();
    document.querySelector(".fading-text").remove();
    document.querySelector("#remove-discount").disabled = false;
  });
};
