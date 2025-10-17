import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SignUpModal({ open = false, onClose = () => {}, onSignUp = () => {} }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (!open) {
            setName('')
            setEmail('')
            setPassword('')
            setConfirm('')
            setError('')
            setSuccess(false)
        }
    }, [open])

    useEffect(() => {
        if (!open) return
        const onKey = e => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    const submit = async e => {
        e.preventDefault()
        setError('')

        if (!name.trim() || !email.trim() || !password) {
            setError('Please fill the required fields.')
            return
        }

        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }

        setSubmitting(true)
        try {
            // simulate request
            await new Promise(r => setTimeout(r, 800))
            setSuccess(true)
            onSignUp({ name, email }) // inform parent if needed

            // auto close after short delay
            setTimeout(() => {
                setSubmitting(false)
                onClose()
            }, 1200)
        } catch (err) {
            setError('Failed to create account.')
            setSubmitting(false)
        }
    }

    // if not open we rely on AnimatePresence to unmount
    return (
        <AnimatePresence>
            {open && (
                // backdrop
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* panel */}
                    <motion.div
                        ref={ref}
                        onClick={e => e.stopPropagation()}
                        initial={{ opacity: 0, y: 12, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.99 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="relative w-full max-w-md bg-background rounded-xl overflow-hidden shadow-2xl p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-text">Create your account</h3>
                                <p className="text-sm text-secondary mt-1">
                                    Sign up to save favorites and checkout faster.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close signup"
                                className="text-text bg-background/0 hover:bg-background/5 rounded-md p-1"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
                            <label className="text-sm text-secondary">
                                Full name
                                <input
                                    className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                />
                            </label>

                            <label className="text-sm text-secondary">
                                Email
                                <input
                                    className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                />
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="text-sm text-secondary">
                                    Password
                                    <input
                                        className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </label>
                                <label className="text-sm text-secondary">
                                    Confirm
                                    <input
                                        className="mt-1 w-full px-3 py-2 border rounded-md bg-surface text-text"
                                        type="password"
                                        value={confirm}
                                        onChange={e => setConfirm(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </label>
                            </div>

                            {error && <div className="text-sm text-red-500">{error}</div>}
                            {success && <div className="text-sm text-green-500">Account created ✓</div>}

                            <div className="mt-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-95 disabled:opacity-60"
                                >
                                    {submitting ? 'Creating…' : 'Create account'}
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
                            By creating an account you agree to our{' '}
                            <a className="underline" href="#">Terms</a> and{' '}
                            <a className="underline" href="#">Privacy Policy</a>.
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
