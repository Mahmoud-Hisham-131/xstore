// start nav
let iconLm = document.querySelector("nav .side-menu");
let iconSm = document.querySelector("nav .container .actives .icons .search");
let iconUm = document.querySelector("nav .container .actives .icons .user");
let iconCm = document.querySelector("nav .container .actives .icons .cart");
let iconCurrency = document.querySelector("nav .container .actives .money");
let currencyText = document.querySelector("nav .money .currency");
let overLay = document.querySelector(" body .body-overlay");
let allCurrency = document.querySelector("nav .money .all_currency");
let currencyIconDown = document.querySelector(".currency .down");
let currencyIconUp = document.querySelector(".currency .up");
let otherCurrency = document.querySelectorAll("nav .all_currency span");
let linksLi = document.querySelectorAll("nav .links ul li");

let cateCounter = document.querySelector("nav .icons .cart span");
cateCounter.innerHTML = "0";

iconLm.onclick = function () {
  let menu = document.querySelector("#menu");

  menu.style.opacity = "1";
  menu.style.transform = "translatex(0)";
  menu.style.transition = " var(--main-transition)";

  overLay.style.display = "block";
  overLay.style.transition = " var(--main-transition)";

  let closeIcon = document.querySelector("#menu i");
  closeIcon.onclick = () => {
    menu.style.opacity = "0";
    menu.style.transform = "translatex(-100%)";
    menu.style.transition = " var(--main-transition)";

    overLay.style.display = "none";
    overLay.style.transition = " var(--main-transition)";
  };
};

iconCm.onclick = function () {
  let cartMenu = document.querySelector("#cart-menu");

  cartMenu.style.opacity = "1";
  cartMenu.style.transform = "translatex(0)";
  cartMenu.style.transition = " var(--main-transition)";

  overLay.style.display = "block";
  overLay.style.transition = " var(--main-transition)";

  let closeIcon = document.querySelector("#cart-menu i");
  closeIcon.onclick = () => {
    cartMenu.style.opacity = "0";
    cartMenu.style.transform = "translatex(100%)";
    cartMenu.style.transition = " var(--main-transition)";

    overLay.style.display = "none";
    overLay.style.transition = " var(--main-transition)";
  };
};

iconSm.onclick = function () {
  let searchMmenu = document.querySelector("#search-menu");

  searchMmenu.style.opacity = "1";
  searchMmenu.style.transform = "translatey(0)";
  searchMmenu.style.transition = " var(--main-transition)";

  overLay.style.display = "block";
  overLay.style.transition = " var(--main-transition)";

  let closeIcon = document.querySelector("#search-menu i");
  closeIcon.onclick = () => {
    searchMmenu.style.opacity = "0";
    searchMmenu.style.transform = "translatey(-100%)";
    searchMmenu.style.transition = " var(--main-transition)";

    overLay.style.display = "none";
    overLay.style.transition = " var(--main-transition)";
  };
};

iconUm.onclick = function () {
  let userMenu = document.querySelector("#user-menu");

  userMenu.style.opacity = "1";
  userMenu.style.transform = "translatex(0)";
  userMenu.style.transition = " var(--main-transition)";

  overLay.style.display = "block";
  overLay.style.transition = " var(--main-transition)";

  let closeIcon = document.querySelector("#user-menu i");
  closeIcon.onclick = () => {
    userMenu.style.opacity = "0";
    userMenu.style.transform = "translatex(100%)";
    userMenu.style.transition = " var(--main-transition)";

    overLay.style.display = "none";
    overLay.style.transition = " var(--main-transition)";
  };
};

iconCurrency.onmouseenter = function () {
  currencyIconDown.style.display = "none";
  currencyIconUp.style.display = "inline";
  allCurrency.style.opacity = "1";
  allCurrency.style.transform = "translateY(0)";
  allCurrency.style.transition = " var(--main-transition)";
};

iconCurrency.onmouseleave = function () {
  currencyIconDown.style.display = "inline";
  currencyIconUp.style.display = "none";
  allCurrency.style.opacity = "0";
  allCurrency.style.transform = "translateY(20px)";
  allCurrency.style.transition = " var(--main-transition)";
};

otherCurrency.forEach((span) => {
  span.onclick = () => {
    let oldCurrency = currencyText.textContent;
    currencyText.textContent = span.textContent;
    span.textContent = oldCurrency;
  };
});

