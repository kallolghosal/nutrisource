"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const fadeIn = (progress: number, start: number, end: number) => {
    if (progress <= start) return 0
    if (progress >= end) return 1
    return (progress - start) / (end - start)
}

const fadeInOut = (progress: number, inStart: number, inEnd: number, outEnd: number) => {
    if (progress <= inStart || progress >= outEnd) return 0
    if (progress <= inEnd) return (progress - inStart) / (inEnd - inStart)
    return 1 - (progress - inEnd) / (outEnd - inEnd)
}

export default function ScreenThreeSeven() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cloud1Ref = useRef<HTMLDivElement>(null)
    const cloud2Ref = useRef<HTMLDivElement>(null)
    const cloud3Ref = useRef<HTMLDivElement>(null)
    const cloud4Ref = useRef<HTMLDivElement>(null)
    const growRef = useRef<HTMLSpanElement>(null)
    const withRef = useRef<HTMLSpanElement>(null)
    const growthRef = useRef<HTMLSpanElement>(null)
    const cropRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let rafId: number
        let lastProgress = -1

        const applyProgress = (progress: number) => {
            if (cloud1Ref.current) cloud1Ref.current.style.opacity = String(1 - clamp(progress / 0.28, 0, 1))
            if (cloud2Ref.current) cloud2Ref.current.style.opacity = String(fadeInOut(progress, 0.16, 0.34, 0.56))
            if (cloud3Ref.current) cloud3Ref.current.style.opacity = String(fadeInOut(progress, 0.44, 0.62, 0.82))
            if (cloud4Ref.current) cloud4Ref.current.style.opacity = String(fadeIn(progress, 0.76, 0.94))
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

    return (
        <div ref={sectionRef} className="relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div ref={cloud1Ref} className="absolute inset-0 bg-[url('/img/bg-cloud1.png')] bg-cover bg-center" />
                <div ref={cloud2Ref} className="absolute inset-0 bg-[url('/img/bg-cloud2.png')] bg-cover bg-center" style={{ opacity: 0 }} />
                <div ref={cloud3Ref} className="absolute inset-0 bg-[url('/img/bg-cloud3.png')] bg-cover bg-center" style={{ opacity: 0 }} />
                <div ref={cloud4Ref} className="absolute inset-0 bg-[url('/img/bg-cloud4.png')] bg-cover bg-center" style={{ opacity: 0 }} />

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
