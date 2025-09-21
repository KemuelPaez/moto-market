import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // ensures ./App.jsx is resolved
import { CartProvider } from './context/CartContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)
