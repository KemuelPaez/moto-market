import React from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()

  const onAdd = () => add({ id: product.id, name: product.name, price: product.price, image: product.image })
  const onBuy = () => {
    onAdd()
    setTimeout(() => {
      alert(`Purchased ${product.name}. Thank you!`)
    }, 50)
  }

  return (
    <article className="bg-white rounded-lg overflow-hidden card-shadow flex flex-col">
      <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-blue-600 font-semibold">${product.price.toLocaleString()}</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm" onClick={onAdd}>Add</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm" onClick={onBuy}>Buy</button>
          </div>
        </div>
      </div>
    </article>
  )
}
