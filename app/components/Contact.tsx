'use client'

import { Roboto_Condensed } from 'next/font/google'
import { useState } from 'react'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

function ContactInfoIcon({ type }: { type: 'phone' | 'mail' }) {
    if (type === 'phone') {
        return (
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#00A211]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.61 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.44-1.27a2 2 0 0 1 2.11-.45c.85.28 1.74.49 2.64.61A2 2 0 0 1 22 16.92Z" />
            </svg>
        )
    }
    return (
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-[#00A211]" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            <path d="m22 6-10 7L2 6" />
            <path d="m2 18 7-7" />
            <path d="m22 18-7-7" />
        </svg>
    )
}

function MapCard() {
    return (
        <div className="relative h-[390px] overflow-hidden rounded-[4px]">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5183.827728938785!2d88.459606!3d22.621420999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02757c1463c3bd%3A0xa5296af0efb559f2!2sNutrisource%20India%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1777698429358!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nutrisource India Head Office"
                className="absolute inset-0 h-full w-full"
            />
        </div>
    )
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [formState, setFormState] = useState<FormState>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormState('submitting')
        setErrorMsg('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            })
            const data = await res.json()

            if (!res.ok) {
                setErrorMsg(data.error ?? 'Something went wrong.')
                setFormState('error')
            } else {
                setFormState('success')
                setName('')
                setEmail('')
                setMessage('')
            }
        } catch {
            setErrorMsg('Network error. Please try again.')
            setFormState('error')
        }
    }

    return (
        <div className={`${robotoCondensed.className} relative min-h-screen overflow-hidden bg-white px-6 py-16 md:px-10 lg:px-14`}>
            <div className="mx-auto max-w-[1280px]">
                <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
                    <div>
                        <MapCard />

                        <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-14">
                            <div className="flex items-center gap-4">
                                <ContactInfoIcon type="phone" />
                                <div>
                                    <h4 className="text-[1rem] font-semibold leading-none text-[#2D2D2D]">Call</h4>
                                    <p className="mt-2 text-[1rem] text-[#666666]">+91 00000 00000</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <ContactInfoIcon type="mail" />
                                <div>
                                    <h4 className="text-[1rem] font-semibold leading-none text-[#2D2D2D]">Email</h4>
                                    <p className="mt-2 text-[1rem] text-[#666666]">info@nutrisource.in</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-1">
                        <h1 className="text-5xl font-bold text-black md:text-[4rem]">Say Hi</h1>

                        {formState === 'success' ? (
                            <div className="mt-12 flex flex-col items-center rounded-[20px] bg-[#F0FAF0] px-8 py-14 text-center">
                                <svg viewBox="0 0 24 24" className="h-16 w-16 text-[#00A211]" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <path d="m9 11 3 3L22 4" />
                                </svg>
                                <h2 className="mt-6 text-3xl font-bold text-[#087E00]">Message Sent!</h2>
                                <p className="mt-4 text-lg text-[#444]">
                                    Thank you for reaching out. We&apos;ve sent a confirmation to your email and will get back to you shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setFormState('idle')}
                                    className="mt-8 rounded-[16px] border border-[#00A211] px-8 py-3 text-[1rem] font-semibold text-[#00A211] transition hover:bg-[#00A211] hover:text-white"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form className="mt-12 space-y-8" onSubmit={handleSubmit} noValidate>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-16 w-full rounded-[20px] bg-[#F9F9F9] px-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-16 w-full rounded-[20px] bg-[#F9F9F9] px-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                                />
                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="w-full rounded-[20px] bg-[#F9F9F9] px-5 py-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                                />

                                {formState === 'error' && (
                                    <p className="rounded-[12px] bg-red-50 px-5 py-3 text-[1rem] text-red-600">{errorMsg}</p>
                                )}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className="h-[72px] w-full max-w-[320px] rounded-[20px] bg-[#00A211] text-[2rem] font-medium text-white transition hover:bg-[#00910f] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {formState === 'submitting' ? 'Sending…' : 'Send now'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
