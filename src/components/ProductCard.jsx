import React from 'react'

export default function ProductCard({ product, onView = () => {} }) {
	return (
		<div
			className="product-card bg-surface rounded-md p-3 box-border shadow-sm"
			style={{
				boxSizing: 'border-box',
			}}
		>
			{/* Image (clickable) */}
			<div
				role="button"
				tabIndex={0}
				onClick={() => onView(product)}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						onView(product)
					}
				}}
				className="cursor-pointer overflow-hidden rounded-md mb-2"
				aria-label={`View details for ${product.name}`}
			>
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-44 object-cover block rounded"
				/>
			</div>

			{/* Title */}
			<h3 className="mt-0 mb-1.5 text-base text-text">{product.name}</h3>

			{/* Price / Brand / Details */}
			<div className="flex items-center justify-between mt-2">
				<div className="text-secondary text-sm">
					{product.brand} • ${product.price}
				</div>

				<button
					onClick={e => {
						e.stopPropagation()
						onView(product)
					}}
					className="px-2.5 py-1.5 rounded-md bg-primary text-white text-sm hover:opacity-95"
					aria-label={`View details for ${product.name}`}
				>
					Details
				</button>
			</div>
		</div>
	)
}
