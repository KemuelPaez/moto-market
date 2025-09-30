import React from 'react'

export default function ProductCard({ product, onView = () => {} }) {
	return (
			<div
				className="product-card"
				style={{
					background: '#fff',
					borderRadius: 8,
					padding: 12,
					boxSizing: 'border-box',
					boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
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
					style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
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
					className="px-2.5 py-1.5 border-none rounded-md bg-text text-white cursor-pointer text-sm hover:bg-text"
					aria-label={`View details for ${product.name}`}
				>
					Details
				</button>
			</div>
		</div>
	)
}