linksLi.forEach((li) => {
  li.onclick = () => {
    linksLi.forEach((li) => {
      li.classList.remove("active");
    });

    li.classList.add("active");
  };
});

// end nav

// start hero
// slider
let mainSlider = new Splide("#mainSlider", {
  type: "loop",
  perPage: 1,
  autoplay: true,
  interval: 3000,
});
mainSlider.mount();

// slider
// end hero

// start innovation
const bg = document.querySelector(".innovation .container");
const section = document.querySelector(".innovation");
const speed = 0.15;

window.addEventListener(
  "scroll",
  () => {
    const rect = section.getBoundingClientRect();

    bg.style.transform = `translateY(${-rect.top * speed}px)`;
  },
  { passive: true },
);
// end innovation

// reveal
const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

sections.forEach((section) => observer.observe(section));
// reveal

// start products
const container = document.querySelector("#productes .splide__list");
let allProducts = [];

async function loadProducts() {
  const response = await fetch("./products.json");
  const products = await response.json();
  allProducts = products;

  const firstSix = products.slice(0, 6);

  renderProducts(firstSix);

  initSlider();
  renderCart();
}

function renderProducts(products) {
  container.innerHTML = products.map(createCard).join("");

}

const formatPrice = (price) =>
  `${price.toLocaleString("en-US", { minimumFractionDigits: 2 })} $`;

const renderSwatches = (images, active) =>
  images
    .map(
      (src, index) =>
        `<div  class="image swatch${src === active ? " active" : ""}" data-image="${src}" aria-label="Photo ${index + 1}"><img src="${src}" alt=""></div>`,
    )
    .join("");

function createCard({ id, name, category, price, image_1, image_2, image_3 }) {
  return `
    <li class="splide__slide">
      <article class="card">
          <div class="image">
            <img class="main" src="${image_1}" alt="${name}" loading="lazy">
            <div class="button" data-id="${id}"><i class="uil uil-shopping-bag"></i> Add To Cart</div>
          </div>
          <div class="card-text">
            <span class="pro-cat">${category}</span>
            <p class="pro-name">${name}</p>
            <p class="pro-price">${formatPrice(price)}</p>
            <div class="pro-swatches">${renderSwatches([image_3, image_2, image_1], image_1)}</div>
          </div>
        </article>
    </li>
  `;
}



// add to cart button + swatches (a swatch becomes active and its photo replaces the main one)
document.addEventListener("click", (e) => {
  const addButton = e.target.closest(".card .button");
  const swatch = e.target.closest(".swatch");

  if (addButton) {
    addToCart(Number(addButton.dataset.id));
  }

  if (swatch) {
    const card = swatch.closest(".card");
    card.querySelector(".main").src = swatch.dataset.image;
    card
      .querySelectorAll(".swatch")
      .forEach((item) => item.classList.toggle("active", item === swatch));
  }
});

// start cart
const CART_KEY = "xstoreCart";

const cartItems = document.querySelector(".cart-items");
const cartTitle = document.querySelector(".cart-title");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total strong");
// Delete Alert
const deleteAlert = document.getElementById("deleteAlert");
const cancelDeleteBtn = document.querySelector(".cancel-btn");
const confirmDeleteBtn = document.querySelector(".remove-btn");

let productIdToDelete = null;

// the cart is saved in localStorage, so it stays when the page changes
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) { }
}

let cart = loadCart();

const getQuantity = () => cart.reduce((sum, { quantity }) => sum + quantity, 0);
cateCounter.textContent = getQuantity();

function updateCart() {
  saveCart();
  renderCart();
}

const msg = document.querySelector("#msg");
let msgTimer;

function showToast() {
  clearTimeout(msgTimer);
  msg.classList.add("show");

  msgTimer = setTimeout(() => {
    msg.classList.remove("show");
  }, 2000);
}

