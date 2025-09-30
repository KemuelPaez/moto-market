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
		<div className="mt-2">
			<div className="flex items-center gap-3 mb-4 flex-wrap">
				<button
					onClick={onBack}
					className="px-2.5 py-2 rounded-md border border-gray-300 bg-background cursor-pointer"
					aria-label="Back to main"
				>
					← Back
				</button>
				<h2 className="m-0 text-xl text-text">{brand} Motorcycles</h2>

				{/* category filter */}
				<div className="ml-auto flex gap-2 items-center">
					<label className="text-sm text-text">Category</label>
					<select value={category} onChange={e => setCategory(e.target.value)} className="p-1.5">
						<option value="All">All Categories</option>
						<option value="Bigbikes">Bigbikes</option>
						<option value="Underbone">Underbone</option>
						<option value="Scooter">Scooter</option>
						<option value="Classic">Classic</option>
					</select>

					<label className="text-sm text-text ml-3">Sort</label>
					<select value={sort} onChange={e => setSort(e.target.value)} className="p-1.5">
						<option value="popular">Popular</option>
						<option value="latest">Latest</option>
						<option value="price">Price</option>
					</select>
				</div>
			</div>

			{/* product list */}
			{products.length === 0 && !loading && <div className="text-secondary">No motorcycles found for {brand}.</div>}

			<ProductList products={products} onViewProduct={onViewProduct} />

			{/* load more */}
			{loading && <div className="mt-3">Loading …</div>}
			{hasMore && !loading && (
				<div className="mt-3">
					<button
						onClick={loadMore}
						className="px-3 py-2 rounded-md border border-gray-300 bg-background cursor-pointer"
					>
						Load more
					</button>
				</div>
			)}
		</div>
	)
}
