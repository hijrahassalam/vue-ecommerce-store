# Vue E-Commerce Store

**🌐 Live Store:** [vue-ecommerce-store-fe.netlify.app](https://vue-ecommerce-store-fe.netlify.app)

Modern e-commerce frontend built with **Vue 3**, **Tailwind CSS**, and **Pinia**.

---

## 🏗️ Architecture

```
vue-ecommerce-store (FE)          laravel-ecommerce-api (BE)
https://github.com/                 https://github.com/
  hijrahassalam/vue-ecommerce-store  hijrahassalam/laravel-ecommerce-api
       ↓                                    ↓
  Netlify (auto-deploy)             Railway (Docker + Neon PostgreSQL)
       ↓                                    ↓
  https://vue-ecommerce-store-fe.    https://laravel-ecommerce-api-production.
       netlify.app                        up.railway.app
       ↓                                    ↓
       └──────── HTTPS API ─────────────────┘
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
npm install
cp .env.example .env   # optional — defaults to production API
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔧 Tech Stack

![Vue](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

---

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── ProductCard.vue
├── views/              # Page components
│   ├── HomeView.vue
│   ├── ProductsView.vue
│   ├── ProductDetailView.vue
│   ├── CartView.vue
│   └── CheckoutView.vue
├── stores/             # Pinia state management
│   ├── products.js
│   └── cart.js
├── services/
│   └── api.js          # Axios client + interceptors
├── router/
│   └── index.js        # Vue Router config
├── App.vue
├── main.js
└── style.css           # Tailwind CSS + custom styles
```

---

## 🔌 API Endpoints (Backend)

Base URL: `https://laravel-ecommerce-api-production.up.railway.app/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | List products (paginated) |
| `GET` | `/products/{id}` | Product detail |
| `GET` | `/cart` | Get cart |
| `POST` | `/cart/items` | Add to cart |
| `PUT` | `/cart/items/{id}` | Update quantity |
| `DELETE` | `/cart/items/{id}` | Remove item |
| `POST` | `/checkout` | Create Stripe session |

---

## 📦 Features

- 🛒 Shopping cart with quantity management
- 🔍 Product listing with pagination
- 💳 Stripe checkout integration
- 🎨 Dark theme UI with glassmorphism
- ✨ Page transitions and micro-animations
- 📱 Fully responsive design
- 🔄 Real-time cart sync

---

## 🌙 Design System

- **Theme:** Dark (zinc-950 base `#09090b`)
- **Primary:** Indigo `#6366f1`
- **Accent:** Pink `#f472b6`
- **Font Display:** Space Grotesk
- **Font Body:** Inter

---

## 🔗 Related Projects

| Project | Description | Live |
|---|---|---|
| [laravel-ecommerce-api](https://github.com/hijrahassalam/laravel-ecommerce-api) | Backend REST API | [railway.app](https://laravel-ecommerce-api-production.up.railway.app/api/products) |
| [vue-ecommerce-store](https://github.com/hijrahassalam/vue-ecommerce-store) | Frontend SPA | [netlify.app](https://vue-ecommerce-store-fe.netlify.app) |

---

## 👤 Author

**Hijrah Assalam** — [hijrahassalam.com](https://hijrahassalam.com) · [GitHub](https://github.com/hijrahassalam)
