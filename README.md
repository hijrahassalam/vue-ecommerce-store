# Vue E-Commerce Store

**🛒 Live Store:** [vue-ecommerce-store-fe.netlify.app](https://vue-ecommerce-store-fe.netlify.app)

**🔗 API Backend:** [laravel-ecommerce-api-production.up.railway.app](https://laravel-ecommerce-api-production.up.railway.app/api/products)

Modern e-commerce frontend — Vue 3 · Tailwind CSS · Pinia · Vite · Netlify auto-deploy

---

## 🏗️ Architecture

```
vue-ecommerce-store (FE)            laravel-ecommerce-api (BE)
https://github.com/                   https://github.com/
  hijrahassalam/vue-ecommerce-store   hijrahassalam/laravel-ecommerce-api
       ↓                                      ↓
  Netlify (auto-deploy)                Railway (Docker + Neon PostgreSQL)
       ↓                                      ↓
  https://vue-ecommerce-store-fe.       https://laravel-ecommerce-api-production.
       netlify.app                            up.railway.app
       ↓                                      ↓
       └────────── HTTPS API ─────────────────┘
```

| Layer | Tech | Host |
|---|---|---|
| **Frontend** | Vue 3 + Tailwind CSS | [Netlify](https://vue-ecommerce-store-fe.netlify.app) |
| **API** | Laravel 13 REST | [Railway](https://laravel-ecommerce-api-production.up.railway.app/api/products) |
| **Database** | PostgreSQL | [Neon](https://neon.tech) |
| **Payments** | Stripe | Ready (keys via env) |

---

## 🚀 Quick Start

```bash
git clone https://github.com/hijrahassalam/vue-ecommerce-store.git
cd vue-ecommerce-store
pnpm install
cp .env.example .env   # optional — defaults to production API
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔧 Tech Stack

![Vue](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AppHeader.vue      # Logo, nav, cart badge
│   ├── AppFooter.vue
│   └── ProductCard.vue    # Hover effects + add-to-cart
├── views/
│   ├── HomeView.vue
│   ├── ProductsView.vue   # Search + pagination
│   ├── ProductDetailView.vue
│   ├── CartView.vue
│   ├── CheckoutView.vue   # Stripe redirect
│   └── OrderSuccessView.vue
├── stores/
│   ├── products.js        # fetchProducts + search + pagination
│   └── cart.js            # localStorage persistence
├── services/
│   └── api.js             # Axios + base URL config
├── router/
│   └── index.js           # Routes + navigation guards
└── main.js
```

---

## ✨ Features

- Product catalog with search & pagination
- Persistent cart (localStorage)
- Stripe checkout flow
- Order confirmation
- Dark theme UI
- Mobile responsive
- API fallback to production backend

---

## 🔑 API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List products (search, pagination) |
| GET | `/api/products/:id` | Single product |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Get order status |
| POST | `/api/checkout` | Stripe payment intent |
