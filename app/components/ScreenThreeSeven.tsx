"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const fadeIn = (progress: number, start: number, end: number) => {
    if (progress <= start) return 0
    if (progress >= end) return 1
    return (progress - start) / (end - start)
}

export default function ScreenThreeSeven() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const growRef = useRef<HTMLSpanElement>(null)
    const withRef = useRef<HTMLSpanElement>(null)
    const growthRef = useRef<HTMLSpanElement>(null)
    const cropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let rafId: number
        let lastProgress = -1

        const applyProgress = (progress: number) => {
            if (growRef.current) growRef.current.style.opacity = String(fadeIn(progress, 0.22, 0.38))
            if (withRef.current) withRef.current.style.opacity = String(fadeIn(progress, 0.48, 0.64))
            if (growthRef.current) growthRef.current.style.opacity = String(fadeIn(progress, 0.74, 0.9))
            if (cropRef.current) {
                const cropOpacity = fadeIn(progress, 0.14, 0.34)
                const cropScale = 0.86 + 0.14 * clamp((progress - 0.14) / 0.2, 0, 1)
                cropRef.current.style.opacity = String(cropOpacity)
                cropRef.current.style.transform = `scale(${cropScale})`
            }
        }

        const tick = () => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const travelDistance = rect.height - window.innerHeight
            const progress = travelDistance > 0 ? clamp(-rect.top / travelDistance, 0, 1) : 0

            // Only update DOM if progress actually changed
            if (Math.abs(progress - lastProgress) > 0.0001) {
                applyProgress(progress)
                lastProgress = progress
            }
            rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(rafId)
    }, [])

    // Intercept PageDown/ArrowDown while the sticky section is active so the
    // transition plays out the same way as wheel scroll instead of jumping sections.
    useEffect(() => {
        const STEP = window.innerHeight // 1vh per keypress → 4 presses to traverse 500vh section
        let lastKeyAt = 0
        const KEY_COOLDOWN = 700 // ms — let Lenis settle between presses

        const isSticky = () => {
            const el = sectionRef.current
            if (!el) return false
            const { top, bottom } = el.getBoundingClientRect()
            return top <= 0 && bottom >= window.innerHeight
        }

        const getProgress = () => {
            const el = sectionRef.current
            if (!el) return 0
            const { top, height } = el.getBoundingClientRect()
            const travel = height - window.innerHeight
            return travel > 0 ? clamp(-top / travel, 0, 1) : 0
        }

        const onKeyDown = (event: KeyboardEvent) => {
            const isDown = event.key === 'PageDown' || event.key === 'ArrowDown'
            const isUp = event.key === 'PageUp' || event.key === 'ArrowUp'
            if (!isDown && !isUp) return
            if (!isSticky()) return

            const progress = getProgress()

            // At the very end going down, or very start going up — let LenisProvider
            // handle it so the page advances to the next/previous section normally.
            if (isDown && progress >= 0.98) return
            if (isUp && progress <= 0.02) return

            // Consume the event so LenisProvider's bubble-phase handler never fires
            event.preventDefault()
            event.stopPropagation()

            const now = Date.now()
            if (now - lastKeyAt < KEY_COOLDOWN) return
            lastKeyAt = now

            const lenis = (window as unknown as Record<string, unknown>).__lenis as
                | { scrollTo: (target: number, opts?: Record<string, unknown>) => void }
                | undefined
            if (!lenis) return

            lenis.scrollTo(window.scrollY + (isDown ? STEP : -STEP), { duration: 0.9 })
        }

        window.addEventListener('keydown', onKeyDown, { capture: true })
        return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
    }, [])

    return (
        <div ref={sectionRef} className="relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/bg-cloud3.png')] bg-cover bg-center" />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-5 px-4 pt-24 md:pt-28">
                    <h1 className="mx-8 text-center text-4xl font-bold text-black md:text-8xl">
                        <span ref={growRef} style={{ opacity: 0 }}>Grow</span>{" "}
                        <span ref={withRef} style={{ opacity: 0 }}>With</span>{" "}
                        <span ref={growthRef} style={{ opacity: 0 }}>Growth</span>
                    </h1>

                    <div ref={cropRef} style={{ opacity: 0, transform: "scale(0.86)" }}>
                        <Image
                            src="/img/crop1.png"
                            alt="Crop Image"
                            width={286}
                            height={150}
                            className="h-auto w-[286px]"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
