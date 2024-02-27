'use strict';

// === size menu start ===
window.addEventListener('load', setMenuWidth);
window.addEventListener('resize', setMenuWidth);

function setMenuWidth() {
  const container = document.querySelector('.container');
  const menu = document.querySelector('.menu');
  const menuOpen = document.querySelector('.menuOpen');

  if (container && menu) {
    const containerWidth = container.offsetWidth - 50;
    menu.style.width = `${containerWidth}px`;
    menuOpen.style.width = `${containerWidth}px`;
  }
}
// === size menu end ===

// === open menu start ===
const openMenu = document.querySelector('#menuOpen');
const menuActive = document.querySelector('.menuActive');
const closeMenu = document.querySelector('#close');
openMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(0)';
});
closeMenu.addEventListener('click', function() {
  menuActive.style.transform = 'translateX(-200%)';
});

// === open menu end === 

// === welcome image start === 
window.addEventListener('load', function() {
  const welcomeImage = document.querySelector('.welcome');
  welcomeImage.style.display = 'block';
  
  setTimeout(function() {
    welcomeImage.style.transform = 'translateY(-100%)';
  }, 2000); 
});

// === welcome image end === 

// === carousel start ===
const arrowLeft = document.querySelector('.catalog__arrow--left');
const arrowRight = document.querySelector('.catalog__arrow--right');
const productsContainer = document.querySelector('.product__container');
const allCards = document.querySelectorAll('.product__card');
const cardWidth = document.querySelector('.product__card').offsetWidth + 
                  parseInt(window.getComputedStyle(document.querySelector('.product__card')).marginRight);

let isScrolling = false;

function checkScrollEnd() {
  const isAtEnd = productsContainer.scrollWidth - (productsContainer.scrollLeft + productsContainer.clientWidth) <= 0;
  if (isAtEnd) {
    allCards[allCards.length - 1].style.marginRight = '0px';
  } else {
    allCards[allCards.length - 1].style.marginRight = `${cardWidth - allCards[0].offsetWidth}px`;
  }
}

arrowLeft.addEventListener('click', function() {
  if (!isScrolling) {
    isScrolling = true;
    productsContainer.scrollBy({ left: -cardWidth, top: 0, behavior: 'smooth' });
    setTimeout(() => {
      isScrolling = false;
      checkScrollEnd();
    }, 400);
  }
});

arrowRight.addEventListener('click', function() {
  if (!isScrolling) {
    isScrolling = true;
    productsContainer.scrollBy({ left: cardWidth, top: 0, behavior: 'smooth' });
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

productsContainer.addEventListener('wheel', preventScroll, { passive: false });
productsContainer.addEventListener('touchmove', preventScroll, { passive: false });

// === carousel end ===


