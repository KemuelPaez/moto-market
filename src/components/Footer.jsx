import React from 'react'

export default function Footer() {
	return (
		<footer
			style={{
				background: '#0f172a',
				color: '#e6eef8',
				padding: '32px 16px',
				boxSizing: 'border-box',
				marginTop: 32
			}}
		>
			<div
				style={{
					maxWidth: 1200,
					margin: '0 auto',
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
					gap: 24,
					alignItems: 'start'
				}}
			>
				{/* Customer Service */}
				<div>
					<h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Customer Service</h4>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 8 }}>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Help Center</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Contact Us</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Refund Policy</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Shipping Info</a>
						</li>
					</ul>
				</div>

				{/* About */}
				<div>
					<h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 700 }}>About</h4>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 8 }}>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>About Us</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Careers</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Socials</a>
						</li>
						<li style={{ marginBottom: 6 }}>
							<a href="#" style={{ color: '#cfe8ff', textDecoration: 'none' }}>Policies</a>
						</li>
					</ul>
				</div>

				{/* Payment */}
				<div>
					<h4 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Payment</h4>
					<ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: 8 }}>
						<li style={{ marginBottom: 6 }}>
							<span style={{ color: '#cfe8ff' }}>PayPal</span>
						</li>
						<li style={{ marginBottom: 6 }}>
							<span style={{ color: '#cfe8ff' }}>Credit / Debit Card</span>
						</li>
						<li style={{ marginBottom: 6 }}>
							<span style={{ color: '#cfe8ff' }}>Apple Pay</span>
						</li>
						<li style={{ marginBottom: 6 }}>
							<span style={{ color: '#cfe8ff' }}>Google Pay</span>
						</li>
					</ul>
				</div>
			</div>

			{/* bottom note */}
			<div style={{ maxWidth: 1200, margin: '18px auto 0', color: '#94a3b8', fontSize: 13, textAlign: 'center' }}>
				© {new Date().getFullYear()} Moto Store — All rights reserved.
			</div>
		</footer>
	)
}
