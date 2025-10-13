import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products = [], onViewProduct = () => {}, favorites = [], onToggleFavorite = () => {}, compareSelection = [], onToggleCompare = () => {} }) {
if (!products.length) return <p className="text-center text-secondary py-8">No motorcycles found.</p>
return (
	<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
	{products.map(p => {
		const key = p.id ?? `${p.brand}::${p.name}`
		return (
			<ProductCard
				key={key}
				product={p}
				onView={() => onViewProduct(p)}
				isFav={favorites.includes(key)}
				onToggleFav={() => onToggleFavorite(p)}
				isCompared={compareSelection.includes(key)}
				onToggleCompare={() => onToggleCompare(p)}
			/>
		)
	})}
	</div>
)
}
