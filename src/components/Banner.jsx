import React, { useEffect, useState, useRef } from 'react'

export default function Banner() {
const images = [
	'https://www.shutterstock.com/shutterstock/videos/1095203085/thumb/5.jpg?ip=x480',
	'https://img.freepik.com/free-photo/lesbian-couple-motorcycle-road-trip_23-2149023877.jpg?semt=ais_hybrid&w=740&q=80',
	'https://assets.roadrunner.travel/img/2024/08/WING9240.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-N2XePfIrSqTiqRFG5Lgc6qt1QBVQpHUAgiEYTG0MOGTv9owh1OZwaOjycD9jnr2EgJU&usqp=CAU',
]

const [index, setIndex] = useState(0)
const [loaded, setLoaded] = useState(() => images.map(() => false))
const mountedRef = useRef(true)

// auto advance
useEffect(() => {
	if (!images.length) return
	const id = setInterval(() => setIndex(i => (i + 1) % images.length), 4000)
	return () => clearInterval(id)
}, [images])

// preload images
useEffect(() => {
	mountedRef.current = true
	const imgs = []
	const nextLoaded = images.map(() => false)

	images.forEach((src, i) => {
	const img = new Image()
	img.src = src
	img.onload = () => {
		if (!mountedRef.current) return
		nextLoaded[i] = true
		setLoaded(prev => {
		const copy = [...prev]
		copy[i] = true
		return copy
		})
	}
	img.onerror = () => {
		if (!mountedRef.current) return
		setLoaded(prev => {
		const copy = [...prev]
		copy[i] = true
		return copy
		})
	}
	imgs.push(img)
	})

	setLoaded(prev => {
		if (prev.length !== images.length) return images.map((_, i) => !!nextLoaded[i])
		return prev
	})

	return () => {
	mountedRef.current = false
	imgs.forEach(img => {
		img.onload = null
		img.onerror = null
	})
	}
}, [images])

if (!images || images.length === 0) return null

const goPrev = () => setIndex(i => (i - 1 + images.length) % images.length)
const goNext = () => setIndex(i => (i + 1) % images.length)

return (
	<div
		className="banner bg-black rounded-lg overflow-hidden m-4 h-72 relative"
		aria-roledescription="carousel"
	>
	{/* slides */}
	<div className="w-full h-full overflow-hidden">
		<div
		className="slides flex h-full"
		style={{
			width: `${images.length * 100}%`,
			transform: `translateX(-${index * (100 / images.length)}%)`,
			transition: 'transform 600ms ease',
		}}
		>
		{images.map((src, i) => (
			<div
				key={i}
				className="slide flex items-center justify-center h-full bg-black"
				style={{ flex: `0 0 ${100 / images.length}%` }}
			>
			<img
				src={src}
				alt={`Slide ${i + 1}`}
				className="transition-opacity duration-250"
				style={{
					opacity: loaded[i] ? 1 : 0,
					background: '#111',
					maxWidth: "900px",
					maxHeight: "100%",
					width: "auto",
					height: "100%",
					objectFit: "contain",
					margin: "0 auto"    
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
		className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
	>
		‹
	</button>
	<button
		onClick={goNext}
		aria-label="Next"
		className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
	>
		›
	</button>

	{/* dots */}
	<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
		{images.map((_, i) => (
		<button
			key={i}
			onClick={() => setIndex(i)}
			aria-label={`Go to slide ${i + 1}`}
			className={`w-2.5 h-2.5 rounded-full cursor-pointer ${i === index ? 'bg-white' : 'bg-white/50'}`}
		/>
		))}
	</div>
	</div>
)
}
