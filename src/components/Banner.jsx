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
			className="banner"
			style={{
				position: 'relative',
				width: '100%',
				borderRadius: 8,
				overflow: 'hidden',
				margin: '16px 0',
				height: 300,
				background: '#111'
			}}
			aria-roledescription="carousel"
		>
			{/* slides viewport */}
			<div
				style={{
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}}
			>
				{/* slides container: one slide per brand */}
				<div
					className="slides"
					style={{
						display: 'flex',
						height: '100%',
						width: `${brands.length * 100}%`,
						transform: `translateX(-${index * (100 / brands.length)}%)`,
						transition: 'transform 600ms ease'
					}}
				>
					{brands.map((b, i) => (
						<div
							key={b}
							className="slide"
							style={{
								flex: `0 0 ${100 / brands.length}%`,
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								background: '#111'
							}}
						>
							<img
								src={imageFor(b)}
								alt={b}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'contain',
									transition: 'opacity 250ms linear',
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
				style={{
					position: 'absolute',
					top: '50%',
					left: 8,
					transform: 'translateY(-50%)',
					background: 'rgba(0,0,0,0.5)',
					color: '#fff',
					border: 'none',
					padding: '8px 10px',
					borderRadius: 4,
					cursor: 'pointer'
				}}
			>
				‹
			</button>
			<button
				onClick={goNext}
				aria-label="Next"
				style={{
					position: 'absolute',
					top: '50%',
					right: 8,
					transform: 'translateY(-50%)',
					background: 'rgba(0,0,0,0.5)',
					color: '#fff',
					border: 'none',
					padding: '8px 10px',
					borderRadius: 4,
					cursor: 'pointer'
				}}
			>
				›
			</button>

			{/* dots */}
			<div
				style={{
					position: 'absolute',
					bottom: 8,
					left: '50%',
					transform: 'translateX(-50%)',
					display: 'flex',
					gap: 8
				}}
			>
				{brands.map((b, i) => (
					<button
						key={b}
						onClick={() => setIndex(i)}
						aria-label={`Go to ${b}`}
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							background: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
							border: 'none',
							padding: 0,
							cursor: 'pointer'
						}}
					/>
				))}
			</div>
		</div>
	)
}