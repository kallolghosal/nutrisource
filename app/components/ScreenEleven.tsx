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

type OfferingsCardProps = {
    title: string
    subtitle: string
    body?: React.ReactNode
    imageSrc: string
    imageWidth: number
    imageHeight: number
    imageClassName: string
    className?: string
    style?: React.CSSProperties
}

function OfferingsCard({
    title,
    subtitle,
    body,
    imageSrc,
    imageWidth,
    imageHeight,
    imageClassName,
    className = '',
    style,
}: OfferingsCardProps) {
    return (
        <div
            className={`flex min-h-[487px] w-full items-center justify-between gap-6 rounded-[32px] px-6 py-8 md:px-20 md:py-12 ${className}`.trim()}
            style={{
                background: 'linear-gradient(180deg, #7CBB0E 0%, #087E00 100%)',
                ...style,
            }}
        >
            <div className="max-w-[430px]">
                <h1 className="text-left text-4xl font-bold text-white md:text-4xl">{title}</h1>
                <p className="mt-2 text-left text-2xl text-white md:text-2xl">{subtitle}</p>
                {body ? <div className="mt-12 text-left text-2xl text-white md:text-2xl">{body}</div> : null}
            </div>

            <Image
                alt={title}
                src={imageSrc}
                width={imageWidth}
                height={imageHeight}
                className={imageClassName}
            />
        </div>
    )
}

export default function ScreenEleven() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const lastStepAtRef = useRef(0)
    const [cardStage, setCardStage] = useState(0)
    const maxCardStage = 3
    // Cooldown must exceed card CSS transition duration (500ms) to prevent jerk on rapid input
    const stepCooldownMs = 520

    const isSectionActive = () => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return false
        return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
    }

    const canStepNow = () => Date.now() - lastStepAtRef.current > stepCooldownMs

    useEffect(() => {
        const onWheel = (event: WheelEvent) => {
            if (!isSectionActive()) return
            if (Math.abs(event.deltaY) < 10) return
            if (!canStepNow()) return

            if (event.deltaY > 0 && cardStage < maxCardStage) {
                event.preventDefault()
                event.stopPropagation()
                setCardStage((prev) => Math.min(prev + 1, maxCardStage))
                lastStepAtRef.current = Date.now()
                return
            }

            if (event.deltaY < 0 && cardStage > 0) {
                event.preventDefault()
                event.stopPropagation()
                setCardStage((prev) => Math.max(prev - 1, 0))
                lastStepAtRef.current = Date.now()
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSectionActive()) return
            if (!canStepNow()) return

            if ((event.key === 'ArrowDown' || event.key === 'PageDown') && cardStage < maxCardStage) {
                event.preventDefault()
                event.stopPropagation()
                setCardStage((prev) => Math.min(prev + 1, maxCardStage))
                lastStepAtRef.current = Date.now()
                return
            }

            if ((event.key === 'ArrowUp' || event.key === 'PageUp') && cardStage > 0) {
                event.preventDefault()
                event.stopPropagation()
                setCardStage((prev) => Math.max(prev - 1, 0))
                lastStepAtRef.current = Date.now()
            }
        }

        window.addEventListener('wheel', onWheel, { passive: false, capture: true })
        window.addEventListener('keydown', onKeyDown, { capture: true })

        return () => {
            window.removeEventListener('wheel', onWheel, { capture: true })
            window.removeEventListener('keydown', onKeyDown, { capture: true })
        }
    }, [cardStage])

    return (
        <div ref={sectionRef} className={`${robotoCondensed.className} overflow-x-hidden min-h-screen w-full items-center justify-center p-4 pt-24 md:pt-28`}>
            <h1 className="mx-8 text-center text-4xl font-bold text-black md:text-4xl">Our Inclusive Offerings</h1>
            <p className="mt-4 text-center text-black md:text-xl">Diagnose- Advise-Solution- Deliver - all at one place: Accurate, Seamless, Fast and Cost Effective!</p>

            <div className="relative mx-auto mt-8 w-full max-w-[787px]">
                <div className="absolute right-full top-1/2 mr-4 flex w-[380px] -translate-y-1/2 flex-col items-center md:mr-8">
                    <Image
                        alt="Farmsanta"
                        src="/img/home-santa.png"
                        width={370}
                        height={452}
                        className="h-auto w-full shrink-0"
                    />
                    <button
                        className="mt-4 rounded-full bg-green-600 px-5 py-2 text-base font-semibold text-white transition hover:bg-green-700"
                        type="button"
                    >
                        Download App
                    </button>
                </div>

                <div className="relative min-h-[517px] w-full">
                    <OfferingsCard
                        title="PRODUCTS"
                        subtitle="Complete Agri Input Portfolio"
                        body={
                            <>
                                Fertilizer
                                <br />
                                Agrochemicals
                                <br />
                                Biologicals
                                <br />
                                Specialities and water soluble fertilizers
                            </>
                        }
                        imageSrc="/img/offerings1.png"
                        imageWidth={206}
                        imageHeight={335}
                        imageClassName="h-auto w-[190px] shrink-0 md:w-[250px]"
                    />

                    <OfferingsCard
                        title="KNOWLEDGE"
                        subtitle="On ground and online 24x7 expert knowledge support"
                        imageSrc="/img/offerings2.png"
                        imageWidth={206}
                        imageHeight={335}
                        imageClassName="h-auto w-[190px] shrink-0 md:w-[250px]"
                        className="absolute inset-x-0 top-[10px] z-10 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-500"
                        style={{
                            opacity: cardStage >= 1 ? 1 : 0,
                            transform: `translateY(${cardStage >= 1 ? 0 : 32}px)`,
                            pointerEvents: cardStage >= 1 ? 'auto' : 'none',
                        }}
                    />

                    <OfferingsCard
                        title="SERVICE"
                        subtitle="24x7 advisory services through best in class Agritech Platform"
                        imageSrc="/img/offerings3.png"
                        imageWidth={206}
                        imageHeight={335}
                        imageClassName="h-auto w-[190px] shrink-0 md:w-[250px]"
                        className="absolute inset-x-0 top-[20px] z-20 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-500"
                        style={{
                            opacity: cardStage >= 2 ? 1 : 0,
                            transform: `translateY(${cardStage >= 2 ? 0 : 32}px)`,
                            pointerEvents: cardStage >= 2 ? 'auto' : 'none',
                        }}
                    />

                    <OfferingsCard
                        title="TECHNOLOGY"
                        subtitle="best in class digital platform and technology interface"
                        imageSrc="/img/offerings4.png"
                        imageWidth={206}
                        imageHeight={335}
                        imageClassName="h-auto w-[190px] shrink-0 md:w-[250px]"
                        className="absolute inset-x-0 top-[30px] z-30 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-500"
                        style={{
                            opacity: cardStage >= 3 ? 1 : 0,
                            transform: `translateY(${cardStage >= 3 ? 0 : 32}px)`,
                            pointerEvents: cardStage >= 3 ? 'auto' : 'none',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
