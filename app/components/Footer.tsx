'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    display: 'swap',
})

const menuLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Organization', href: '#organization' },
    { label: 'Our Passion', href: '#passion' },
    { label: 'Capabilities', href: '#capability' },
    { label: 'Offerings', href: '#offerings' },
    { label: 'FarmSanta', href: '#farmsanta' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#sayhi' },
]

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    )
}

function TwitterIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M4 4l16 16M4 20 20 4" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M2 4h6l4 5.5L16 4h6L14 13l8 7h-6l-4.5-5.5L8 20H2l8-9z" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    )
}

function YouTubeIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#166534" />
        </svg>
    )
}

const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/people/NutriSource-India-Pvt-Ltd/61587579579111/', Icon: FacebookIcon },
    { label: 'Instagram', href: 'https://www.instagram.com/nutrisource_india/', Icon: InstagramIcon },
    { label: 'Twitter / X', href: 'https://twitter.com', Icon: TwitterIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F111461016%2Fadmin%2Fpage-posts%2Fpublished%2F', Icon: LinkedInIcon },
    { label: 'YouTube', href: 'https://www.youtube.com/@NutrisourceIndia', Icon: YouTubeIcon },
]

export default function Footer() {
    return (
        <footer className={`${robotoCondensed.className} bg-[#0a2e0a] text-white`}>
            <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 lg:px-14">
                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">

                    {/* Brand column */}
                    <div>
                        <Image
                            src="/img/nutrisource-logo.png"
                            alt="Nutrisource India"
                            width={200}
                            height={56}
                            className="h-auto w-[360px] brightness-0 invert"
                        />
                        {/* <p className="mt-5 text-[0.95rem] leading-relaxed text-white/70">
                            Nutrisource India Pvt. Ltd. is an agri-input solutions company committed to empowering farmers
                            with world-class products, knowledge, and technology. Through our FarmSanta platform we
                            connect growers with expert advisors, precision inputs, and seamless digital services —
                            making modern agriculture accessible to every Indian farmer.
                        </p> */}

                        {/* Social icons */}
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#7CBB0E] hover:text-white"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-widest text-[#7CBB0E]">Quick Links</h3>
                        <ul className="mt-5 space-y-3">
                            {menuLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-[0.95rem] text-white/70 transition hover:text-[#7CBB0E]"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter + contact */}
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-widest text-[#7CBB0E]">Stay Updated</h3>
                        <p className="mt-3 text-[0.9rem] text-white/60">
                            Subscribe to our newsletter for the latest agri news, product updates, and expert tips.
                        </p>
                        <form className="mt-4 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="h-11 w-full rounded-[10px] bg-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/15"
                            />
                            <button
                                type="submit"
                                className="h-11 w-full rounded-[10px] bg-[#7CBB0E] text-sm font-semibold text-white transition hover:bg-[#6aaa0b]"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-[#7CBB0E]">Contact</h3>
                            <p className="mt-3 text-[0.9rem] leading-relaxed text-white/60">
                                Nutrisource India Pvt. Ltd.<br />
                                Kolkata, West Bengal, India<br />
                                <a href="tel:03348126531" className="hover:text-[#7CBB0E]">033 4812 6531</a><br />
                                <a href="mailto:contact@nutrisource.in" className="hover:text-[#7CBB0E]">contact@nutrisource.in</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 border-t border-white/10 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="text-[0.82rem] text-white/40">
                        &copy; {new Date().getFullYear()} Nutrisource India Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-[0.82rem] text-white/50">
                        <Link href="/privacy-policy" className="transition hover:text-[#7CBB0E]">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-conditions" className="transition hover:text-[#7CBB0E]">
                            Terms &amp; Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
