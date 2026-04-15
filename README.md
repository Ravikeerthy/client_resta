# Keerthy's Kitchen Frontend

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Material UI](https://img.shields.io/badge/MUI-UI-blue)
![Stripe](https://img.shields.io/badge/Stripe-Payments-indigo)

## Overview

Keerthy's Kitchen frontend is a modern restaurant web application built with React, Vite, and Material UI. It supports customer ordering, waiter POS operations, kitchen workflow, admin pages, and Stripe payment integration.

## Live Demo

Add your deployed frontend URL here.

```text
https://keerthyrestaurantportfolio.netlify.app/
```

## Screenshots

Add screenshots here after upload.

```text
/screenshots/homepage.png
/screenshots/menu.png
/screenshots/pos.png
/screenshots/admin-dashboard.png
/screenshots/kitchen.png
```

## Features

| Module | Features |
|---|---|
| Customer | Home page, menu, checkout, orders, login, register |
| Waiter | POS, create orders, manage payments |
| Kitchen | View active orders, preparing, served |
| Admin | Dashboard, orders, menu, tables, staff |
| Payments | Stripe online/card flow |

## Tech Stack

- React
- Vite
- Material UI
- React Router DOM
- Axios
- Formik
- Yup
- Stripe React SDK

## Project Structure

```text
src/
  api/
  components/
    common/
    layout/
    menu/
    payment/
    pos/
  context/
  pages/
    admin/
    auth/
    customer/
    kitchen/
    pos/
  routes/
  App.jsx
  main.jsx
```

## Environment Variables

Create a `.env` file in the frontend root.

```env
VITE_API_URL=https://your-backend-domain/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

### Netlify
Use these settings if the app is inside `client_resta`:

```text
Base directory: client_resta
Build command: npm run build
Publish directory: dist
Functions directory: [leave empty]
```

Add these environment variables in Netlify:
- `VITE_API_URL`
- `VITE_STRIPE_PUBLISHABLE_KEY`

## API Setup

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## Routes

### Public
- `/`
- `/menu`
- `/login`
- `/register`

### Protected / Role-Based
- `/checkout`
- `/orders`
- `/pos`
- `/admin`
- `/admin/orders`
- `/admin/tables`
- `/admin/menu`
- `/admin/staff`
- `/kitchen`

## Roles

- `customer`
- `waiter`
- `kitchen`
- `admin`


