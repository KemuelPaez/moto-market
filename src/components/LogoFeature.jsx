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

	const minColWidth = imageWidth + 32

	return (
		<div
			className="p-4"
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 12,
				justifyContent: 'center',
			}}
			role="list"
		>
			{brands.map(b => {
				const isActive = active === b
				return (
					<button
						key={b}
						onClick={() => onSelect(b)}
						aria-pressed={isActive}
						className={`flex items-center justify-center rounded-lg p-2 cursor-pointer box-border`}
						style={{
							width: minColWidth,
							height: imageHeight + 12,
							border: isActive
								? '2px solid var(--color-text)'
								: '1px solid rgba(0,0,0,0.08)',
							background: isActive
								? 'var(--color-background)'
								: 'transparent',
							padding: 8,
						}}
					>
						<img
							src={placeholder(b)}
							alt={b}
							className="block object-contain"
							style={{
								width: imageWidth,
								height: imageHeight,
								objectFit: 'contain',
							}}
						/>
					</button>
				)
			})}
		</div>
	)
}