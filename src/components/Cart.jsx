import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart({ open = false, onClose = () => {} }) {
  const { cart, remove, update, clear } = useCart()
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const onCheckout = () => {
    if (!cart.length) return alert('Cart is empty.')
    alert(`Order placed. Total: $${total.toFixed(2)}`)
    clear()
    onClose()
  }

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <button onClick={onClose} className="text-xl">×</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart.length === 0 && <p className="text-gray-500">Your cart is empty.</p>}
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-3 py-3 border-b">
            <img src={item.image} alt={item.name} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">${item.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded" onClick={() => update(item.id, Math.max(1, item.qty - 1))}>−</button>
              <div>{item.qty}</div>
              <button className="px-2 py-1 border rounded" onClick={() => update(item.id, item.qty + 1)}>+</button>
            </div>
            <button className="text-sm text-red-500 ml-2" onClick={() => remove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-600">Total</div>
          <div className="font-semibold">${total.toFixed(2)}</div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 border rounded px-3 py-2" onClick={() => { clear(); onClose() }}>Clear</button>
          <button className="flex-1 bg-blue-600 text-white rounded px-3 py-2" onClick={onCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  )
}
