import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products = [], onViewProduct = () => {} }) {
  if (!products.length) return <p className="text-center text-secondary py-8">No motorcycles found.</p>
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <ProductCard
          key={p.id ?? `${p.brand}::${p.name}`}
          product={p}
          onView={() => onViewProduct(p)}
        />
      ))}
    </div>
  )
}
