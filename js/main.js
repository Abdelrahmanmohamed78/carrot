// Handle Loading

let loading = document.querySelector(".loading");
document.body.classList.add("close");

setTimeout(() => {
  loading.classList.add("close");
  document.body.classList.remove("close");
}, 5000);

// Handle ScrollTop Button

let scrollTop = document.querySelector(".scrollTop");

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
})

window.addEventListener("scroll", () => {
  if(window.scrollY >= 300) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
})

// Handle Aside show & close

let bars = document.querySelector(".bars");
let aside = document.querySelector("aside");
let closeAside = document.querySelector("aside .aside-header");
let links = document.querySelectorAll("aside .links li a");
let overlay = document.querySelector(".overlay");

bars.addEventListener("click", () => {
  aside.classList.add("show");
  overlay.classList.add("show");
  document.body.classList.add("close");
})

closeAside.addEventListener("click", () => {
  aside.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("close");
  links.forEach((link) => {
      if(link.classList.contains("expanded")) {
        link.classList.remove("expanded");
        link.nextElementSibling.style.maxHeight = "0px";
      }
  })
})

// Handle Aside Links

links.forEach((link) => {
  link.addEventListener("click", () => {
    if(link.classList.contains("expanded")) {
      link.classList.remove("expanded");
      link.nextElementSibling.style.maxHeight = "0px";
    } else {
      link.classList.add("expanded");
      link.nextElementSibling.style.maxHeight = `${link.nextElementSibling.scrollHeight}px`;
    }
  })
})

// Handle Gear Setting

let gear = document.querySelector(".setting-gear");
let settingBox = document.querySelector(".settings");
let closeSettingBox = document.querySelector(".settings-header i");
let settingthemeColors = document.querySelectorAll(".settings .settings-theme ul li");

gear.addEventListener("click", () => {
  settingBox.classList.add("show");
  overlay.classList.add("show");
  document.body.classList.add("close");
})

closeSettingBox.addEventListener("click", () => {
  settingBox.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("close");
})

// Handle Overlay

overlay.addEventListener("click", () => {
  aside.classList.remove("show");
  overlay.classList.remove("show");
  document.body.classList.remove("close");
  settingBox.classList.remove("show");
  links.forEach((link) => {
    if(link.classList.contains("expanded")) {
      link.classList.remove("expanded");
      link.nextElementSibling.style.maxHeight = "0px";
    }
  })
})

// Handle Local Storage

let logoSrc = document.querySelectorAll("a.main-logo img");
let eventTime = document.querySelector(".event-time .container .box");

if(window.localStorage.getItem("background-theme")) {
  document.documentElement.style.setProperty("--bg-body", window.localStorage.getItem("background-theme"));
  settingthemeColors.forEach(li => {
    li.classList.remove("selected");
  })
  if(window.localStorage.getItem("background-theme") === "#000") {
    eventTime.classList.add("dark");
  } else {
    eventTime.classList.remove("dark");
  }
  document.querySelector(`[data-color="${window.localStorage.getItem("background-theme")}"]`).classList.add("selected");
  logoSrc.forEach(img => {
    img.setAttribute("src", window.localStorage.getItem("logo-src"));
  });
}

if(window.localStorage.getItem("background-text")) {
  document.documentElement.style.setProperty("--color", window.localStorage.getItem("background-text"));
}

if(window.localStorage.getItem("background-menu")) {
  document.documentElement.style.setProperty("--bg-menu", window.localStorage.getItem("background-menu"));
}

if(window.localStorage.getItem("border-color")) {
  document.documentElement.style.setProperty("--border", window.localStorage.getItem("border-color"));
}

if(window.localStorage.getItem("gray-color")) {
  document.documentElement.style.setProperty("--gray-color", window.localStorage.getItem("gray-color"));
}

// Handle Setting Theme

settingthemeColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    settingthemeColors.forEach((li) => {
      li.classList.remove("selected");
    });
    e.currentTarget.classList.add("selected");
    document.documentElement.style.setProperty("--bg-body", e.currentTarget.dataset.color);
    window.localStorage.setItem("background-theme", e.currentTarget.dataset.color);
    if(window.localStorage.getItem("background-theme") === "#000") {
      window.localStorage.setItem("logo-src", "images/dark-logo.png");
      logoSrc.forEach(img => {
        img.setAttribute("src", window.localStorage.getItem("logo-src"));
      });
      eventTime.classList.add("dark");
    } else {
      window.localStorage.setItem("logo-src", "images/logo.png");
      logoSrc.forEach(img => {
        img.setAttribute("src", window.localStorage.getItem("logo-src"));
      });
      eventTime.classList.remove("dark");
    }
    document.documentElement.style.setProperty("--color", e.currentTarget.dataset.text);
    window.localStorage.setItem("background-text", e.currentTarget.dataset.text);
    document.documentElement.style.setProperty("--bg-menu", e.currentTarget.dataset.menu);
    window.localStorage.setItem("background-menu", e.currentTarget.dataset.menu);
    document.documentElement.style.setProperty("--border", e.currentTarget.dataset.border);
    window.localStorage.setItem("border-color", e.currentTarget.dataset.border);
    document.documentElement.style.setProperty("--gray-color", e.currentTarget.dataset.graycolor);
    window.localStorage.setItem("gray-color", e.currentTarget.dataset.graycolor);
  })
})

