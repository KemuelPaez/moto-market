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
			style={{
				position: 'fixed',
				inset: 0,
				background: 'rgba(0,0,0,0.4)',
				display: 'flex',
				justifyContent: 'flex-end',
				zIndex: 9999,
				padding: 16,
				boxSizing: 'border-box'
			}}
			onClick={onClose}
		>
			{/* panel */}
			<div
				onClick={e => e.stopPropagation()}
				style={{
					width: 360,
					maxHeight: '100%',
					background: '#fff',
					borderRadius: 8,
					overflow: 'auto',
					padding: 16,
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					gap: 12
				}}
			>
				{/* header */}
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h3 style={{ margin: 0 }}>Your Cart</h3>
					<button onClick={onClose} aria-label="Close" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20 }}>×</button>
				</div>

				{/* empty state */}
				{!hasItems && <div style={{ color: '#666' }}>Cart is empty.</div>}

				{/* items */}
				{items.map(item => {
					const key = item.id ?? `${item.brand}::${item.name}`
					return (
						<div key={key} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
							<img src={item.image} alt={item.name} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 4 }} />
							<div style={{ flex: 1 }}>
								<div style={{ fontWeight: 600 }}>{item.name}</div>
								<div style={{ color: '#666', fontSize: 13 }}>{item.brand} • ${item.price}</div>
								<div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
									<button
										onClick={() => onUpdateQty(key, Math.max(0, (item.qty || 1) - 1))}
										style={{ padding: '4px 8px' }}
										aria-label={`Decrease quantity of ${item.name}`}
									>
										−
									</button>
									<div style={{ minWidth: 24, textAlign: 'center' }}>{item.qty || 1}</div>
									<button
										onClick={() => onUpdateQty(key, (item.qty || 1) + 1)}
										style={{ padding: '4px 8px' }}
										aria-label={`Increase quantity of ${item.name}`}
									>
										+
									</button>
									<button
										onClick={() => onRemoveItem(key)}
										style={{ marginLeft: 'auto', padding: '4px 8px', color: '#b91c1c', border: '1px solid #fee2e2', background: '#fff' }}
									>
										Remove
									</button>
								</div>
							</div>
						</div>
					)
				})}

				{/* footer */}
				<div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: 12 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
						<div style={{ color: '#666' }}>Total</div>
						<div style={{ fontWeight: 700 }}>${total.toFixed(2)}</div>
					</div>
					<button
						onClick={() => onCheckout()}
						disabled={!hasItems}
						style={{
							width: '100%',
							padding: '10px 12px',
							background: hasItems ? '#111827' : '#e5e7eb',
							color: hasItems ? '#fff' : '#9ca3af',
							borderRadius: 6,
							border: 'none',
							cursor: hasItems ? 'pointer' : 'not-allowed'
						}}
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	)
}
