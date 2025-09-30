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
			className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-5 box-border"
			aria-modal="true"
			role="dialog"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="w-full max-w-4xl max-h-90vh bg-background rounded-lg overflow-auto p-5 box-border relative flex gap-5 items-start"
			>
				{/* image / preview */}
				<div style={{ flex: '0 0 420px', maxWidth: 420 }}>
					<img
						src={product.image || product.img || product.photo || ''}
						alt={product.name}
						className="w-full h-75 object-cover rounded-md bg-background"
					/>
				</div>

				{/* details */}
				<div className="flex-1">
					<h3 className="m-0 text-2xl text-text">{product.name}</h3>
					<p className="mt-2 text-secondary">
						{product.shortDescription ?? product.description ?? 'No description available.'}
					</p>

					{/* quick info row */}
					<div className="mt-3 flex gap-3 flex-wrap">
						{product.price != null && (
							<div className="font-bold">${product.price}</div>
						)}
						{product.brand && (
							<div className="px-2 py-1 bg-background rounded-md">{product.brand}</div>
						)}
						{product.year && <div className="px-2 py-1 bg-background rounded-md">{product.year}</div>}
					</div>

					{/* specifications */}
					{Object.keys(specs).length > 0 && (
						<section className="mt-4">
							<h4 className="m-0 mb-2">Specifications</h4>
							<ul className="m-0 pl-4.5 text-text">
								{Object.entries(specs).map(([k, v]) => (
									<li key={k} className="mb-1.5">
										<strong className="mr-2">{k}:</strong> {String(v)}
									</li>
								))}
							</ul>
						</section>
					)}

					{/* fallback if no specs */}
					{Object.keys(specs).length === 0 && (
						<div className="mt-4 text-secondary">No specifications available.</div>
					)}
				</div>

				{/* close button */}
				<button
					onClick={onClose}
					aria-label="Close"
					className="absolute top-3 right-3 border-none bg-transparent text-xl cursor-pointer"
				>
					×
				</button>

				{/* Add / Buy buttons with temporary confirmation */}
				<div className="mt-auto flex gap-2 items-center">
					<div className="flex gap-2 items-center">
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
							<span className="ml-2 text-green-500 font-semibold">
								Added ✓
							</span>
						)}

						<button
							className="px-3 py-1 bg-primary text-white rounded-md text-sm"
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
