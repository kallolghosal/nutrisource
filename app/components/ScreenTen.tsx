"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Roboto_Condensed } from "next/font/google"

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

export default function ScreenTen() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [stage, setStage] = useState(0)
    const lastStepAtRef = useRef(0)

    const isSectionActive = () => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return false
        return rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1
    }

    const canStepNow = () => Date.now() - lastStepAtRef.current > 220

    useEffect(() => {
        const onScroll = () => {
            const el = sectionRef.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const entersViewport = rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.2

            if (entersViewport && stage === 0) {
                setStage(1)
                lastStepAtRef.current = Date.now()
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        onScroll()

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [stage])

    useEffect(() => {
        const onWheel = (event: WheelEvent) => {
            if (!isSectionActive()) return
            if (Math.abs(event.deltaY) < 10) return
            if (!canStepNow()) return

            // Reveal one-by-one on scroll down.
            if (event.deltaY > 0 && stage < 6) {
                event.preventDefault()
                event.stopPropagation()
                setStage((prev) => Math.min(prev + 1, 6))
                lastStepAtRef.current = Date.now()
                return
            }

            // Hide one-by-one on scroll up before leaving to previous screen.
            if (event.deltaY < 0 && stage > 0) {
                event.preventDefault()
                event.stopPropagation()
                setStage((prev) => Math.max(prev - 1, 0))
                lastStepAtRef.current = Date.now()
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSectionActive()) return
            if (!canStepNow()) return

            if (event.key === "ArrowDown" || event.key === "PageDown") {
                if (stage < 6) {
                    event.preventDefault()
                    event.stopPropagation()
                    setStage((prev) => Math.min(prev + 1, 6))
                    lastStepAtRef.current = Date.now()
                }
                return
            }

            if (event.key === "ArrowUp" || event.key === "PageUp") {
                if (stage > 0) {
                    event.preventDefault()
                    event.stopPropagation()
                    setStage((prev) => Math.max(prev - 1, 0))
                    lastStepAtRef.current = Date.now()
                }
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false, capture: true })
        window.addEventListener("keydown", onKeyDown, { capture: true })

        return () => {
            window.removeEventListener("wheel", onWheel, { capture: true })
            window.removeEventListener("keydown", onKeyDown, { capture: true })
        }
    }, [stage])

    const showLeft = stage >= 1
    const showRight = stage >= 2
    const showTopLeft = stage >= 3
    const showTopRight = stage >= 4
    const showTopMostLeft = stage >= 5
    const showTopMostRight = stage >= 6

    return (
        <div ref={sectionRef} className={`${robotoCondensed.className} relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-white p-4 pt-24 md:pt-28`}>
            <h1 className="mx-8 mt-20 text-center text-4xl font-bold text-black md:text-4xl">Capability @ Core</h1>

            <div className="absolute bottom-52 left-1/2 flex w-[calc(100%-2rem)] max-w-[1220px] -translate-x-1/2 items-end justify-center gap-[20px] md:bottom-[34rem]">
                <div
                    className="flex w-1/2 items-start justify-end gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showTopMostLeft ? 1 : 0,
                        transform: `translateX(${showTopMostLeft ? 0 : -36}px)`,
                    }}
                >
                    <p className="max-w-[320px] translate-y-[200px] text-left text-black md:translate-y-[512px] md:text-xl">Dedicated and expert team to deliver impact and excellence</p>
                    <Image
                        src={'/img/leaf6.png'}
                        alt="Capability Image 6"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 translate-y-[200px] md:w-[210px] md:translate-y-[512px]"
                    />
                </div>

                <div
                    className="flex w-1/2 items-start gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showTopMostRight ? 1 : 0,
                        transform: `translateX(${showTopMostRight ? 0 : 36}px)`,
                    }}
                >
                    <Image
                        src={'/img/leaf5.png'}
                        alt="Capability Image 5"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 translate-y-[200px] md:w-[210px] md:translate-y-[442px]"
                    />
                    <p className="max-w-[320px] translate-y-[200px] text-left text-black md:translate-y-[442px] md:text-xl">Best in quality products and services</p>
                </div>
            </div>

            <div className="absolute bottom-44 left-1/2 flex w-[calc(100%-2rem)] max-w-[1220px] -translate-x-1/2 items-end justify-center gap-[20px] md:bottom-[28rem]">
                <div
                    className="flex w-1/2 items-start justify-end gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showTopLeft ? 1 : 0,
                        transform: `translateX(${showTopLeft ? 0 : -36}px)`,
                    }}
                >
                    <p className="max-w-[320px] translate-y-[144px] text-left text-black md:translate-y-[320px] md:text-xl">Robust knowledge on agriculture and operating geography</p>
                    <Image
                        src={'/img/leaf3.png'}
                        alt="Capability Image 3"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 translate-y-[144px] md:w-[210px] md:translate-y-[320px]"
                    />
                </div>

                <div
                    className="flex w-1/2 items-start gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showTopRight ? 1 : 0,
                        transform: `translateX(${showTopRight ? 0 : 36}px)`,
                    }}
                >
                    <Image
                        src={'/img/leaf4.png'}
                        alt="Capability Image 4"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 translate-y-[144px] md:w-[210px] md:translate-y-[320px]"
                    />
                    <p className="max-w-[320px] translate-y-[144px] text-left text-black md:translate-y-[320px] md:text-xl">Best in class digital technology platform</p>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex w-[calc(100%-2rem)] max-w-[1220px] -translate-x-1/2 items-end justify-center gap-[20px] md:bottom-32">
                <div
                    className="flex w-1/2 items-start justify-end gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showLeft ? 1 : 0,
                        transform: `translateX(${showLeft ? 0 : -36}px)`,
                    }}
                >
                    <p className="text-left text-start text-black md:text-xl">Passion to create impact and improve rural livelihoods</p>
                    <Image
                        src={'/img/leaf1.png'}
                        alt="Capability Image"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 md:w-[210px]"
                    />
                </div>

                <div
                    className="flex w-1/2 items-start gap-4 transition-all duration-500 md:gap-6"
                    style={{
                        opacity: showRight ? 1 : 0,
                        transform: `translateX(${showRight ? 0 : 36}px)`,
                    }}
                >
                    <Image
                        src={'/img/leaf2.png'}
                        alt="Capability Image 2"
                        width={213}
                        height={248}
                        className="h-auto w-[120px] shrink-0 md:w-[210px]"
                    />
                    <p className="max-w-[320px] text-left text-black md:text-xl">Global expertise in agri business domain for over 30 years</p>
                </div>
            </div>
        </div>
    )
}
