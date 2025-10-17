import React, { useEffect, useState, useRef } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { motion, AnimatePresence } from 'framer-motion'

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

	// add confirmation state
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
		<AnimatePresence>
			{product && (
				<motion.div
					key={product.id ?? product.name}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
					onClick={onClose}
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-[100] flex items-center justify-center p-4"
				>
					{/* backdrop */}
					<motion.div
						aria-hidden="true"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18 }}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					/>

					{/* panel */}
					<motion.div
						onClick={e => e.stopPropagation()}
						initial={{ y: 12, opacity: 0, scale: 0.995 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 12, opacity: 0, scale: 0.995 }}
						transition={{ duration: 0.22, ease: 'easeOut' }}
						className="relative w-full max-w-5xl bg-background rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-0"
						aria-label={`${product.name} details`}
					>
						{/* image + color flares */}
						<div className="md:col-span-5 relative bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
							<div className="absolute -left-16 -top-10 w-44 h-44 rounded-full bg-gradient-to-tr from-primary to-transparent opacity-40 blur-3xl pointer-events-none" />
							<div className="absolute -right-16 -bottom-12 w-56 h-56 rounded-full bg-gradient-to-br from-accent/70 to-transparent opacity-30 blur-3xl pointer-events-none" />

							{/* image container - react-image-magnify */}
							<div className="relative w-full h-72 md:h-[420px] flex items-center justify-center p-6 box-border">
								<ReactImageMagnify
									{...{
										smallImage: {
											alt: product.name,
											isFluidWidth: true,
											src: product.image || product.img || product.photo || ''
										},
										largeImage: {
											src: product.image || product.img || product.photo || '',
											width: '100%',
											height: '100%'
										},
										enlargedImagePosition: 'beside',
										enlargedImageContainerStyle: {
											zIndex: 11000,
											boxShadow: '0 12px 40px rgba(2,6,23,0.5)',
											borderRadius: 12,
											overflow: 'hidden'
										},
										enlargedImageContainerDimensions: { width: 480, height: 480 },
										isHintEnabled: true,
										shouldUsePositiveSpaceLens: true,
										lensStyle: { backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)' },
										imageClassName: 'max-w-full max-h-full object-cover rounded-xl shadow-lg'
									}}
								/>
							</div>

							{/* small brand badge */}
							<div className="absolute top-4 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-sm font-semibold">
								{product.brand}
							</div>
						</div>

						{/* Right: content */}
						<div className="md:col-span-7 p-6 md:p-8 flex flex-col gap-4">
							{/* header: title + price */}
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="text-2xl md:text-3xl font-bold text-text leading-tight">
										{product.name}
									</h3>
									<p className="mt-2 text-sm text-secondary max-w-prose">
										{product.shortDescription ?? product.description ?? 'No description available.'}
									</p>
								</div>
								<div className="text-right">
									<div className="text-xl font-extrabold text-primary">${product.price}</div>
									<div className="mt-2 text-xs text-secondary">Est. price</div>
								</div>
							</div>

							{/* quick meta */}
							<div className="flex flex-wrap gap-3">
								{product.year && <span className="px-3 py-1 bg-background/60 rounded-full text-sm">{product.year}</span>}
								{product.specs?.['engine type'] && <span className="px-3 py-1 bg-background/60 rounded-full text-sm">{product.specs['engine type']}</span>}
								{product.specs?.['displacement (cc)'] && <span className="px-3 py-1 bg-background/60 rounded-full text-sm">{product.specs['displacement (cc)']} cc</span>}
							</div>

							{/* specs grid */}
							<section className="mt-2 md:mt-4">
								<h4 className="text-sm font-semibold text-text mb-2">Specifications</h4>
								<div className="grid grid-cols-2 gap-3 text-sm text-secondary">
									{['model','transmission','fuel capacity','engine type','displacement (cc)','wheels type'].map(key => (
										<div key={key} className="flex flex-col">
											<span className="text-xs uppercase text-neutral-400">{key}</span>
											<span className="mt-1 text-text">{specs[key] ?? '—'}</span>
										</div>
									))}
								</div>
							</section>

							{/* actions & footer */}
							<div className="mt-auto flex items-center justify-between gap-4">
								{/* left actions */}
								<div className="flex items-center gap-3">
									<button
										onClick={e => {
											e.stopPropagation()
											onAdd(product)
											setAdded(true)
											if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current)
											addedTimeoutRef.current = setTimeout(() => setAdded(false), 2000)
										}}
										className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-background/95 text-sm font-medium"
									>
										{/* add icon */}
										<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
										Add to Cart
									</button>

									{added ? (
										<span className="text-green-500 font-semibold">Added ✓</span>
									) : null}
								</div>

								{/* buy / close */}
								<div className="flex items-center gap-3">
									<button
										onClick={e => { e.stopPropagation(); onBuy(product) }}
										className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:opacity-95"
									>
										Buy Now
									</button>

									<button
										onClick={onClose}
										className="px-3 py-2 rounded-lg bg-background text-sm text-secondary hover:bg-background/90"
										aria-label="Close"
									>
										Close
									</button>
								</div>
							</div>

							{/* subtle divider + hint */}
							<div className="mt-3 text-xs text-neutral-400">
								Free shipping on selected models • 30-day returns • 2-year warranty on engine components
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
