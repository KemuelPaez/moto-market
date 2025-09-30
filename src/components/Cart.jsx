import React from 'react'

export default function Cart({
	open = false,
	onClose = () => {},
	items = [],
	onRemoveItem = () => {},
	onUpdateQty = () => {},
	onCheckout = () => {}
}) {
	if (!open) return null

	const total = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0)
	const hasItems = (items && items.length > 0)

	return (
		<div
			aria-modal="true"
			role="dialog"
			className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50 p-16 box-border"
			onClick={onClose}
		>
			{/* panel */}
			<div
				onClick={e => e.stopPropagation()}
				className="bg-background rounded-lg overflow-auto p-4 box-border flex flex-col gap-3"
				style={{ 
					width: '360px',
					maxHeight: '100%' 
				}}
			>
				{/* header */}
				<div className="flex justify-between items-center">
					<h3 className="m-0">Your Cart</h3>
					<button onClick={onClose} aria-label="Close" className="border-none bg-transparent cursor-pointer text-xl">×</button>
				</div>

				{/* empty state */}
				{!hasItems && <div className="text-secondary">Cart is empty.</div>}

				{/* items */}
				{items.map(item => {
					const key = item.id ?? `${item.brand}::${item.name}`
					return (
						<div key={key} className="flex gap-3 items-center">
							<img src={item.image} alt={item.name} className="w-16 h-12 object-cover rounded" />
							<div className="flex-1">
								<div className="font-semibold">{item.name}</div>
								<div className="text-secondary text-sm">{item.brand} • ${item.price}</div>
								<div className="mt-2 flex gap-2 items-center">
									<button
										onClick={() => onUpdateQty(key, Math.max(0, (item.qty || 1) - 1))}
										className="px-2 py-1"
										aria-label={`Decrease quantity of ${item.name}`}
									>
										−
									</button>
									<div className="min-w-6 text-center">{item.qty || 1}</div>
									<button
										onClick={() => onUpdateQty(key, (item.qty || 1) + 1)}
										className="px-2 py-1"
										aria-label={`Increase quantity of ${item.name}`}
									>
										+
									</button>
									<button
										onClick={() => onRemoveItem(key)}
										className="ml-auto px-2 py-1 text-red-500 border border-red-200 bg-background"
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					)
				})}

				{/* footer */}
				<div className="mt-auto border-t border-gray-300 pt-3">
					<div className="flex justify-between mb-2">
						<div className="text-secondary">Total</div>
						<div className="font-bold">${total.toFixed(2)}</div>
					</div>
					<button
						onClick={() => onCheckout()}
						disabled={!hasItems}
						className={`w-full p-2.5 rounded-md border-none ${hasItems ? 'bg-text text-white cursor-pointer' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	)
}
