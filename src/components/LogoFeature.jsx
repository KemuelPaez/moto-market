import React from 'react'

export default function LogoFeature({
	brands = [],
	active,
	onSelect = () => {},
	imageWidth = 150,
	imageHeight = 55,
}) {
	// Per-brand logo images
	const logoMap = {
		Honda:
			'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg',
		Yamaha:
			'https://icon2.cleanpng.com/20180719/jrj/kisspng-yamaha-motor-company-yamaha-fz16-yamaha-motor-euro-pit-bike-yamaha-5b50102cb35ad6.9550497215319736767346.jpg',
		Kawasaki:
			'https://www.vhv.rs/dpng/d/509-5092385_kawasaki-logo-design-vector-free-download-logo-kawasaki.png',
		Triumph:
			'https://brandlogos.net/wp-content/uploads/2017/01/triumph_motorcycles-logo_brandlogos.net_a8nqa-512x458.png',
		Suzuki:
			'https://www.citypng.com/public/uploads/preview/hd-suzuki-logo-transparent-background-701751694773172hlym9vlvbt.png',
	}

	const placeholder = brand =>
		logoMap[brand] ||
		`https://images.unsplash.com/featured/?motorcycle,${encodeURIComponent(
			brand
		)}&w=200&h=80&fit=crop`

	if (!brands || brands.length === 0) return null

	return (
		<div
			className="flex gap-3 overflow-x-auto p-4 items-center justify-center overflow-scrolling-touch"
			role="list"
		>
			{brands.map(b => {
				const isActive = active === b
				return (
					<button
						key={b}
						onClick={() => onSelect(b)}
						aria-pressed={isActive}
						className={`flex-none ${isActive ? 'border-2 border-text bg-background' : 'border border-gray-300 bg-gray-50'} rounded-lg p-1.5 cursor-pointer flex items-center justify-center box-border`}
						style={{
							minWidth: imageWidth + 24,
							height: imageHeight + 24
						}}
					>
						<img
							src={placeholder(b)}
							alt={b}
							className="block object-contain"
							style={{
								width: imageWidth,
								height: imageHeight
							}}
						/>
					</button>
				)
			})}
		</div>
	)
}