// Handle Main Color Theme

let settingColors = document.querySelectorAll(".settings .settings-color ul li");

if (window.localStorage.getItem("main-text-color")) {
  settingColors.forEach(li => {
    li.classList.remove("selected");
  });
  document.querySelector(`[data-main="${window.localStorage.getItem("main-text-color")}"]`).classList.add("selected");
  document.documentElement.style.setProperty("--Primary-color", window.localStorage.getItem("main-text-color"));
}

settingColors.forEach(li => {
  li.addEventListener("click", (e) => {
    settingColors.forEach(li => {
      li.classList.remove("selected");
    })
    e.currentTarget.classList.add("selected");
    document.documentElement.style.setProperty("--Primary-color", e.currentTarget.dataset.main);
    window.localStorage.setItem("main-text-color", e.currentTarget.dataset.main);
  })
})

// Handle Landing Swiper

const swiper = new Swiper('.landing .swiper', {
  loop: true,
  speed: 2200,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 30,
  effect: "cobe",
  grabCursor: true,
});

// Handle Filter

let filterLinks = document.querySelectorAll(".main-product-boxes .container ul.filter li");
let products = document.querySelectorAll(".main-product-boxes .container .product-filter");

filterLinks.forEach((li) => {
  li.addEventListener("click", (e) => {
    filterLinks.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    products.forEach(product => {
      product.classList.add("hide");
    })
    products.forEach(product => {
      if(product.classList.contains(e.currentTarget.dataset.filter)) {
        product.classList.remove("hide");
      }
    })
  })
})

// Handle wishlist & Cart

let wishlist = document.querySelectorAll(".main-product-boxes .container .card.main-card .image i.fa-heart");
let cart = document.querySelectorAll(".main-product-boxes .container .card.main-card .image i.fa-lock");
let Alert = document.querySelector(".main-product-boxes .alert");
let productsInsideWishlist = [];
let productsInsideCart = [];
let accountsBtn = document.querySelector("header .header-search .accounts-info > a:nth-of-type(1)");
let wishlistBtn = document.querySelector("header .header-search .accounts-info > a:nth-of-type(2)");
let cartBtn = document.querySelector("header .header-search .accounts-info > a:nth-of-type(3)");
let wishlistPage = document.querySelector(".wishlist-page");
let cartPage = document.querySelector(".cart-page");
let accountsPage = document.querySelector(".accounts-page");
let closeBtn = document.querySelector(".wishlist-page .main-page .close");
let cartCloseBtn = document.querySelector(".cart-page .main-page .close");
let accountsCloseBtn = document.querySelector(".accounts-page .main-page .close");
let wishlistMainPage = document.querySelector(".wishlist-page .main-page");
let allProducts = document.querySelector(".wishlist-page .main-page .all-products");
let allCartProducts = document.querySelector(".cart-page .main-page .all-products");
let mainProducts = document.createElement("div");
let mainCartProducts = document.createElement("div");
mainProducts.classList.add("main-products");
mainCartProducts.classList.add("main-products");
allProducts.appendChild(mainProducts);
allCartProducts.appendChild(mainCartProducts);

closeBtn.addEventListener("click", () => {
  wishlistPage.classList.remove("show");
  document.body.classList.remove("close");
})

cartCloseBtn.addEventListener("click", () => {
  cartPage.classList.remove("show");
  document.body.classList.remove("close");
})

accountsCloseBtn.addEventListener("click", () => {
  accountsPage.classList.remove("show");
  document.body.classList.remove("close");
})

function createEmptyText(type, place) {
  let emptyList = document.createElement("h4");
  emptyList.textContent = `Empty ${type}, Please Try To Select Products...`;
  place.appendChild(emptyList);
}

