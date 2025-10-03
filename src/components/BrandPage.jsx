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

const categories = ['All', 'Bigbikes', 'Underbone', 'Scooter', 'Classic', 'Cruiser']

return (
	<div className="mt-4">
	{/* header + controls */}
	<div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
		<div className="flex items-center gap-3">
		<button
			onClick={onBack}
			className="px-3 py-2 rounded-md border bg-background text-text hover:opacity-95"
			aria-label="Back to main"
		>
			← Back
		</button>
		<div>
			<h2 className="text-2xl font-semibold text-text m-0">{brand} Motorcycles</h2>
			<p className="text-sm text-secondary mt-1">Browse available models — {total} result{total !== 1 ? 's' : ''}</p>
		</div>
		</div>

		{/* filters area */}
		<div className="ml-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
		{/* quick category chips */}
		<div className="flex flex-wrap gap-2">
			{categories.map(cat => (
			<button
				key={cat}
				onClick={() => setCategory(cat)}
				className={`text-sm px-3 py-1.5 rounded-full border ${category === cat ? 'bg-primary text-white' : 'bg-background text-text'} `}
				aria-pressed={category === cat}
			>
				{cat}
			</button>
			))}
		</div>

		{/* selects */}
		<div className="flex items-center gap-2">
			<label className="sr-only">Category</label>
			<select
			value={category}
			onChange={e => setCategory(e.target.value)}
			className="p-2 border rounded-md bg-background text-text"
			>
			<option value="All">All Categories</option>
			<option value="Bigbikes">Bigbikes</option>
			<option value="Underbone">Underbone</option>
			<option value="Scooter">Scooter</option>
			<option value="Classic">Classic</option>
			<option value="Cruiser">Cruiser</option>
			</select>

			<label className="sr-only">Sort</label>
			<select value={sort} onChange={e => setSort(e.target.value)} className="p-2 border rounded-md bg-background text-text">
			<option value="popular">Popular</option>
			<option value="latest">Latest</option>
			<option value="price">Price</option>
			</select>
		</div>
		</div>
	</div>

	{/* products panel */}
	<div className="surface p-4 rounded-lg">
		{products.length === 0 && !loading && (
		<div className="text-secondary py-8 text-center">No motorcycles found for {brand}.</div>
		)}

		<ProductList products={products} onViewProduct={onViewProduct} />

		{/* loading / load more */}
		<div className="mt-4 flex justify-center items-center">
		{loading && <div className="text-secondary">Loading …</div>}
		{!loading && hasMore && (
			<button
			onClick={loadMore}
			className="px-4 py-2 rounded-md border bg-background text-text hover:shadow-md"
			>
			Load more
			</button>
		)}
		</div>
	</div>
	</div>
)
}
