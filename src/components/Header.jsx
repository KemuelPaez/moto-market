import React from 'react'

export default function Header({
	brands = [],
	brand,
	onBrand,
	query,
	onQuery,
	onToggleCart,
	cartCount = 0,
	theme = false,
	onToggleTheme = () => {} 
}) {
	return (
		<header className="w-full border-b shadow-sm">
			{/* Top bar */}
			<div className="bg-secondary text-white text-sm py-2">
				<div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
					<span>Follow our socials</span>
					<div className="flex gap-4 items-center">
						<button
							onClick={onToggleTheme}
							aria-pressed={!!theme}
							aria-label="Toggle dark mode"
							className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-background/50 text-white hover:bg-background/70 focus:outline-none"
						>
							{theme ? (
								/* sun icon when in dark mode (click to go light) */
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<circle cx="12" cy="12" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							) : (
								/* moon icon when in light mode (click to go dark) */
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</button>

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
