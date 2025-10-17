import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Banner from './components/Banner'
import LogoFeature from './components/LogoFeature'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Footer from './components/Footer'
import BrandPage from './components/BrandPage'
import FavoritesPage from './components/FavoritesPage'
import SignUpModal from './components/SignUpModal'
import ComparePage from './components/ComparePage'
import LoginModal from './components/LoginModal'
import productsData from './data/products'
import { FaScribd } from "react-icons/fa"
import './index.css'

export default function App() {
	const [query, setQuery] = useState('')
	const [brand, setBrand] = useState('All')
	const [viewCart, setViewCart] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	const [cart, setCart] = useState([])

	const [selectedBrandRoute, setSelectedBrandRoute] = useState(null)

	const [dark, setDark] = useState(() => {
		try {
			return localStorage.getItem('theme') === 'dark'
		} catch {
			return false
		}
	})
	useEffect(() => {
		try {
			if (dark) document.documentElement.classList.add('dark')
			else document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', dark ? 'dark' : 'light')
		} catch {}
	}, [dark])

	const [favorites, setFavorites] = useState(() => [])
	const [viewFavorites, setViewFavorites] = useState(false)
	const [signUpOpen, setSignUpOpen] = useState(false)
	const [loginOpen, setLoginOpen] = useState(false)

	// compare state (max 2)
	const [compareSelection, setCompareSelection] = useState([])
	const [viewCompare, setViewCompare] = useState(false)

	const getKey = product => (product?.id ?? `${product?.brand}::${product?.name}`)

	const toggleFavorite = product => {
		if (!product) return
		const key = getKey(product)
		setFavorites(prev => {
			if (prev.includes(key)) return prev.filter(k => k !== key)
			return [...prev, key]
		})
	}

	// toggle compare selection (max 2)
	const toggleCompare = product => {
		if (!product) return
		const key = getKey(product)
		setCompareSelection(prev => {
			if (prev.includes(key)) return prev.filter(k => k !== key)
			if (prev.length >= 2) {
				// replace oldest if already 2 selected
				return [prev[1], key]
			}
			return [...prev, key]
		})
	}

	const clearFavorites = () => {
		setFavorites([])
	}

	const clearCompare = () => setCompareSelection([])

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

	const removeFromCart = identifier => {
		setCart(prev =>
			prev.filter(i => {
				const k = getKey(i)
				if (typeof identifier === 'string') return k !== identifier
				return k !== getKey(identifier)
			})
		)
	}

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

	const buyNow = product => {
		addToCart(product)
		setViewCart(true)
	}

	const handleCheckout = () => {
		if (!cart || cart.length === 0) {
			setViewCart(false)
			return
		}
		const orderSummary = cart.map(i => `${i.name} x${i.qty || 1}`).join('\n')
		window.alert(`Order placed:\n\n${orderSummary}\n\nThank you!`)
		setCart([])
		setViewCart(false)
	}

	const fetchProducts = async ({ brand: fBrand = null, category = 'All', sort = 'popular', page = 1, pageSize = 6, query: q = '' } = {}) => {
		const categoryMap = {
			Honda: 'Bigbikes',
			Kawasaki: 'Bigbikes',
			Yamaha: 'Scooter',
			Triumph: 'Classic',
			Ducati: 'Bigbikes',
			BMW: 'Bigbikes',
			Suzuki: 'Bigbikes',
			KTM: 'Bigbikes'
		}

		await new Promise(r => setTimeout(r, 450))

		let items = productsData.slice()

		if (fBrand) items = items.filter(p => p.brand === fBrand)

		if (category && category !== 'All') {
			items = items.filter(p => {
				const itemCategory = p.category || categoryMap[p.brand] || 'Uncategorized'
				return itemCategory === category
			})
		}

		if (q && q.trim()) {
			const t = q.toLowerCase()
			items = items.filter(p => p.name.toLowerCase().includes(t) || (p.shortDescription || '').toLowerCase().includes(t))
		}

		if (sort === 'price') {
			items = items.sort((a, b) => (a.price || 0) - (b.price || 0))
		} else if (sort === 'latest') {
			items = items.sort((a, b) => {
				const na = parseInt((a.id || '').match(/\d+$/)?.[0] || '0', 10)
				const nb = parseInt((b.id || '').match(/\d+$/)?.[0] || '0', 10)
				return nb - na
			})
		}

		const total = items.length
		const start = (page - 1) * pageSize
		const paged = items.slice(start, start + pageSize)

		return { items: paged, total }
	}

	const brandCounts = productsData.reduce((acc, p) => {
		acc[p.brand] = (acc[p.brand] || 0) + 1
		return acc
	}, {})
	const topBrands = Object.entries(brandCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([name]) => name)

	const brands = ['All', ...Array.from(new Set(productsData.map(p => p.brand)))]

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

	const cartCount = cart.reduce((s, it) => s + (it.qty || 0), 0)

	const favoriteProducts = productsData.filter(p => favorites.includes(getKey(p)))
	const favoriteCount = favorites.length
	const compareProducts = productsData.filter(p => compareSelection.includes(getKey(p)))
	const compareCount = compareSelection.length

	const navigateToBrand = b => {
		setSelectedBrandRoute(b)
		setSelectedProduct(null)
		setViewFavorites(false)
	}
	const goBackFromBrand = () => setSelectedBrandRoute(null)

	const goHome = () => {
		setSelectedBrandRoute(null)
		setBrand('All')
		setQuery('')
		setSelectedProduct(null)
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const openFavorites = () => {
		setViewFavorites(true)
		setSelectedBrandRoute(null)
		setSelectedProduct(null)
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const openCompare = () => {
		if (compareSelection.length === 0) {
			window.alert('Select up to 2 bikes to compare (use the compare button on each card).')
			return
		}
		setViewCompare(true)
		setSelectedBrandRoute(null)
		setSelectedProduct(null)
	}

	const openSignUp = () => setSignUpOpen(true)
	const closeSignUp = () => setSignUpOpen(false)

	const openLogin = () => setLoginOpen(true)
	const closeLogin = () => setLoginOpen(false)

	const handleLogin = ({ email } = {}) => {
		try {
			window.alert(`Welcome back, ${email || 'user'}!`)
		} catch {}
		setLoginOpen(false)
	}

	useEffect(() => {
		AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true })
	}, [])

	// determine if any modal is open
	const modalOpen = !!(signUpOpen || loginOpen)

	return (
		<div className="app-root" style={{ width: '100%', boxSizing: 'border-box' }}>
			<div className="w-full flex items-center justify-between box-border bg-secondary">
				<Header
					brands={brands}
					brand={brand}
					onBrand={setBrand}
					query={query}
					onQuery={setQuery}
					onToggleCart={() => setViewCart(v => !v)}
					cartCount={cartCount}
					theme={dark}
					onToggleTheme={() => setDark(d => !d)}
					onHome={goHome}
					onOpenFavorites={openFavorites}
					favoriteCount={favoriteCount}
					onOpenSignUp={openSignUp}
					onOpenLogin={openLogin}
					onOpenCompare={openCompare}
					compareCount={compareCount}
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
					onSelect={navigateToBrand}
				/>

				{selectedBrandRoute ? (
					<BrandPage
						brand={selectedBrandRoute}
						fetchProducts={fetchProducts}
						onBack={goBackFromBrand}
						onViewProduct={setSelectedProduct}
					/>
				) : viewFavorites ? (
					<FavoritesPage
						products={favoriteProducts}
						onBack={() => setViewFavorites(false)}
						onViewProduct={setSelectedProduct}
						onToggleFavorite={toggleFavorite}
						onClearFavorites={clearFavorites}
						onToggleCompare={toggleCompare}
					/>
				) : viewCompare ? (
					<ComparePage
						products={compareProducts}
						onBack={() => setViewCompare(false)}
						onRemove={key => setCompareSelection(prev => prev.filter(k => k !== key))}
						onClear={clearCompare}
					/>
				) : (
					<main className="container">
						<h2 className="section-title mb-4 text-2xl font-semibold text-text">
							Featured Motorcycles
						</h2>
						<ProductList
							products={filtered}
							onViewProduct={setSelectedProduct}
							favorites={favorites}
							onToggleFavorite={toggleFavorite}
							compareSelection={compareSelection}
							onToggleCompare={toggleCompare}
						/>
					</main>
				)}
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

			{/* Floating Compare Button */}
			<button
				style={{ display: modalOpen ? 'none' : undefined }} // hide while modal open
				className="fixed bottom-20 right-4 bg-background text-text p-3 rounded-full shadow-lg hover:bg-background/95 transition-colors duration-200 transform hover:scale-105 z-60"
				onClick={() => openCompare()}
				aria-label="Open compare"
				title="Compare selected bikes"
			>
				<FaScribd size={18} />
				{compareCount > 0 && (
					<span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1 py-0.5 min-w-[18px] text-center font-semibold z-70">
						{compareCount}
					</span>
				)}
			</button>

			{/* Floating Cart Icon */}
			<button
				style={{ display: modalOpen ? 'none' : undefined }}
				className="fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200 transform hover:scale-105 z-50"
				onClick={() => setViewCart(true)}
				aria-label="Open cart"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="9" cy="21" r="1"></circle>
					<circle cx="20" cy="21" r="1"></circle>
					<path d="m1 1 4 4h15l-1 7H6"></path>
				</svg>
				{cartCount > 0 && (
					<span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-1 py-0.5 min-w-[18px] text-center font-semibold">
						{cartCount}
					</span>
				)}
			</button>

			<Footer />

			<LoginModal open={loginOpen} onClose={closeLogin} onLogin={handleLogin} />

			<SignUpModal
				open={signUpOpen}
				onClose={closeSignUp}
				onSignUp={data => {
					// optional: handle created account (data.name, data.email)
					console.log('Signed up:', data)
				}}
			/>

		</div>
	)
}

