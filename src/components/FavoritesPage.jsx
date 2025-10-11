import React from 'react'
import ProductList from './ProductList'

export default function FavoritesPage({ products = [], onBack = () => {}, onViewProduct = () => {}, onToggleFavorite = () => {}, onClearFavorites = () => {} }) {
return (
	<div className="mt-4">
		<div className="flex items-center gap-3 mb-4">
			<button onClick={onBack} className="px-3 py-2 rounded-md border bg-background text-text">← Back</button>
			<h2 className="text-2xl font-semibold text-text m-0">Favorites</h2>
			<p className="text-sm text-secondary ml-3">{products.length} item{products.length !== 1 ? 's' : ''}</p>

			<div className="ml-auto">
				<button
					onClick={() => {
						if (products.length === 0) return
						if (window.confirm('Clear all favorites?')) {
							onClearFavorites()
						}
					}}
					className="px-3 py-2 rounded-md border bg-background text-text hover:shadow-sm"
					aria-label="Clear all favorites"
				>
					Clear
				</button>
			</div>
		</div>

		<div className="surface p-4 rounded-lg">
			{products.length === 0 ? (
			<div className="text-secondary py-8 text-center">You have no favorited motorcycles yet.</div>
			) : (
			<ProductList
				products={products}
				onViewProduct={onViewProduct}
				favorites={products.map(p => p.id ?? `${p.brand}::${p.name}`)}
				onToggleFavorite={onToggleFavorite}
			/>
			)}
		</div>
	</div>
	)
}
