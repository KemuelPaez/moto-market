import React, { useEffect, useState, useRef } from 'react'

export default function Banner({ brands = [] }) {
	const [index, setIndex] = useState(0)
	const [loaded, setLoaded] = useState(() => brands.map(() => false))
	const mountedRef = useRef(true)

	// advance every 4s
	useEffect(() => {
		if (!brands.length) return
		const id = setInterval(() => setIndex(i => (i + 1) % brands.length), 4000)
		return () => clearInterval(id)
	}, [brands])

	useEffect(() => {
		mountedRef.current = true
		const imgs = []
		const nextLoaded = brands.map(() => false)

		brands.forEach((b, i) => {
			const img = new Image()
			img.src = imageFor(b)
			img.onload = () => {
				if (!mountedRef.current) return
				nextLoaded[i] = true
				// update loaded state once per load to trigger reveal
				setLoaded(prev => {
					const copy = prev.slice()
					copy[i] = true
					return copy
				})
			}
			img.onerror = () => {
				if (!mountedRef.current) return
				setLoaded(prev => {
					const copy = prev.slice()
					copy[i] = true
					return copy
				})
			}
			imgs.push(img)
		})

		// initialize loaded array if length changed
		setLoaded(prev => {
			if (prev.length !== brands.length) return brands.map((_, i) => !!nextLoaded[i])
			return prev
		})

		return () => {
			mountedRef.current = false
			// drop handlers
			imgs.forEach(img => {
				img.onload = null
				img.onerror = null
			})
		}
	}, [brands])

	if (!brands || brands.length === 0) return null

	const goPrev = () => setIndex(i => (i - 1 + brands.length) % brands.length)
	const goNext = () => setIndex(i => (i + 1) % brands.length)

	const placeholderImages = {
		Honda:
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=480&fit=crop',
		Kawasaki:
			'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=480&fit=crop',
		Yamaha:
			'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&h=480&fit=crop',
		Triumph:
			'https://images.unsplash.com/photo-1508431432310-7fec11a74c59?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
	}

	function imageFor(brand) {
		return (
			placeholderImages[brand] ||
			'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=480&fit=crop'
		)
	}

	return (
		<div
			className="banner bg-black rounded-lg overflow-hidden m-4 h-72 relative"
			aria-roledescription="carousel"
		>
			{/* slides viewport */}
			<div className="w-full h-full overflow-hidden">
				{/* slides container: one slide per brand */}
				<div
					className="slides flex h-full"
					style={{
						width: `${brands.length * 100}%`,
						transform: `translateX(-${index * (100 / brands.length)}%)`,
						transition: 'transform 600ms ease'
					}}
				>
					{brands.map((b, i) => (
						<div
							key={b}
							className="slide flex items-center justify-center h-full bg-black"
							style={{
								flex: `0 0 ${100 / brands.length}%`
							}}
						>
							<img
								src={imageFor(b)}
								alt={b}
								className="w-full h-full object-contain transition-opacity duration-250"
								style={{
									opacity: loaded[i] ? 1 : 0,
									background: '#111'
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* controls */}
			<button
				onClick={goPrev}
				aria-label="Previous"
				className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 rounded cursor-pointer"
			>
				‹
			</button>
			<button
				onClick={goNext}
				aria-label="Next"
				className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 rounded cursor-pointer"
			>
				›
			</button>

			{/* dots */}
			<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
				{brands.map((b, i) => (
					<button
						key={b}
						onClick={() => setIndex(i)}
						aria-label={`Go to ${b}`}
						className={`w-2.5 h-2.5 rounded-full border-none p-0 cursor-pointer ${i === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
					/>
				))}
			</div>
		</div>
	)
}