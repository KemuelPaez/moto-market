import React from 'react'

export default function Footer() {
	return (
		<footer className="bg-secondary text-white p-8 mt-8 box-border">
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
					<h4 className="mb-2 text-lg font-bold">Customer Service</h4>
					<ul className="list-none p-0 m-0 mt-2">
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Help Center</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Contact Us</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Refund Policy</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Shipping Info</a>
						</li>
					</ul>
				</div>

				{/* About */}
				<div>
					<h4 className="mb-2 text-lg font-bold">About</h4>
					<ul className="list-none p-0 m-0 mt-2">
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">About Us</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Careers</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Socials</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white no-underline hover:text-accent">Policies</a>
						</li>
					</ul>
				</div>

				{/* Payment */}
				<div>
					<h4 className="mb-2 text-lg font-bold">Payment</h4>
					<ul className="list-none p-0 m-0 mt-2">
						<li className="mb-1">
							<a href="#" className="text-white  hover:text-accent ">PayPal</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white  hover:text-accent ">Credit / Debit Card</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white  hover:text-accent ">Apple Pay</a>
						</li>
						<li className="mb-1">
							<a href="#" className="text-white  hover:text-accent ">Google Pay</a>
						</li>
					</ul>
				</div>
			</div>

			{/* bottom note */}
			<div className="max-w-6xl mx-auto mt-4 text-white text-sm text-center">
				© {new Date().getFullYear()} Moto Store — All rights reserved.
			</div>
		</footer>
	)
}
