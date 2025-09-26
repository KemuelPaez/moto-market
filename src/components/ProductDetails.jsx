import React, { useEffect, useState, useRef } from 'react'

export default function ProductDetails({
	product,
	onClose = () => {},
	onAdd = () => {},   
	onBuy = () => {}    
}) {
	useEffect(() => {
		if (!product) return
		const onKey = e => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [product, onClose])

	// temporary confirmation state for "Add" action
	const [added, setAdded] = useState(false)
	const addedTimeoutRef = useRef(null)
	useEffect(() => {
		return () => {
			if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current)
		}
	}, [])

	if (!product) return null

	const specs = product.specs || {}

	return (
		<div
			onClick={onClose}
			style={{
				position: 'fixed',
				inset: 0,
				background: 'rgba(0,0,0,0.6)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 9999,
				padding: 20,
				boxSizing: 'border-box'
			}}
			aria-modal="true"
			role="dialog"
		>
			<div
				onClick={e => e.stopPropagation()}
				style={{
					width: 'min(1000px, 96%)',
					maxHeight: '90vh',
					background: '#fff',
					borderRadius: 8,
					overflow: 'auto',
					padding: 20,
					boxSizing: 'border-box',
					position: 'relative',
					display: 'flex',
					gap: 20,
					alignItems: 'flex-start'
				}}
			>
				{/* image / preview */}
				<div style={{ flex: '0 0 420px', maxWidth: 420 }}>
					<img
						src={product.image || product.img || product.photo || ''}
						alt={product.name}
						style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 6, background: '#f3f4f6' }}
					/>
				</div>

				{/* details */}
				<div style={{ flex: '1 1 auto' }}>
					<h3 style={{ margin: 0, fontSize: 22 }}>{product.name}</h3>
					<p style={{ marginTop: 8, color: '#555' }}>
						{product.shortDescription ?? product.description ?? 'No description available.'}
					</p>

					{/* quick info row */}
					<div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
						{product.price != null && (
							<div style={{ fontWeight: 700 }}>${product.price}</div>
						)}
						{product.brand && (
							<div style={{ padding: '4px 8px', background: '#f1f5f9', borderRadius: 6 }}>{product.brand}</div>
						)}
						{product.year && <div style={{ padding: '4px 8px', background: '#f1f5f9', borderRadius: 6 }}>{product.year}</div>}
					</div>

					{/* specifications */}
					{Object.keys(specs).length > 0 && (
						<section style={{ marginTop: 16 }}>
							<h4 style={{ margin: '0 0 8px 0' }}>Specifications</h4>
							<ul style={{ margin: 0, paddingLeft: 18, color: '#333' }}>
								{Object.entries(specs).map(([k, v]) => (
									<li key={k} style={{ marginBottom: 6 }}>
										<strong style={{ marginRight: 8 }}>{k}:</strong> {String(v)}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* fallback if no specs */}
					{Object.keys(specs).length === 0 && (
						<div style={{ marginTop: 16, color: '#666' }}>No specifications available.</div>
					)}
				</div>

				{/* close button */}
				<button
					onClick={onClose}
					aria-label="Close"
					style={{
						position: 'absolute',
						top: 12,
						right: 12,
						border: 'none',
						background: 'transparent',
						fontSize: 20,
						cursor: 'pointer'
					}}
				>
					×
				</button>

				{/* Add / Buy buttons with temporary confirmation */}
				<div style={{ marginTop: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
					<div className="flex gap-2" style={{ alignItems: 'center' }}>
						<button
							className="px-3 py-1 border rounded-md text-sm"
							onClick={e => {
								e.stopPropagation()
								// call App's addToCart with the full product object
								onAdd(product)
								// show temporary confirmation
								setAdded(true)
								if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current)
								addedTimeoutRef.current = setTimeout(() => setAdded(false), 2000)
							}}
						>
							Add
						</button>

						{/* small inline confirmation */}
						{added && (
							<span style={{ marginLeft: 8, color: '#10b981', fontWeight: 600 }}>
								Added ✓
							</span>
						)}

						<button
							className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
							onClick={e => {
								e.stopPropagation()
								onBuy(product)
							}}
						>
							Buy
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
