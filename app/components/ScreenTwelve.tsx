'use client'

import Image from 'next/image'
import { Roboto_Condensed } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

const offeringButtons = ['Products', 'Advisory', 'Services', 'Technology', 'Support']

const offeringSections = [
    { id: 'santa-1', imageSrc: '/img/santa1.png', imageWidth: 406, imageHeight: 728 },
    { id: 'santa-2', imageSrc: '/img/santa2.png', imageWidth: 602, imageHeight: 599 },
    { id: 'santa-3', imageSrc: '/img/santa3.png', imageWidth: 406, imageHeight: 724 },
    { id: 'santa-4', imageSrc: '/img/santa4.png', imageWidth: 393, imageHeight: 724 },
    { id: 'santa-5', imageSrc: '/img/santa5.png', imageWidth: 393, imageHeight: 718 },
]

type OfferingSectionProps = {
    activeSection: number
}

function OfferingSection({ activeSection }: OfferingSectionProps) {
    return (
        <div>
            <div className="rounded-[32px] px-6 py-8 shadow-[0_20px_48px_rgba(0,0,0,0.16)] md:px-8 md:py-10 lg:px-10">
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[380px_minmax(0,1fr)_320px] lg:items-center lg:gap-10">
                    <div className="flex flex-col items-center">
                        <Image
                            alt="Farmsanta app"
                            src="/img/home-santa.png"
                            width={370}
                            height={452}
                            className="h-auto w-[260px] shrink-0 md:w-[380px]"
                        />
                        <button
                            className="mt-4 rounded-full bg-green-600 px-5 py-2 text-base font-semibold text-white transition hover:bg-green-700"
                            type="button"
                        >
                            Download App
                        </button>
                    </div>

                    <div className="flex min-w-0 max-w-full flex-col items-start">
                        <Image
                            alt="Farmsanta logo"
                            src="/img/farmsanta-logo.png"
                            width={307}
                            height={102}
                            className="h-auto w-[180px] md:w-[240px]"
                        />
                        <div className="mt-6 w-full rounded-[24px] border border-white/20 bg-white/10 p-5 text-black md:p-6">
                            <p className="text-lg leading-relaxed md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat, nibh sed
                                faucibus tincidunt, nibh arcu efficitur sem, vitae porta augue nisl sed nibh. Vivamus
                                tincidunt sem vel sapien feugiat, a ultricies magna dictum.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        {/* Stack all images; crossfade by toggling opacity — no remount */}
                        <div className="relative h-[220px] w-[150px] shrink-0 md:h-[300px] md:w-[220px]">
                            {offeringSections.map((sec, idx) => (
                                <Image
                                    key={sec.id}
                                    alt="Offerings visual"
                                    src={sec.imageSrc}
                                    width={sec.imageWidth}
                                    height={sec.imageHeight}
                                    className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
                                    style={{ opacity: activeSection === idx ? 1 : 0 }}
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex w-full max-w-[300px] flex-wrap justify-center gap-3">
                            {offeringButtons.map((label) => (
                                <button
                                    key={label}
                                    className="rounded-full bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                                    type="button"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ScreenTwelve() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const lastStepAtRef = useRef(0)
    const [activeSection, setActiveSection] = useState(-1)
    const stepCooldownMs = 520

    const isSectionActive = () => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return false
        return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
    }

    const canStepNow = () => Date.now() - lastStepAtRef.current > stepCooldownMs

    useEffect(() => {
        const onScroll = () => {
            const rect = sectionRef.current?.getBoundingClientRect()
            if (!rect) return

            const entersViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.2

            if (entersViewport && activeSection === -1) {
                setActiveSection(0)
                lastStepAtRef.current = Date.now()
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [activeSection])

    useEffect(() => {
        const onWheel = (event: WheelEvent) => {
            if (!isSectionActive()) return
            if (Math.abs(event.deltaY) < 10) return
            if (!canStepNow()) return

            if (event.deltaY > 0 && activeSection >= 0 && activeSection < offeringSections.length - 1) {
                event.preventDefault()
                event.stopPropagation()
                setActiveSection((prev) => Math.min(prev + 1, offeringSections.length - 1))
                lastStepAtRef.current = Date.now()
                return
            }

            if (event.deltaY < 0 && activeSection > 0) {
                event.preventDefault()
                event.stopPropagation()
                setActiveSection((prev) => Math.max(prev - 1, 0))
                lastStepAtRef.current = Date.now()
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSectionActive()) return
            if (!canStepNow()) return

            if ((event.key === 'ArrowDown' || event.key === 'PageDown') && activeSection >= 0 && activeSection < offeringSections.length - 1) {
                event.preventDefault()
                event.stopPropagation()
                setActiveSection((prev) => Math.min(prev + 1, offeringSections.length - 1))
                lastStepAtRef.current = Date.now()
                return
            }

            if ((event.key === 'ArrowUp' || event.key === 'PageUp') && activeSection > 0) {
                event.preventDefault()
                event.stopPropagation()
                setActiveSection((prev) => Math.max(prev - 1, 0))
                lastStepAtRef.current = Date.now()
            }
        }

        window.addEventListener('wheel', onWheel, { passive: false, capture: true })
        window.addEventListener('keydown', onKeyDown, { capture: true })

        return () => {
            window.removeEventListener('wheel', onWheel, { capture: true })
            window.removeEventListener('keydown', onKeyDown, { capture: true })
        }
    }, [activeSection])

    return (
        <div ref={sectionRef} className={`${robotoCondensed.className} min-h-screen w-full overflow-x-hidden p-4 pt-24 md:pt-28`}>
            <div className="mx-auto mt-10 w-full max-w-[1400px]">
                {activeSection >= 0 ? (
                    <OfferingSection activeSection={activeSection} />
                ) : null}
            </div>
        </div>
    )
}
