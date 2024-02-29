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


document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.product__basket');
  const cart = document.querySelector('.menu__price--location .menu__amount');
  const cartContent = document.querySelector('#cartItems');
  const deleteBasket = document.querySelector('.cart__deleteBasket');
  let cartTotal = 0;
  let cartItems = [];

  if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    updateCartContent();
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const productCard = button.closest('.product__card');
      addToCart(productCard);
    });
  });

  function calculateTotal() {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return cartItems.reduce((total, item) => {
        const itemTotal = (typeof item.price === 'number' && typeof item.quantity === 'number') ? item.price * item.quantity : 0;
        return total + itemTotal;
      }, 0);
    } else {
      console.error('cartItems is not an array or empty', cartItems);
      return 0; 
    }
  }

  updateTotalPrice();

  function addToCart(productCard) {
    const id = productCard.getAttribute('id');
    const imgSrc = productCard.querySelector('.product__img').src;
    const title = productCard.querySelector('.product__title').textContent;
    const priceText = productCard.querySelector('.product__price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ id, imgSrc, title, price, quantity: 1 });
    }

    cartTotal += price;
    cart.textContent = `${cartTotal}`;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartContent();
  }

  console.log(cart.textContent);

  function updateCartContent() {
    cartContent.innerHTML = '';
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart__product');
        itemElement.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.title}" class="cart__item--img">
          <div>
            <h4 class="cart__item--title">${item.title}</h4>
            <p class="cart__item--price">${item.price} грн</p>
            <button class="cart__item--minus" data-index="${index}">-</button>
             &nbsp; ${item.quantity} &nbsp;
            <button class="cart__item--plus" data-index="${index}">+</button>
          </div>
        `;
        cartContent.appendChild(itemElement);

        itemElement.querySelector('.cart__item--minus').addEventListener('click', () => updateQuantity(index, -1));
        itemElement.querySelector('.cart__item--plus').addEventListener('click', () => updateQuantity(index, 1));
    });
    updateTotalPrice();
  }

  function updateQuantity(index, change) {
    if (cartItems[index]) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1); 
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        updateCartContent(); 
    }
  }

  function updateTotalPrice() {
    const total = calculateTotal();

    const cartTotalPriceElement = document.querySelector('#cartTotalPrice');
    if (cartTotalPriceElement) {
      cartTotalPriceElement.textContent = `${total} грн`;
    }

    const menuAmountElement = document.querySelector('.menu__amount');
    if (menuAmountElement) {
      menuAmountElement.textContent = `${total} грн`;
    }
  }

  deleteBasket.addEventListener('click', () => {
    cartItems = [];
    localStorage.removeItem('cartItems'); 
    updateCartContent(); 
  });
});


const openBasket = document.querySelector('.menu__price--location');
const closeBasket = document.querySelector('.cart__close');
const basket = document.querySelector('.cart__container');
openBasket.addEventListener('click', function() {
  basket.style.transform = 'translateX(0)';
});
closeBasket.addEventListener('click', function() {
  basket.style.transform = 'translateX(200%)';
});