function showCartItems() {
  if(productsInsideCart.length === 0) {
    mainCartProducts.classList.remove("show");
    if(mainCartProducts.hasChildNodes()) { 
      mainCartProducts.childNodes.forEach(item => {
        item.remove();
      });
      createEmptyText("Cart", mainCartProducts);
    } else {
      createEmptyText("Cart", mainCartProducts);
    }
  } else {
    mainCartProducts.classList.add("show");
    if(mainCartProducts.hasChildNodes()) {
      mainCartProducts.childNodes.forEach(item => {
        item.remove();
      })
      showCartItems();
    } else {
      createCartBoxes();
    }
  }
}

function showProductItems() {
  if(productsInsideWishlist.length === 0) {
    mainProducts.classList.remove("show");
    if(mainProducts.hasChildNodes()) { 
      mainProducts.childNodes.forEach(item => {
        item.remove();
      });
      createEmptyText("WishList", mainProducts);
    } else {
      createEmptyText("WishList", mainProducts);
    }
  } else {
    mainProducts.classList.add("show");
    if(mainProducts.hasChildNodes()) {
      mainProducts.childNodes.forEach(item => {
        item.remove();
      })
      showProductItems();
    } else {
      createBoxes();
    }
  }
}

function createBoxes () {
  productsInsideWishlist.forEach(item => {
    let itemBox = document.createElement("div");
    itemBox.id = item.id;
    let imageBox = document.createElement("div");
    let imageElement = document.createElement("img");
    let infoBox = document.createElement("div");
    let descriptionBox = document.createElement("div");
    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(item.description);
    let priceBox = document.createElement("p");
    let span = document.createElement("span");
    let del = document.createElement("del");
    let removeBtn = document.createElement("button");
    itemBox.classList.add("box");
    imageBox.classList.add("image");
    infoBox.classList.add("info");
    priceBox.classList.add("price");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Cancel";
    span.textContent = item.price[0];
    del.textContent = item.price[1];
    priceBox.appendChild(span);
    priceBox.appendChild(del);
    h4.appendChild(h4Text);
    descriptionBox.appendChild(h4);
    imageElement.src = item.image;
    imageBox.appendChild(imageElement);
    infoBox.appendChild(descriptionBox);
    infoBox.appendChild(priceBox);
    infoBox.appendChild(removeBtn);
    itemBox.appendChild(imageBox);
    itemBox.appendChild(infoBox);
    mainProducts.appendChild(itemBox);
  });
  let allProductButtons = document.querySelectorAll(".wishlist-page .main-page .all-products .main-products .box .info button");
  allProductButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      wishlist.forEach((heart, i) => {
        if(i === +btn.parentElement.parentElement.getAttribute("id")) {
          heart.classList.remove("active");
        }
      })
      productsInsideWishlist = productsInsideWishlist.filter(item => {
        return item.id !== +btn.parentElement.parentElement.getAttribute("id");
      })
      showProductItems();
    })
  });
}

function createCartBoxes() {
  productsInsideCart.forEach(item => {
    let itemBox = document.createElement("div");
    itemBox.id = item.id;
    let imageBox = document.createElement("div");
    let imageElement = document.createElement("img");
    let infoBox = document.createElement("div");
    let descriptionBox = document.createElement("div");
    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(item.description);
    let priceBox = document.createElement("p");
    let span = document.createElement("span");
    let del = document.createElement("del");
    let removeBtn = document.createElement("button");
    itemBox.classList.add("box");
    imageBox.classList.add("image");
    infoBox.classList.add("info");
    priceBox.classList.add("price");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "Cancel";
    span.textContent = item.price[0];
    del.textContent = item.price[1];
    priceBox.appendChild(span);
    priceBox.appendChild(del);
    h4.appendChild(h4Text);
    descriptionBox.appendChild(h4);
    imageElement.src = item.image;
    imageBox.appendChild(imageElement);
    infoBox.appendChild(descriptionBox);
    infoBox.appendChild(priceBox);
    infoBox.appendChild(removeBtn);
    itemBox.appendChild(imageBox);
    itemBox.appendChild(infoBox);
    mainCartProducts.appendChild(itemBox);
  });
  let allProductButtons = document.querySelectorAll(".cart-page .main-page .all-products .main-products .box .info button");
  allProductButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      cart.forEach((cart, i) => {
        if(i === +btn.parentElement.parentElement.getAttribute("id")) {
          cart.classList.remove("active");
        }
      })
      productsInsideCart = productsInsideCart.filter(item => {
        return item.id !== +btn.parentElement.parentElement.getAttribute("id");
      })
      showCartItems();
    })
  });
}

wishlistBtn.addEventListener("click", () => {
  wishlistPage.classList.add("show");
  document.body.classList.add("close");
  showProductItems();
})

