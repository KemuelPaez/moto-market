import React, { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import productsData from './data/products'
import './index.css'

export default function App() {
	const [query, setQuery] = useState('')
	const [brand, setBrand] = useState('All')
	const [viewCart, setViewCart] = useState(false)

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

	const filtered = productsData.filter(p => {
		const matchBrand = brand === 'All' || p.brand === brand
		const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
		return matchBrand && matchQuery
	})

	return (
		<div
			className="app-root"
			style={{
				width: '100%',
				boxSizing: 'border-box'
			}}
		>
			{/* full-width header wrapper — flex area that spans the viewport */}
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
				<Header
					brands={brands}
					brand={brand}
					onBrand={setBrand}
					query={query}
					onQuery={setQuery}
					onToggleCart={() => setViewCart(v => !v)}
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
					<ProductList products={filtered} />
				</main>
			</div>

			<Cart open={viewCart} onClose={() => setViewCart(false)} />
		</div>
	)
}
