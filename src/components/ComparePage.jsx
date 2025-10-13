import React from 'react'
import ProductList from './ProductList'
import { FaCheckCircle, FaMinus, FaCircle } from "react-icons/fa"

export default function ComparePage({ products = [], onBack = () => {}, onRemove = () => {}, onClear = () => {} }) {
	const left = products[0] || null
	const right = products[1] || null

	// helpers to safely parse numeric specs
	const parseNum = v => {
		if (v == null) return 0
		if (typeof v === 'number') return v
		const n = String(v).replace(/[^\d.]/g, '')
		return parseFloat(n) || 0
	}

	// parse cylinder count from engine description (e.g. "Inline 4-cylinder")
	const parseCylinders = s => {
		if (!s) return 0
		const m = String(s).match(/(\d+)\s*(?:-|\s)?(?:cyl|cylinder|cc)?/i)
		if (m && m[1]) return parseInt(m[1], 10)
		const m2 = String(s).match(/(\d+)/)
		return m2 ? parseInt(m2[1], 10) : 0
	}

	// wheel type ranking (higher = better)
	const wheelRank = w => {
		if (!w) return 0
		const s = String(w).toLowerCase()
		if (s.includes('alloy')) return 3
		if (s.includes('cast')) return 2
		if (s.includes('spoked') || s.includes('wire')) return 1
		return 0
	}

	// compute metrics
	const priceLeft = left?.price ?? 0
	const priceRight = right?.price ?? 0
	const priceWinner = left && right ? (priceLeft < priceRight ? 'left' : priceLeft > priceRight ? 'right' : 'equal') : null

	const dispLeft = parseNum(left?.specs?.['displacement (cc)'])
	const dispRight = parseNum(right?.specs?.['displacement (cc)'])
	const dispWinner = left && right ? (dispLeft > dispRight ? 'left' : dispLeft < dispRight ? 'right' : 'equal') : null

	const fuelLeft = parseNum(left?.specs?.['fuel capacity'])
	const fuelRight = parseNum(right?.specs?.['fuel capacity'])
	const fuelWinner = left && right ? (fuelLeft > fuelRight ? 'left' : fuelLeft < fuelRight ? 'right' : 'equal') : null

	const cylLeft = parseCylinders(left?.specs?.['engine type'] || left?.specs?.model || '')
	const cylRight = parseCylinders(right?.specs?.['engine type'] || right?.specs?.model || '')
	const engineWinner = left && right ? (cylLeft > cylRight ? 'left' : cylLeft < cylRight ? 'right' : 'equal') : null

	const wheelLeftRank = wheelRank(left?.specs?.['wheels type'])
	const wheelRightRank = wheelRank(right?.specs?.['wheels type'])
	const wheelWinner = left && right ? (wheelLeftRank > wheelRightRank ? 'left' : wheelLeftRank < wheelRightRank ? 'right' : 'equal') : null

	// Icons
	const Check = () => (
		<span className="inline-flex items-center gap-1">
			<FaCheckCircle className="text-green-500 w-4 h-4" />
		</span>
	)

	const Minus = () => (
		<FaMinus className="text-gray-400 w-4 h-4" />
	)

	const RedDot = () => (
		<FaCircle className="text-red-500 w-4 h-4" />
	)

	const renderIndicator = (metricWinner, side, metricKey = '') => {
		if (!metricWinner) return null

		if (metricKey === 'price') {
			if (metricWinner === 'equal') return <Minus />
			return metricWinner === side ? <Check /> : <RedDot />
		}

		if (metricWinner === 'equal') return <Minus />
		return metricWinner === side ? <Check /> : <RedDot />
	}

	return (
		<div className="mt-4">
			<div className="flex items-start gap-4 mb-4">
				<button onClick={onBack} className="px-3 py-2 rounded-md border bg-background text-text">← Back</button>
				<div>
					<h2 className="text-2xl font-semibold text-text">Compare</h2>
					<p className="text-sm text-secondary mt-1">Compare two motorcycles side-by-side.</p>
				</div>

				<div className="ml-auto flex gap-2">
					<button onClick={() => { if (window.confirm('Clear compare selection?')) onClear() }} className="px-3 py-2 rounded-md border bg-background text-text">Clear</button>
				</div>
			</div>

			<div className="surface p-4 rounded-md mb-4">
				<h3 className="text-sm font-semibold text-text text-center">Legend</h3>
				<ul className="mt-3 flex flex-col items-center gap-2 text-sm text-secondary">
					<li className="flex items-center gap-2">
						<FaCheckCircle className="text-green-500 w-5 h-5" />
						<span>Indicates better result.</span>
					</li>
					<li className="flex items-center gap-2">
						<FaMinus className="text-gray-400 w-5 h-5" />
						<span>Indicates equal result.</span>
					</li>
					<li className="flex items-center gap-2">
						<FaCircle className="text-red-500 w-5 h-5" />
						<span>Indicates negative result.</span>
					</li>
				</ul>
			</div>

			{/* compare content */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				{[left, right].map((p, i) => {
					const side = i === 0 ? 'left' : 'right'
					return (
						<div key={p ? (p.id || p.name) : `empty-${i}`} className="p-4 surface rounded-md">
							{p ? (
								<>
									<div className="flex items-start gap-4">
										<img src={p.image} alt={p.name} className="w-40 h-28 object-cover rounded" />
										<div>
											<h4 className="text-lg font-semibold text-text">{p.name}</h4>
											<div className="text-sm text-secondary">{p.brand}</div>
											<div className="mt-2 text-xl font-bold">${p.price}</div>
											<div className="text-xs text-secondary">Price</div>
										</div>
									</div>

									<hr className="my-3" />

									<div className="text-sm text-secondary space-y-3">
										<div className="flex items-center justify-between">
											<div>
												<strong>Price</strong>
												<div className="text-xs text-secondary">Lower price is better (Green Check)</div>
											</div>
											<div className="ml-4">
												{renderIndicator(priceWinner, side, 'price')}
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div>
												<strong>Engine (cylinders)</strong>
												<div className="text-xs text-secondary">{p.specs?.['engine type'] ?? '—'}</div>
											</div>
											<div className="ml-4">
												{renderIndicator(engineWinner, side)}
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div>
												<strong>Displacement</strong>
												<div className="text-xs text-secondary">{p.specs?.['displacement (cc)'] ?? '—'} cc</div>
											</div>
											<div className="ml-4">
												{renderIndicator(dispWinner, side)}
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div>
												<strong>Fuel capacity</strong>
												<div className="text-xs text-secondary">{p.specs?.['fuel capacity'] ?? '—'}</div>
											</div>
											<div className="ml-4">
												{renderIndicator(fuelWinner, side)}
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div>
												<strong>Wheels</strong>
												<div className="text-xs text-secondary">{p.specs?.['wheels type'] ?? '—'}</div>
											</div>
											<div className="ml-4">
												{renderIndicator(wheelWinner, side)}
											</div>
										</div>
									</div>

									<div className="mt-4 flex gap-2">
										<button onClick={() => onRemove(p.id ?? p.name)} className="px-3 py-2 rounded-md border bg-background text-text">Remove</button>
									</div>
								</>
							) : (
								<div className="text-center text-secondary py-12">Select a bike to compare</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
