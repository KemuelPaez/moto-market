import React from 'react'
import { useCart } from '../context/CartContext'

export default function Header({ brands = [], brand, onBrand, query, onQuery, onToggleCart }) {
  const { cart } = useCart()
  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Moto Store</h1>
          <p className="text-sm text-gray-500">Find your next ride</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search motorcycles..."
            value={query}
            onChange={e => onQuery(e.target.value)}
          />
          <select
            className="border rounded-md px-3 py-2 bg-white"
            value={brand}
            onChange={e => onBrand(e.target.value)}
          >
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <button
            className="bg-blue-600 text-white px-3 py-2 rounded-md"
            onClick={onToggleCart}
          >
            Cart ({totalQty})
          </button>
        </div>
      </div>
    </header>
  )
}
