"use strict";

export const toggleBasket = () => {
  const openBasket = document.querySelector(".menu__price--location");
  const closeBasket = document.querySelector(".cart__close");
  const basket = document.querySelector(".cart__container");
  
  openBasket.addEventListener("click", function () {
    basket.style.transform = "translateX(0)";
  });
  closeBasket.addEventListener("click", function () {
    basket.style.transform = "translateX(200%)";
  });
}