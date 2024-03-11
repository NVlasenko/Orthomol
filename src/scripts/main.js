"use strict";

import { setMenuWidth } from './blocksJS/menuWidth.js';
import { toggleMenu } from './blocksJS/toggleMenu.js';
import { showWelcomeImage } from './blocksJS/welcomeImage.js';
import { initializeCarousel } from './blocksJS/initializeCarousel.js';
import { cartModule } from './blocksJS/cartModule.js';
import { toggleBasket } from './blocksJS/toggleBasket.js';
import { toggleOrder } from './blocksJS/toggleOrder.js';

window.addEventListener("load", setMenuWidth);
window.addEventListener("resize", setMenuWidth);

toggleMenu();
showWelcomeImage();

document.addEventListener("DOMContentLoaded", () => {
  initializeCarousel();
  cartModule();
  toggleOrder();
});

toggleBasket();