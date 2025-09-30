import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'

export default function BrandPage({ brand, fetchProducts, onBack = () => {}, onViewProduct = () => {} }) {
	// pagination and filter state
	const [page, setPage] = useState(1)
	const pageSize = 6
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(false)
	const [category, setCategory] = useState('All')
	const [sort, setSort] = useState('popular')

	useEffect(() => {
		// reset when brand/category/sort changes
		setProducts([])
		setPage(1)
		setTotal(0)
		fetchPage(1, true)
	}, [brand, category, sort])

	const fetchPage = async (p = 1, replace = false) => {
		setLoading(true)
		try {
			const res = await fetchProducts({ brand, category, sort, page: p, pageSize })
			if (replace) {
				setProducts(res.items)
			} else {
				setProducts(prev => [...prev, ...res.items])
			}
			setTotal(res.total)
		} finally {
			setLoading(false)
		}
	}

	const loadMore = () => {
		const next = page + 1
		setPage(next)
		fetchPage(next, false)
	}

	const hasMore = products.length < total

	return (
		<div style={{ marginTop: 8 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
				<button
					onClick={onBack}
					style={{
						padding: '8px 10px',
						borderRadius: 6,
						border: '1px solid #e5e7eb',
						background: '#fff',
						cursor: 'pointer'
					}}
					aria-label="Back to main"
				>
					← Back
				</button>
				<h2 style={{ margin: 0, fontSize: 20 }}>{brand} Motorcycles</h2>

				{/* category filter */}
				<div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
					<label style={{ fontSize: 13, color: '#333' }}>Category</label>
					<select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: 6 }}>
						<option value="All">All Categories</option>
						<option value="Bigbikes">Bigbikes</option>
						<option value="Underbone">Underbone</option>
						<option value="Scooter">Scooter</option>
						<option value="Classic">Classic</option>
					</select>

					<label style={{ fontSize: 13, color: '#333', marginLeft: 12 }}>Sort</label>
					<select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: 6 }}>
						<option value="popular">Popular</option>
						<option value="latest">Latest</option>
						<option value="price">Price</option>
					</select>
				</div>
			</div>

			{/* product list */}
			{products.length === 0 && !loading && <div style={{ color: '#666' }}>No motorcycles found for {brand}.</div>}

			<ProductList products={products} onViewProduct={onViewProduct} />

			{/* load more */}
			{loading && <div style={{ marginTop: 12 }}>Loading …</div>}
			{hasMore && !loading && (
				<div style={{ marginTop: 12 }}>
					<button
						onClick={loadMore}
						style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}
					>
						Load more
					</button>
				</div>
			)}
		</div>
	)
}
