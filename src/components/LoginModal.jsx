import React, { useEffect, useRef, useState } from "react";

export default function LoginModal({ open = false, onClose = () => {}, onLogin = () => {} }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (!open) {
			setEmail("");
			setPassword("");
			setError("");
			setSubmitting(false);
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	const submit = async (e) => {
		e.preventDefault();
		setError("");
		if (!email.trim() || !password) {
			setError("Please enter email and password.");
			return;
		}
		setSubmitting(true);
		try {
			// simulate auth request
			await new Promise((r) => setTimeout(r, 700));
			// fake "success" — call parent handler
			onLogin({ email });
			setSubmitting(false);
			onClose();
		} catch (err) {
			setError("Login failed — try again.");
			setSubmitting(false);
		}
	};

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 z-[100] flex items-center justify-center p-4"
			aria-modal="true"
			role="dialog"
		>
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
			<div
				ref={ref}
				onClick={(e) => e.stopPropagation()}
				className="relative w-full max-w-md bg-background rounded-xl overflow-hidden shadow-2xl p-6"
			>
				<div className="flex items-start justify-between gap-4">
					<div>
						<h3 className="text-xl font-semibold text-text">
							Sign in to your account
						</h3>
						<p className="text-sm text-secondary mt-1">
							Access saved favorites and faster checkout.
						</p>
					</div>
					<button
						onClick={onClose}
						aria-label="Close login"
						className="text-text bg-background/0 hover:bg-background/5 rounded-md p-1"
					>
						×
					</button>
				</div>

				<form onSubmit={submit} className="mt-4 flex flex-col gap-3">
					<label className="text-sm text-secondary">
						Email
						<input
							className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							autoFocus
						/>
					</label>

					<label className="text-sm text-secondary">
						Password
						<input
							className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
						/>
					</label>

					{error && <div className="text-sm text-red-500">{error}</div>}

					<div className="mt-2 flex gap-2">
						<button
							type="submit"
							disabled={submitting}
							className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-95 disabled:opacity-60"
						>
							{submitting ? "Signing in…" : "Sign in"}
						</button>
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg bg-background text-text border hover:shadow-sm"
						>
							Cancel
						</button>
					</div>
				</form>

				<div className="mt-4 text-xs text-secondary">
					Need an account? Use Sign Up in the top bar.
				</div>
			</div>
		</div>
	);
}

