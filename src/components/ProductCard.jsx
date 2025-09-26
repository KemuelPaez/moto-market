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
				style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: 6, marginBottom: 8 }}
				aria-label={`View details for ${product.name}`}
			>
				<img
					src={product.image}
					alt={product.name}
					style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
				/>
			</div>
			
			{/* Title */}
			<h3 style={{ marginTop: 0, marginBottom: 6, fontSize: 16 }}>{product.name}</h3>

			{/* Price / Brand / Details */}
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
				<div style={{ color: '#6b7280', fontSize: 14 }}>
					{product.brand} • ${product.price}
				</div>

				<button
					onClick={e => {
						e.stopPropagation()
						onView(product)
					}}
					style={{
						padding: '6px 10px',
						border: 'none',
						borderRadius: 6,
						background: '#111827',
						color: '#fff',
						cursor: 'pointer',
						fontSize: 14,
					}}
					aria-label={`View details for ${product.name}`}
				>
					Details
				</button>
			</div>
		</div>
	)
}
