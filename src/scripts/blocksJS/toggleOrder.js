"use strict";

export const toggleOrder = () => {
  const openOrder = document.querySelector(".cart__checkout");
  const closeOrder = document.querySelector(".order__close");
  const order = document.querySelector(".order");
  const basket = document.querySelector(".cart__container");

  function toggleOrder(open) {
    if (open) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  openOrder.addEventListener("click", function () {
    order.style.transform = "translateY(0)";
    basket.style.transform = "translateX(200%)";
    toggleOrder(true);
  });

  closeOrder.addEventListener("click", function () {
    order.style.transform = "translateY(-200%)";
    toggleOrder(false);
  });
}