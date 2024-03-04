// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/main.js":[function(require,module,exports) {
'use strict';

// === size menu start ===
window.addEventListener('load', setMenuWidth);
window.addEventListener('resize', setMenuWidth);
function setMenuWidth() {
  var container = document.querySelector('.container');
  var menu = document.querySelector('.menu');
  var menuOpen = document.querySelector('.menuOpen');
  if (container && menu) {
    var containerWidth = container.offsetWidth - 50;
    menu.style.width = "".concat(containerWidth, "px");
    menuOpen.style.width = "".concat(containerWidth, "px");
  }
}
// === size menu end ===

// === open menu start ===
var openMenu = document.querySelector('#menuOpen');
var menuActive = document.querySelector('.menuActive');
var menu = document.querySelector('.menu');
var closeMenu = document.querySelector('#close');
openMenu.addEventListener('click', function () {
  menuActive.style.transform = 'translateX(0)';
  menu.style.display = 'none';
  disableScroll();
});
closeMenu.addEventListener('click', function () {
  menuActive.style.transform = 'translateX(-100%)';
  enableScroll();
  menu.style.display = 'blocл';
});
function disableScroll() {
  var scrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = "-".concat(scrollY, "px");
}
function enableScroll() {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  var scrollY = parseInt(document.body.style.top || '0');
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
}

// === open menu end === 

// === welcome image start === 
window.addEventListener('load', function () {
  var welcomeImage = document.querySelector('.welcome');
  welcomeImage.style.display = 'block';
  setTimeout(function () {
    welcomeImage.style.transform = 'translateY(-100%)';
  }, 2000);
});

// === welcome image end === 

// === carousel start ===
var arrowLeft = document.querySelector('.catalog__arrow--left');
var arrowRight = document.querySelector('.catalog__arrow--right');
var productsContainer = document.querySelector('.product__container');
var allCards = document.querySelectorAll('.product__card');
var cardWidth = document.querySelector('.product__card').offsetWidth + parseInt(window.getComputedStyle(document.querySelector('.product__card')).marginRight);
var isScrolling = false;
function checkScrollEnd() {
  var isAtEnd = productsContainer.scrollWidth - (productsContainer.scrollLeft + productsContainer.clientWidth) <= 0;
  if (isAtEnd) {
    allCards[allCards.length - 1].style.marginRight = '0px';
  } else {
    allCards[allCards.length - 1].style.marginRight = "".concat(cardWidth - allCards[0].offsetWidth, "px");
  }
}
arrowLeft.addEventListener('click', function () {
  if (!isScrolling) {
    isScrolling = true;
    productsContainer.scrollBy({
      left: -cardWidth,
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(function () {
      isScrolling = false;
      checkScrollEnd();
    }, 400);
  }
});
arrowRight.addEventListener('click', function () {
  if (!isScrolling) {
    isScrolling = true;
    productsContainer.scrollBy({
      left: cardWidth,
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(function () {
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
productsContainer.addEventListener('wheel', preventScroll, {
  passive: false
});
productsContainer.addEventListener('touchmove', preventScroll, {
  passive: false
});

// === carousel end ===

document.addEventListener('DOMContentLoaded', function () {
  var addToCartButtons = document.querySelectorAll('.product__basket');
  var cart = document.querySelector('.menu__price--location .menu__amount');
  var cartContent = document.querySelector('#cartItems');
  var deleteBasket = document.querySelector('.cart__deleteBasket');
  var cartTotal = 0;
  var cartItems = [];
  if (localStorage.getItem('cartItems')) {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    updateCartContent();
  }
  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      var productCard = button.closest('.product__card');
      addToCart(productCard);
    });
  });
  function calculateTotal() {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      return cartItems.reduce(function (total, item) {
        var itemTotal = typeof item.price === 'number' && typeof item.quantity === 'number' ? item.price * item.quantity : 0;
        return total + itemTotal;
      }, 0);
    } else {
      console.error('cartItems is not an array or empty', cartItems);
      return 0;
    }
  }
  updateTotalPrice();
  function addToCart(productCard) {
    var id = productCard.getAttribute('id');
    var imgSrc = productCard.querySelector('.product__img').src;
    var title = productCard.querySelector('.product__title').textContent;
    var priceText = productCard.querySelector('.product__price').textContent;
    var price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    var existingItem = cartItems.find(function (item) {
      return item.id === id;
    });
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: id,
        imgSrc: imgSrc,
        title: title,
        price: price,
        quantity: 1
      });
    }
    cartTotal += price;
    cart.textContent = "".concat(cartTotal);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartContent();
  }
  console.log(cart.textContent);
  function updateCartContent() {
    cartContent.innerHTML = '';
    cartItems.forEach(function (item, index) {
      var itemElement = document.createElement('div');
      itemElement.classList.add('cart__product');
      itemElement.innerHTML = "\n          <img src=\"".concat(item.imgSrc, "\" alt=\"").concat(item.title, "\" class=\"cart__item--img\">\n          <div>\n            <h4 class=\"cart__item--title\">").concat(item.title, "</h4>\n            <p class=\"cart__item--price\">").concat(item.price, " \u0433\u0440\u043D</p>\n            <button class=\"cart__item--minus\" data-index=\"").concat(index, "\">-</button>\n             &nbsp; ").concat(item.quantity, " &nbsp;\n            <button class=\"cart__item--plus\" data-index=\"").concat(index, "\">+</button>\n          </div>\n        ");
      cartContent.appendChild(itemElement);
      itemElement.querySelector('.cart__item--minus').addEventListener('click', function () {
        return updateQuantity(index, -1);
      });
      itemElement.querySelector('.cart__item--plus').addEventListener('click', function () {
        return updateQuantity(index, 1);
      });
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
    var total = calculateTotal();
    var cartTotalPriceElement = document.querySelector('#cartTotalPrice');
    if (cartTotalPriceElement) {
      cartTotalPriceElement.textContent = "".concat(total, " \u0433\u0440\u043D");
    }
    var menuAmountElement = document.querySelector('.menu__amount');
    if (menuAmountElement) {
      menuAmountElement.textContent = "".concat(total, " \u0433\u0440\u043D");
    }
  }
  deleteBasket.addEventListener('click', function () {
    cartItems = [];
    localStorage.removeItem('cartItems');
    updateCartContent();
  });
});
var openBasket = document.querySelector('.menu__price--location');
var closeBasket = document.querySelector('.cart__close');
var basket = document.querySelector('.cart__container');
openBasket.addEventListener('click', function () {
  basket.style.transform = 'translateX(0)';
});
closeBasket.addEventListener('click', function () {
  basket.style.transform = 'translateX(200%)';
});
},{}],"../../../../.nvm/versions/node/v14.21.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50448" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.21.3/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map