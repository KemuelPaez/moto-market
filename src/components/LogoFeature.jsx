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
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxp-yM4w3bsROAVCDs0dQJ7FjB-UWLF2E1n9zTUJYjjBVN2DhOeIcndh9Ij4jFlA_3hM&usqp=CAU',
		Triumph:
			'https://brandlogos.net/wp-content/uploads/2017/01/triumph_motorcycles-logo_brandlogos.net_a8nqa-512x458.png',
		Suzuki:
			'https://www.citypng.com/public/uploads/preview/hd-suzuki-logo-transparent-background-701751694773172hlym9vlvbt.png',
		KTM:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/KTM-Logo.svg/1280px-KTM-Logo.svg.png',
		BMW:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png',
		Ducati:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Ducati_red_logo.svg/1131px-Ducati_red_logo.svg.png',
		HarleyDavidson:
			'https://cdn.room58.com/2024/04/26/12cd2c86902466686f4a9e91b60f869b_0a505b62e7b3995e.png',
	}

	const placeholder = brand =>
		logoMap[brand] ||
		`https://images.unsplash.com/featured/?motorcycle,${encodeURIComponent(
			brand
		)}&w=200&h=80&fit=crop`

	if (!brands || brands.length === 0) return null

	return (
		<div
			role="list"
			className="px-4 py-3"
			style={{ boxSizing: 'border-box' }}
		>
			<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{brands.map(b => {
					const isActive = active === b
					return (
						<button
							key={b}
							onClick={() => onSelect(b)}
							aria-pressed={isActive}
							role="listitem"
							className={`flex items-center justify-center p-2 rounded-lg transition-shadow focus:outline-none ${
								isActive ? 'ring-2 ring-primary bg-background' : 'bg-background/80'
							}`}
							style={{
								minHeight: imageHeight + 16,
							}}
						>
							<img
								src={placeholder(b)}
								alt={b}
								style={{
									maxWidth: imageWidth,
									height: imageHeight,
									objectFit: 'contain',
									display: 'block'
								}}
							/>
						</button>
					)
				})}
			</div>
		</div>
	)
}