function addToCart(id) {
  const item = cart.find((product) => product.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  updateCart();
  showToast()
  iconCm.click();

}

function changeQuantity(id, step) {
  const item = cart.find((product) => product.id === id);
  item.quantity += step;

  if (item.quantity < 1) {

    productIdToDelete = id;
    deleteAlert.classList.add("active");

    item.quantity = 1;
    return;
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((product) => product.id !== id);
  updateCart();
}

function renderCart() {
  // each cart item gets its full product data (name, price, image)
  const lines = cart
    .map((item) => ({ ...item, product: allProducts.find(({ id }) => id === item.id) }))
    .filter(({ product }) => product);

  cartItems.innerHTML = lines
    .map(
      ({ id, quantity, product }) => `
        <li class="cart-item" data-id="${id}">
          <img src="${product.image_1}" alt="${product.name}">
          <div class="info">
            <h4 class="name">${product.name}</h4>
            <p class="price">${formatPrice(product.price)}</p>
            <div class="qty">
              <button type="button" class="minus" aria-label="Decrease quantity">-</button>
              <span>${quantity}</span>
              <button type="button" class="plus" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="remove" aria-label="Remove"><i class="uil uil-times"></i></button>
        </li>
      `,
    )
    .join("");

  const total = lines.reduce((sum, { quantity, product }) => sum + product.price * quantity, 0);
  cartTotal.textContent = formatPrice(total);
  cateCounter.textContent = getQuantity();

  const isEmpty = lines.length === 0;
  cartTitle.hidden = !isEmpty;
  cartItems.hidden = isEmpty;
  cartFooter.hidden = isEmpty;
}

// one listener for + / - / remove, because the items are rebuilt on every change
cartItems.addEventListener("click", (e) => {
  const item = e.target.closest(".cart-item");
  if (!item) return;

  const id = Number(item.dataset.id);

  if (e.target.closest(".plus")) changeQuantity(id, 1);
  if (e.target.closest(".minus")) changeQuantity(id, -1);
  if (e.target.closest(".remove")) {
    productIdToDelete = id;
    deleteAlert.classList.add("active");
  }

  cancelDeleteBtn.addEventListener("click", () => {
    deleteAlert.classList.remove("active");
    productIdToDelete = null;
  });

  confirmDeleteBtn.addEventListener("click", () => {
    if (productIdToDelete === null) {
      return
    } else {
      removeFromCart(productIdToDelete);
      deleteAlert.classList.remove("active");
      productIdToDelete = null;
    }
  });
});
// end cart

function initSlider() {
  new Splide("#productes", {
    type: "loop",
    perPage: 4,
    perMove: 1,
    gap: "16px",
    pagination: false,
    arrows: true,

    breakpoints: {
      1100: { perPage: 3 },
      800: { perPage: 2 },
      520: { perPage: 1 },
    },
  }).mount();
}

loadProducts();
// end products

// start countdown
const DAYS = 30;
const STORAGE_KEY = "countdownEnd";

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function getEndTime() {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (saved) return saved;
  } catch (e) { }

  const end = Date.now() + DAYS * 24 * 60 * 60 * 1000;
  try {
    localStorage.setItem(STORAGE_KEY, String(end));
  } catch (e) { }
  return end;
}

const endTime = getEndTime();
let timer;

const pad = (n) => String(n).padStart(2, "0");

function update() {
  const diff = Math.max(0, endTime - Date.now());

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  if (diff === 0) clearInterval(timer);
}

update();
timer = setInterval(update, 1000);
// end countdown

// start collections
let collectionsSlider = new Splide("#collectionsSlider", {
  type: "loop",
  perPage: 1,
  interval: 3000,
});
collectionsSlider.mount();
// end collections

// start journal
let journalSlider = new Splide("#journal", {
  type: "loop",
  perPage: 3,
  perMove: 1,
  gap: "16px",
  pagination: false, // من غير بوليتس
  arrows: true,
  breakpoints: {
    800: { perPage: 2 },
    520: { perPage: 1 },
  },
});
journalSlider.mount();
// end journal

// start reviews
let reviewsSlider = new Splide("#reviewsSlider", {
  type: "loop",
  perPage: 1,
  interval: 4000,
});
reviewsSlider.mount();
// end reviews
// start footer
const footerSelects = document.querySelectorAll(".footer .select");

footerSelects.forEach((select) => {
  const current = select.querySelector(".current span");
  const options = select.querySelectorAll(".options span");

  select.querySelector(".current").addEventListener("click", () => {
    footerSelects.forEach((other) => {
      if (other !== select) other.classList.remove("open");
    });
    select.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      [current.textContent, option.textContent] = [
        option.textContent,
        current.textContent,
      ];
      select.classList.remove("open");
    });
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".footer .select")) {
    footerSelects.forEach((select) => select.classList.remove("open"));
  }
});
// end footer

// star top-scroll
// star top-scroll
let btnScroll = document.querySelector(".scrollTop");
window.onscroll = function () {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / scrollable) * 100;
  btnScroll.style.setProperty("--progress", progress);

  btnScroll.classList.toggle("show", window.scrollY >= 300);
};
btnScroll.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// end top-scroll