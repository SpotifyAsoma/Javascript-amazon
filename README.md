# 🛒 Amazon Clone — JavaScript Learning Project

> A pixel-faithful replica of the classic Amazon shopping experience, built from scratch. No frameworks, no libraries — just vanilla **JavaScript (ES6+), HTML & CSS**. Every line written by hand as a learning journey.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Jasmine](https://img.shields.io/badge/Tested%20with-Jasmine-8A4182?style=flat-square&logo=jasmine&logoColor=white)](https://jasmine.github.io/)
[![License](https://img.shields.io/badge/License-MIT-0a6643?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 🚀 Live Demo

**🌐 GitHub Pages:** <https://aidenpiearce.github.io/Javascript-amazon/>

> ⚠️ The Pages build is current only after the last commit — the site auto-deploys from `main` on every push.

Opening the site requires a local server because the product data is fetched over the network — open it directly (`file://`) and the fetch will fail.

**Quick start (VS Code):**

1. Install the [Live Server](https://marketplace.visualstudio.com/visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `amazon.html` → **"Open with Live Server"**
3. A browser tab opens at `http://127.0.0.1:5501/amazon.html` — start shopping 🛍️

> 💡 The repo already ships with a `.vscode/settings.json` that pins Live Server to port **5501**, so everyone on the project runs the same port.

**Or with any static server:**

```bash
npx serve .
# then open http://localhost:3000/amazon.html
```

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🗺️ Project Structure](#️-project-structure)
- [🧠 What I Learned](#-what-i-learned)
- [⚙️ How It Works](#️-how-it-works)
- [🧪 Tests](#-tests)
- [🪜 Roadmap](#-roadmap)
- [👤 Author](#-author)
- [📄 License](#-license)

---

## ✨ Features

### 🏠 Shop Page — `amazon.html`
- **42 products** rendered from live backend data (`supersimplebackend.dev`)
- Add to cart with quantity selector (1–10) and a green "Added ✓" flash feedback
- Cart quantity badge updates instantly in the header
- Product classes with **inheritance** — `Clothing` & `Digital` products render extra info
- Star-rating images generated dynamically by rating value

### 🛒 Checkout Page — `checkout.html`
- Line-by-line order summary: image, name, price × quantity, delivery date
- **Delivery options** (7-day free / 3-day / next-day) with real price math and radios
- Delete items — cart + payment summary update live
- Payment summary: subtotal, shipping, **total**, and a "Place your order" flow
- Responsive mobile layout

### 📦 Orders & Tracking — `orders.html` / `tracking.html`
- Each placed order gets a `crypto.randomUUID()` and persists to `localStorage`
- Order cards show: order date, total (product + delivery), order ID, delivery ETA
- **Track package** page reads `?orderId=` from the URL with `URLSearchParams`
- Progress bar with *Preparing → Shipped → Delivered* status

### 🧱 Architecture
- **ES Modules** (`import` / `export`) split across `data/`, `scripts/`, `styles/`
- `localStorage` cart persistence across all pages
- `fetch()` + **Promise.all** parallel loading; `XMLHttpRequest` version included
- OOP: `Product` → `Clothing` / `Digital` inheritance, `Cart` class + private fields (`#localStorageKey`)
- Styled component approach — every reusable piece (header, buttons, product cards) is its own CSS block

---

## 🗺️ Project Structure

```text
javascript-amazon-project/
├── amazon.html            # 🏠 Shop (products grid)
├── checkout.html          # 🛒 Cart + payment summary
├── orders.html            # 📦 Your orders
├── tracking.html          # 🚚 Package tracking (reads ?orderId=)
│
├── backend/
│   └── products.json      # Local product catalog (42 items)
├── data/
│   ├── cart.js            # Cart state + localStorage
│   ├── products.js        # Product classes + live fetch (loadProductsFetch / loadProducts)
│   ├── deliveryOptions.js # Shipping speeds & prices
│   ├── orders.js          # Order helpers
│   ├── cart-oop.js        # 🧪 Practice: Cart via constructor function
│   ├── cart-class.js      # 🧪 Practice: Cart via class + private field
│   ├── backend-practice.js # 🧪 Practice: raw XHR (unused, learning artifact)
│
├── scripts/
│   ├── amazon.js          # Shop page controller
│   ├── checkout.js        # Boots checkout (Promise.all)
│   ├── orders.js          # Order rendering + localStorage writes
│   ├── tracking.js        # Tracking page controller
│   ├── Checkout/
│   │   ├── checkoutHeader.js
│   │   ├── orderSummary.js
│   │   └── paymentSummary.js
│   └── utils/
│       └── money.js       # formatCurency + multiProductDeliverySum
│
├── styles/
│   ├── shared/            # general.css, amazon-header.css
│   └── pages/             # amazon.css, checkout/, orders.css, tracking.css
│
├── tests/
│   ├── tests.html         # Jasmine runner (open in browser to run)
│   ├── tests-simple/      # No-framework console tests
│   └── data/, checkout/, utils/  # Jasmine specs
│
└── images/                # Logos, icons, product photos
```

---

## 🧠 What I Learned

This project is my JavaScript **resume-in-code** — each folder-level file represents a skill I practiced:

| Skill | Where |
|---|---|
| ES6+ modules, imports/exports | everywhere — `data/` ⇄ `scripts/` |
| Async JS: `fetch`, Promises, `Promise.all` | `checkout.js`, `orders.js`, `products.js` |
| Callbacks & `XMLHttpRequest` | `loadProducts()` in `products.js` |
| Async/await + `try/catch/throw` | commented evolution in `checkout.js` |
| OOP: classes, inheritance, private fields | `Product`/`Clothing`/`Digital`, `Cart` class |
| URL params | `URLSearchParams` in `tracking.js` |
| Browser storage | `localStorage` for cart + orders |
| The DOM: events, rendering, dataset | all page controllers |
| Unit testing | Jasmine specs in `tests/` |
| Responsive CSS | mobile layouts on every page |
| Git workflow | incremental feature commits (see log) |

> 🎯 **Learning philosophy:** I never delete the old version of a pattern when I learn a better one — the older approach is commented out right above the new one (`checkout.js` keeps the callback → Promise → async/await evolution). Scroll through and you can literally watch me level up.

---

## ⚙️ How It Works

### Data flow (simplified)

```text
supersimplebackend.dev/products   (or backend/products.json)
        │  fetch() / XHR
        ▼
data/products.js  →  Product / Clothing / Digital instances
        │
        ▼
scripts/amazon.js  →  renders .js-products-grid
        │  click "Add to Cart"
        ▼
data/cart.js  →  localStorage["cart"]  →  header badge (.js-cart-quantity)
```

### Order → tracking flow

```text
checkout (place order)
   → orders.js creates order {orderId: crypto.randomUUID(), ...}
   → saves to localStorage["order-<uuid>"]
   → link: tracking.html?orderId=<uuid>
   → tracking.js parses ?orderId= via URLSearchParams → renders progress bar
```

### Key snippet — class inheritance

```js
class Product { getPrice() { ... } getStarsUrl() { ... } }

class Clothing extends Product {
  extraInfoHTML() {
    return `
      <p class="product-info">Size: ${this.size}</p>
      <p class="product-info">Material: ${this.material}</p>`;
  }
}
```

Favorite commit message: 🏆 **"activated the add order button and create orders to backend"**

---

## 🧪 Tests

Two flavors:

1. **Jasmine suite** — open `tests/tests.html` in a browser (Live Server works)
   - `tests/data/cartTest.js`
   - `tests/data/productsTests.js`
   - `tests/checkout/orderSummaryTest.js`
   - `tests/utils/moneyTest.js`

2. **No-framework console tests** — `tests/tests-simple/test.html`

```bash
# if you prefer running JS tests in Node for money utils:
node -e "import('./tests/utils/moneyTest.js')"
```

---

## 🪜 Roadmap

- [x] Products grid from backend + add to cart
- [x] Checkout with delivery options & payment summary
- [x] Orders page + tracking with URL params
- [ ] Search bar functionality (currently static UI)
- [ ] Real "Buy it again" — re-adds order to cart
- [ ] Deploy to GitHub Pages / Vercel
- [ ] Migrate products fully to local `backend/products.json`

---

## 👤 Author

Built by **Aiden** — electrical engineering student teaching himself JavaScript by cloning the apps he uses every day.

- 💻 [GitHub](https://github.com/) · 📧 aidenspotify0000@gmail.com

---

## 📄 License

[MIT](LICENSE) — free to learn from, fork, and remix.

<sub>Amazon is a trademark of Amazon.com, Inc. This is an educational clone for learning purposes only, not affiliated with or endorsed by Amazon.</sub>
