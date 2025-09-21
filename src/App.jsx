import React, { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import productsData from './data/products'
import './index.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('All')
  const [viewCart, setViewCart] = useState(false)

  const brands = ['All', ...Array.from(new Set(productsData.map(p => p.brand)))]

  const filtered = productsData.filter(p => {
    const matchBrand = brand === 'All' || p.brand === brand
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
    return matchBrand && matchQuery
  })

  return (
    <div className="app">
      <Header
        brands={brands}
        brand={brand}
        onBrand={setBrand}
        query={query}
        onQuery={setQuery}
        onToggleCart={() => setViewCart(v => !v)}
      />
      <main className="container">
        <h2 className="section-title">Featured Motorcycles</h2>
        <ProductList products={filtered} />
      </main>
      <Cart open={viewCart} onClose={() => setViewCart(false)} />
    </div>
  )
}
