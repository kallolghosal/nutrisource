"use client"

import Image from 'next/image'
import { useRef } from 'react'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

export default function ScreenEight() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const sliderImages = Array.from({ length: 11 }, (_, idx) => `/img/slider/${idx + 1}.jpg`)

    const scrollByCard = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return

        const cardWidth = 266
        const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }

    return (
        <div className={`${robotoCondensed.className} overflow-x-hidden min-h-screen w-full items-center justify-center p-4 pt-24 md:pt-28`}>
            <h1 className="mx-8 text-center text-4xl font-bold text-black md:text-6xl">Organization we built</h1>
            <p className="mx-8 mt-4 text-center text-2xl md:text-2xl">Inclusive Business Model driven by passion, knowledge, SDG goals and delivering excellence</p>

            <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2">
                {/* <div className="mx-auto mb-4 flex w-[70vw] items-center justify-end gap-2">
                    <button
                        aria-label="Scroll slider left"
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        onClick={() => scrollByCard('left')}
                        type="button"
                    >
                        Prev
                    </button>
                    <button
                        aria-label="Scroll slider right"
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        onClick={() => scrollByCard('right')}
                        type="button"
                    >
                        Next
                    </button>
                </div> */}

                <div
                    className="flex snap-x snap-mandatory gap-4 mt-30 overflow-x-auto px-[15vw] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    ref={sliderRef}
                >
                    {sliderImages.map((src) => (
                        <div className="snap-start shrink-0" key={src}>
                            <Image
                                alt="Organization slide"
                                className="h-[270px] w-[250px] rounded-xl object-cover"
                                height={270}
                                src={src}
                                width={250}
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 z-20 flex flex-col items-center">
                    <Image
                        alt="Santa"
                        className="pointer-events-none h-auto w-[410px] md:w-[410px]"
                        height={452}
                        src="/img/home-santa.png"
                        width={370}
                    />
                    <button
                        className="rounded-full bg-green-600 px-5 py-2 text-base font-semibold text-white transition hover:bg-green-700"
                        type="button"
                    >
                        Download App
                    </button>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-[10vw] bg-gradient-to-r from-white/90 via-white/55 to-transparent backdrop-blur-sm" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[10vw] bg-gradient-to-l from-white/90 via-white/55 to-transparent backdrop-blur-sm" />
            </div>
            <p className="mx-auto mt-4 w-[60vw] text-center text-2xl md:text-2xl">NutriSource is redefining agriculture through Optimal Nutrition Management, Innovative & Cutting Edge Digital Technology and Real Time Advisory Services to improve millions of lives of marginal farmers by providing Product, Knowledge, Technology and Services at their doorstep.</p>
            <button className="mx-auto mt-8 block rounded-full bg-green-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-green-700" type="button">Know More</button>
        </div>
    )
}