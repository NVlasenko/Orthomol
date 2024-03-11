"use strict";

export const cartModule = () => {
  const addToCartButtons = document.querySelectorAll(".product__basket");
  const cart = document.querySelector(".menu__price--location .menu__amount");
  const cartContent = document.querySelector("#cartItems");
  const deleteBasket = document.querySelector(".cart__deleteBasket");
  let cartTotal = 0;
  let cartItems = [];

  if (localStorage.getItem("cartItems")) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    updateCartContent();
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productCard = button.closest(".product__card");
      addToCart(productCard);
    });
  });

  function calculateTotal() {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return cartItems.reduce((total, item) => {
        const itemTotal =
          typeof item.price === "number" && typeof item.quantity === "number"
            ? item.price * item.quantity
            : 0;
        return total + itemTotal;
      }, 0);
    } else {
      return 0;
    }
  }

  updateTotalPrice();

  function addToCart(productCard) {
    const id = productCard.getAttribute("id");
    const imgSrc = productCard.querySelector(".product__img").src;
    const title = productCard.querySelector(".product__title").textContent;
    const priceText = productCard.querySelector(".product__price").textContent;
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ id, imgSrc, title, price, quantity: 1 });
    }

    cartTotal += price;
    cart.textContent = `${cartTotal}`;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartContent();
  }

  function updateCartContent() {
    cartContent.innerHTML = "";
    const orderItems = document.querySelector("#orderItems");
    orderItems.innerHTML = "";

    cartItems.forEach((item, index) => {
      const element = createCartItemElement(item, index);
      cartContent.appendChild(element.cloneNode(true));
      orderItems.appendChild(element);
    });

    updateTotalPrice();
  }

  function updateQuantity(index, change) {
    if (cartItems[index]) {
      cartItems[index].quantity += change;
      if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartContent();
      updateTotalPrice();
    }
  }

  function createCartItemElement(item, index) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart__product");
    itemElement.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}" class="cart__item--img">
      <div>
        <h4 class="cart__item--title">${item.title}</h4>
        <p class="cart__item--price">${item.price} грн</p>
        <div class="cart__item-quantity">
          <button class="cart__item--minus" data-index="${index}">-</button>
          &nbsp;${item.quantity}&nbsp;
          <button class="cart__item--plus" data-index="${index}">+</button>
        </div>
      </div>
    `;

    return itemElement;
  }

  function getOrderItems() {
    const orderItems = [];
    cartItems.forEach(item => {
      const orderItem = {
        title: item.title,
        quantity: item.quantity,
        price: item.price
      };
      orderItems.push(orderItem);
    });
    return orderItems;
  }
  
  function addEventListenersToButtons() {
    const minusButtons = document.querySelectorAll(".cart__item--minus");
    const plusButtons = document.querySelectorAll(".cart__item--plus");

    minusButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, -1));
    });

    plusButtons.forEach((button, index) => {
      button.addEventListener("click", () => updateQuantity(index, 1));
    });
  }

  addEventListenersToButtons();

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("cart__item--minus")) {
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      updateQuantity(index, -1);
    } else if (event.target.classList.contains("cart__item--plus")) {
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      updateQuantity(index, 1);
    }
  });

  function updateTotalPrice() {
    const total = calculateTotal();

    const cartTotalPriceElement = document.querySelector("#cartTotalPrice");
    if (cartTotalPriceElement) {
      cartTotalPriceElement.textContent = `${total} грн`;
    }

    const menuAmountElement = document.querySelector(".menu__amount");
    if (menuAmountElement) {
      menuAmountElement.textContent = `${total} грн`;
    }

    const orderTotalPriceElement = document.querySelector("#orderTotalPrice");
    if (orderTotalPriceElement) {
      orderTotalPriceElement.textContent = `${total} грн`;
    }
  }

  deleteBasket.addEventListener("click", () => {
    cartItems = [];
    localStorage.removeItem("cartItems");
    updateCartContent();
  });
};
