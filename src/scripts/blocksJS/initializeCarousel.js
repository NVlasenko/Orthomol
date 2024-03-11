"use strict";

export function initializeCarousel() {
  const arrowLeft = document.querySelector(".catalog__arrow--left");
  const arrowRight = document.querySelector(".catalog__arrow--right");
  const productsContainer = document.querySelector(".product__container");
  const allCards = document.querySelectorAll(".product__card");
  const cardWidth =
    document.querySelector(".product__card").offsetWidth +
    parseInt(
      window.getComputedStyle(document.querySelector(".product__card"))
        .marginRight
    );

  let isScrolling = false;

  function checkScrollEnd() {
    const isAtEnd =
      productsContainer.scrollWidth -
        (productsContainer.scrollLeft + productsContainer.clientWidth) <=
      0;
    if (isAtEnd) {
      allCards[allCards.length - 1].style.marginRight = "0px";
    } else {
      allCards[allCards.length - 1].style.marginRight = `${
        cardWidth - allCards[0].offsetWidth
      }px`;
    }
  }

  arrowLeft.addEventListener("click", function () {
    if (!isScrolling) {
      isScrolling = true;
      productsContainer.scrollBy({
        left: -cardWidth,
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        isScrolling = false;
        checkScrollEnd();
      }, 400);
    }
  });

  arrowRight.addEventListener("click", function () {
    if (!isScrolling) {
      isScrolling = true;
      productsContainer.scrollBy({ left: cardWidth, top: 0, behavior: "smooth" });
      setTimeout(() => {
        isScrolling = false;
        checkScrollEnd();
      }, 400);
    }
  });

  function preventScroll(e) {
    if (isScrolling) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  productsContainer.addEventListener("wheel", preventScroll, { passive: false });
  productsContainer.addEventListener("touchmove", preventScroll, {
    passive: false,
  });
}