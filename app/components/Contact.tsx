import { Roboto_Condensed } from 'next/font/google'

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
        <div className="relative h-[390px] overflow-hidden rounded-[4px] bg-[#F5F5F5]">
            <div className="absolute inset-0 opacity-90">
                <div className="absolute left-[-8%] top-[6%] h-[10px] w-[68%] rotate-[82deg] rounded-full bg-white/95" />
                <div className="absolute left-[18%] top-[24%] h-[9px] w-[66%] rotate-[-7deg] rounded-full bg-white/95" />
                <div className="absolute left-[34%] top-[10%] h-[8px] w-[32%] rounded-full bg-white/95" />
                <div className="absolute left-[46%] top-[16%] h-[8px] w-[18%] rotate-[11deg] rounded-full bg-white/95" />
                <div className="absolute right-[7%] top-[-2%] h-[10px] w-[66%] rotate-[95deg] rounded-full bg-white/95" />
                <div className="absolute left-[52%] top-[47%] h-[7px] w-[58%] rotate-[-6deg] rounded-full bg-white/95" />
                <div className="absolute left-[-10%] top-[70%] h-[11px] w-[112%] rotate-[-10deg] rounded-full bg-white/95" />
                <div className="absolute left-[19%] top-[65%] h-[9px] w-[36%] rotate-[77deg] rounded-full bg-white/95" />
                <div className="absolute left-[66%] top-[54%] h-[7px] w-[55%] rotate-[82deg] rounded-full bg-white/95" />
                <div className="absolute left-[22%] top-[90%] h-[8px] w-[72%] rotate-[-10deg] rounded-full bg-white/95" />
                <div className="absolute left-[58%] top-[2%] h-full w-px bg-[#D4D4D4]" />
                <div className="absolute left-[46%] top-0 h-full w-px bg-[#E2E2E2]" />
                <div className="absolute top-[56%] h-px w-full bg-[#DADADA]" />
                <div className="absolute top-[73%] h-px w-full bg-[#E2E2E2]" />
            </div>

            <div className="absolute left-1/2 top-[43%] flex -translate-x-1/2 flex-col items-center">
                <div className="rounded-xl bg-[#FF7D2C] px-6 py-2 text-sm font-medium tracking-wide text-white shadow-sm">
                    HEAD OFFICE
                </div>
                <div className="mt-2 text-[#FF7D2C]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                        <path d="M12 22s7-7.33 7-13a7 7 0 1 0-14 0c0 5.67 7 13 7 13Zm0-9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5.5Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default function Contact() {
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
                                    <h3 className="text-[2rem] font-semibold leading-none text-[#2D2D2D]">Call</h3>
                                    <p className="mt-2 text-[1.15rem] text-[#666666]">+91 00000 00000</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <ContactInfoIcon type="mail" />
                                <div>
                                    <h3 className="text-[2rem] font-semibold leading-none text-[#2D2D2D]">Email</h3>
                                    <p className="mt-2 text-[1.15rem] text-[#666666]">contact@nutrisource.in</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-1">
                        <h1 className="text-5xl font-bold text-black md:text-[4rem]">Say Hi</h1>

                        <form className="mt-12 space-y-8">
                            <input
                                type="text"
                                placeholder="Name"
                                className="h-16 w-full rounded-[20px] bg-[#F9F9F9] px-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                            />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="h-16 w-full rounded-[20px] bg-[#F9F9F9] px-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                            />
                            <textarea
                                placeholder="Message"
                                rows={5}
                                className="w-full rounded-[20px] bg-[#F9F9F9] px-5 py-5 text-[1.25rem] text-[#7A7A7A] outline-none placeholder:text-[#7A7A7A]"
                            />
                            <button
                                type="button"
                                className="h-[72px] w-full rounded-[20px] bg-[#00A211] text-[2rem] font-medium text-white transition hover:bg-[#00910f]"
                            >
                                Send now
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