cartBtn.addEventListener("click", () => {
  cartPage.classList.add("show");
  document.body.classList.add("close");
  showCartItems();
})

accountsBtn.addEventListener("click", () => {
  accountsPage.classList.add("show");
  document.body.classList.add("close");
})

function handleAlertShow(item, position) {
  item.innerHTML = `Added To <span>${position}</span> Successfully`;
  item.classList.add("open");
  setTimeout(() => {
    item.classList.remove("open");
  }, 3000);
}

function handleAlertHide(item, position) {
  item.innerHTML = `Removed From <span>${position}</span> Successfully`;
  item.classList.add("open");
  setTimeout(() => {
    item.classList.remove("open");
  }, 3000);
}

wishlist.forEach((heart, i) => {
  heart.parentElement.parentElement.id = i;
  heart.addEventListener("click", (e) => {
    if(e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.remove("active");
      productsInsideWishlist = productsInsideWishlist.filter(item => {
        return item.id !== i;
      })
      showProductItems();
      handleAlertHide(Alert, "Wishlist");
    } else {
      e.currentTarget.classList.add("active");
      handleAlertShow(Alert, "Wishlist");
      let item = {
        id: i,
        image: heart.parentElement.parentElement.children[0].children[1].getAttribute("src"),
        caregory: heart.parentElement.parentElement.children[1].children[0].innerHTML,
        description: heart.parentElement.parentElement.children[1].children[2].textContent,
        price: [
          heart.parentElement.parentElement.children[1].children[3].children[0].textContent,
          heart.parentElement.parentElement.children[1].children[3].children[1].textContent
        ],
      };
      productsInsideWishlist.push(item);
      showProductItems();
    }
  })
});

cart.forEach((cart, i) => {
  cart.parentElement.parentElement.id = i;
  cart.addEventListener("click", (e) => {
    if(e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.remove("active");
      handleAlertHide(Alert, "Cart");
      productsInsideCart = productsInsideCart.filter(item => {
        return item.id !== +i;
      })
    } else {
      e.currentTarget.classList.add("active");
      handleAlertShow(Alert, "Cart");
      let item = {
        id: i,
        image: cart.parentElement.parentElement.children[0].children[1].getAttribute("src"),
        caregory: cart.parentElement.parentElement.children[1].children[0].innerHTML,
        description: cart.parentElement.parentElement.children[1].children[2].textContent,
        price: [
          cart.parentElement.parentElement.children[1].children[3].children[0].textContent,
          cart.parentElement.parentElement.children[1].children[3].children[1].textContent
        ],
      };
      productsInsideCart.push(item);
      showCartItems();
    }
  })
})

// Handle Event Time

setInterval(() => {
  let days = document.querySelector(".event-time .container .box .time .days-time .days");
  let hours = document.querySelector(".event-time .container .box .time .hours-time .hours");
  let minutes = document.querySelector(".event-time .container .box .time .minutes-time .minutes");
  let seconds = document.querySelector(".event-time .container .box .time .seconds-time .seconds");
  let nowDate = new Date(Date.now());
  let futureDate = new Date('1/1/2025');
  let eventDate = new Date(futureDate.getTime() - nowDate.getTime());
  days.textContent = +eventDate.getMonth() * 30 < 10 ? `0${+eventDate.getMonth() * 30 + eventDate.getDate()}` : +eventDate.getMonth() * 30 + eventDate.getDate();
  hours.textContent = +eventDate.getHours() < 10 ? `0${+eventDate.getHours()}` : +eventDate.getHours();
  minutes.textContent = +eventDate.getMinutes() < 10 ? `0${+eventDate.getMinutes()}` : +eventDate.getMinutes();
  seconds.textContent = +eventDate.getSeconds() < 10 ? `0${+eventDate.getSeconds()}` : +eventDate.getSeconds();
}, 1000);

// Handle Review Swiper

const swiper2 = new Swiper('.review .swiper2', {
  loop: true,
  speed: 1200,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    }
  },
  autoplay: {
    delay: 5000,
  },
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 15,
  effect: "cobe",
  grabCursor: true,
});

// Handle Words Swiper

const swiper3 = new Swiper('.words .swiper3', {
  loop: true,
  speed: 1200,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
  },
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 30,
  effect: "cobe",
  grabCursor: true,
});

// Handle News Swiper

const swiper4 = new Swiper('.news .swiper4', {
  loop: true,
  speed: 1200,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    767: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 4000,
  },
  mousewheel: {
    forceToAxis: true,
  },
  spaceBetween: 30,
  effect: "cobe",
  grabCursor: true,
});