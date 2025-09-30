import React from 'react'

export default function Header({
	brands = [],
	brand,
	onBrand,
	query,
	onQuery,
	onToggleCart,
	cartCount = 0 
}) {
	return (
		<header className="w-full border-b shadow-sm">
			{/* Top bar */}
			<div className="bg-secondary text-white text-sm py-2">
				<div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
					<span>Follow our socials</span>
					<div className="flex gap-4">
						<select
							className="bg-secondary text-white text-sm border-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
							defaultValue="en"
						>
							<option value="en">English</option>
							<option value="ph">Filipino</option>
							<option value="es">Español</option>
							<option value="jp">日本語</option>
						</select>
						<button className="hover:underline">Login</button>
						<button className="hover:underline">Sign Up</button>
					</div>
				</div>
			</div>
			{/* 🔹 Main header */}
			<div className="bg-background">
				<div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					{/* Logo */}
					<div>
						<h1 className="text-xl font-semibold text-text">Moto Store</h1>
						<p className="text-sm text-text">Find your next ride</p>
					</div>

					{/* Search + controls */}
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
						<input
							className="border rounded-md px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Search motorcycles..."
							value={query}
							onChange={e => onQuery(e.target.value)}
						/>
						<select
							className="border rounded-md px-3 py-2 bg-background w-full sm:w-auto"
							value={brand}
							onChange={e => onBrand(e.target.value)}
						>
							{brands.map(b => (
								<option key={b} value={b}>
									{b}
								</option>
							))}
						</select>
						<button
							className="bg-primary text-white px-3 py-2 rounded-md w-full sm:w-auto relative hover:bg-primary"
							onClick={onToggleCart}
							aria-label="Open cart"
						>
							Cart
							{cartCount > 0 && (
								<span
									className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full px-1 py-0.5 min-w-[18px] text-center font-semibold"
									aria-live="polite"
								>
									{cartCount}
								</span>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* 🔹 Promo banner */}
			<div className="bg-accent text-white text-sm py-2">
				<div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
					<span>🔥 Big Sale! Up to 50% off on selected bikes</span>
					<span>🔥 Big Sale! Up to 50% off on selected bikes</span>
					<span>🔥 Big Sale! Up to 50% off on selected bikes</span>
				</div>
			</div>
		</header>
	)
}
