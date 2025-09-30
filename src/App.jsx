import React, { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import LogoFeature from './components/LogoFeature'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Footer from './components/Footer'
import productsData from './data/products'
import './index.css'

export default function App() {
	const [query, setQuery] = useState('')
	const [brand, setBrand] = useState('All')
	const [viewCart, setViewCart] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	const [cart, setCart] = useState([])

	const getKey = product => (product?.id ?? `${product?.brand}::${product?.name}`)

	const addToCart = product => {
		if (!product) return
		setCart(prev => {
			const copy = prev.slice()
			const key = getKey(product)
			const idx = copy.findIndex(i => getKey(i) === key)
			if (idx >= 0) {
				const item = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 }
				copy[idx] = item
			} else {
				copy.push({ ...product, qty: 1 })
			}
			return copy
		})
	}

	// remove item by id or product object
	const removeFromCart = identifier => {
		setCart(prev =>
			prev.filter(i => {
				const k = getKey(i)
				if (typeof identifier === 'string') return k !== identifier
				return k !== getKey(identifier)
			})
		)
	}

	// update quantity (if qty <= 0 remove)
	const updateCartQty = (identifier, qty) => {
		setCart(prev =>
			prev
				.map(i => {
					const k = getKey(i)
					const match = typeof identifier === 'string' ? k === identifier : k === getKey(identifier)
					if (!match) return i
					return { ...i, qty: qty }
				})
				.filter(i => (i.qty ?? 0) > 0)
		)
	}

	// buy now => add to cart and open cart
	const buyNow = product => {
		addToCart(product)
		setViewCart(true)
	}

	const handleCheckout = () => {
		if (!cart || cart.length === 0) {
			// nothing to checkout — just close
			setViewCart(false)
			return
		}
		// simulate checkout
		const orderSummary = cart.map(i => `${i.name} x${i.qty || 1}`).join('\n')
		// simple confirmation (replace with real flow later)
		window.alert(`Order placed:\n\n${orderSummary}\n\nThank you!`)
		// clear cart and close cart panel
		setCart([])
		setViewCart(false)
	}

	const brands = ['All', ...Array.from(new Set(productsData.map(p => p.brand)))]

	// compute top brands by frequency
	const brandCounts = productsData.reduce((acc, p) => {
		acc[p.brand] = (acc[p.brand] || 0) + 1
		return acc
	}, {})
	const topBrands = Object.entries(brandCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([name]) => name)

	const filtered = (() => {
		const match = productsData.filter(p => {
			const matchBrand = brand === 'All' || p.brand === brand
			const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
			return matchBrand && matchQuery
		})
		const seen = new Set()
		return match.filter(p => {
			const key = p.id ?? `${p.brand}::${p.name}`
			if (seen.has(key)) return false
			seen.add(key)
			return true
		})
	})()

	// compute cart item count (sum of quantities)
	const cartCount = cart.reduce((s, it) => s + (it.qty || 0), 0)

	return (
		<div
			className="app-root"
			style={{
				width: '100%',
				boxSizing: 'border-box'
			}}
		>
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					// padding: '',
					boxSizing: 'border-box',
					background: '#94a3b8 ',
				}}
			>
				{/* pass cartCount so header badge updates */}
				<Header
					brands={brands}
					brand={brand}
					onBrand={setBrand}
					query={query}
					onQuery={setQuery}
					onToggleCart={() => setViewCart(v => !v)}
					cartCount={cartCount}
				/>
			</div>

			<div
				style={{
					maxWidth: 1600,
					width: '100%',
					margin: '24px auto',
					padding: '0 16px',
					boxSizing: 'border-box'
				}}
			>

				<Banner brands={topBrands} />

				<LogoFeature
					brands={brands.filter(b => b !== 'All')}
					active={brand}
					onSelect={b => setBrand(prev => (prev === b ? 'All' : b))}
				/>

				<main className="container">
					<h2
						className="section-title"
						style={{
							marginBottom: 16,
							fontSize: 24,
							fontWeight: '600',
							color: '#333'
						}}
					>
						Featured Motorcycles
					</h2>
					<ProductList
						products={filtered}
						onViewProduct={setSelectedProduct}
					/>
				</main>
			</div>

			<Cart
				open={viewCart}
				onClose={() => setViewCart(false)}
				items={cart}
				onRemoveItem={removeFromCart}
				onUpdateQty={updateCartQty}
				onCheckout={handleCheckout}
			/>

			<ProductDetails
				product={selectedProduct}
				onClose={() => setSelectedProduct(null)}
				onAdd={p => {
					addToCart(p)
				}}
				onBuy={p => {
					addToCart(p)
					setViewCart(true)
					setSelectedProduct(null)
				}}
			/>

			<Footer />
		</div>
	)
}

