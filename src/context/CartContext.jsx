import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()
const STORAGE_KEY = 'moto_store_cart_v1'

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.payload || []
    case 'add': {
      const idx = state.findIndex(i => i.id === action.payload.id)
      if (idx >= 0) {
        const next = [...state]
        next[idx].qty += action.payload.qty || 1
        return next
      }
      return [...state, { ...action.payload, qty: action.payload.qty || 1 }]
    }
    case 'remove':
      return state.filter(i => i.id !== action.payload)
    case 'update':
      return state.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'hydrate', payload: JSON.parse(raw) })
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {}
  }, [cart])

  const add = item => dispatch({ type: 'add', payload: item })
  const remove = id => dispatch({ type: 'remove', payload: id })
  const update = (id, qty) => dispatch({ type: 'update', payload: { id, qty } })
  const clear = () => dispatch({ type: 'clear' })

  return (
    <CartContext.Provider value={{ cart, add, remove, update, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
