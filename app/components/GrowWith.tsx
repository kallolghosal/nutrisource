import Image from 'next/image'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

type ImageTileProps = {
    src: string
    alt: string
    className?: string
    priority?: boolean
}

function ImageTile({ src, alt, className = '', priority = false }: ImageTileProps) {
    return (
        <div className={`relative overflow-hidden bg-[#F4F4F4] ${className}`}>
            <Image
                alt={alt}
                src={src}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
            />
        </div>
    )
}

export default function GrowWith() {
    return (
        <div className={`${robotoCondensed.className} min-h-screen bg-white px-6 py-16 md:px-10 md:py-20 lg:px-14`}>
            <div className="mx-auto max-w-[1080px]">
                <h1 className="text-center text-4xl font-bold text-black md:text-5xl">Grow With Us</h1>

                <div className="mx-auto mt-12 max-w-[840px]">
                    <div className="grid gap-3 lg:grid-cols-[2.2fr_1fr_1fr]">
                        <div className="grid gap-3">
                            <ImageTile
                                src="/img/slider/6.jpg"
                                alt="Team members at work"
                                className="h-[300px]"
                                priority
                            />
                            <div className="grid gap-3 sm:grid-cols-2">
                                <ImageTile
                                    src="/img/slider/1.jpg"
                                    alt="Colleagues collaborating"
                                    className="h-[146px]"
                                />
                                <ImageTile
                                    src="/img/slider/4.jpg"
                                    alt="Discussion between colleagues"
                                    className="h-[146px]"
                                />
                            </div>
                        </div>

                        <div className="grid gap-3">
                            <ImageTile
                                src="/img/slider/2.jpg"
                                alt="Team member portrait"
                                className="h-[146px]"
                            />
                            <ImageTile
                                src="/img/slider/3.jpg"
                                alt="Office lounge space"
                                className="h-[300px]"
                            />
                        </div>

                        <div className="grid gap-3">
                            <ImageTile
                                src="/img/slider/5.jpg"
                                alt="People smiling in a meeting"
                                className="h-[300px]"
                            />

                            <button
                                type="button"
                                className="flex h-[146px] flex-col items-start justify-center bg-[#FF7B2C] px-5 text-left text-white transition hover:bg-[#f06d18]"
                            >
                                <span className="text-[1.05rem] font-semibold leading-none md:text-[1.25rem]">Join Us Now</span>
                                <span className="mt-3 inline-flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
