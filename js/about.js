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

// start cart data
// the cart menu needs the product details (name, price, image) of what is in the cart
const PRODUCTS_URL = "./products.json";
let allProducts = [];

const formatPrice = (price) =>
    `${price.toLocaleString("en-US", { minimumFractionDigits: 2 })} $`;

async function loadProducts() {
    const response = await fetch(PRODUCTS_URL);
    allProducts = await response.json();
    renderCart();
}
// end cart data

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
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();



function addToCart(id) {
    const item = cart.find((product) => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, quantity: 1 });
    }

    updateCart();
    iconCm.click();
}

const getQuantity = () => cart.reduce((sum, { quantity }) => sum + quantity, 0);
cateCounter.textContent = getQuantity();

function removeFromCart(id) {
    cart = cart.filter((product) => product.id !== id);
    updateCart();
}
function updateCart() {
    saveCart();
    renderCart();
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

loadProducts();



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


// gallery: 3 photos at once, endless loop, scrolls with the mouse wheel or by dragging
new Splide("#aboutSlider", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "16px",
    arrows: false,
    pagination: false,
    wheel: true,
    breakpoints: {
        768: { perPage: 2 },
        576: { perPage: 1 },
    },
}).mount();
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