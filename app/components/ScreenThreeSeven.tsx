"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
    const [progress, setProgress] = useState(0)
    const progressRef = useRef(0)
    const advancingRef = useRef(false)
    const inputLockRef = useRef(false)

    useEffect(() => {
        progressRef.current = progress
    }, [progress])

    useEffect(() => {
        const updateProgress = () => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            const travelDistance = rect.height - window.innerHeight
            if (travelDistance <= 0) {
                setProgress(0)
                return
            }
            const next = clamp(-rect.top / travelDistance, 0, 1)
            setProgress(next)
        }

        updateProgress()
        window.addEventListener("scroll", updateProgress, { passive: true })
        window.addEventListener("resize", updateProgress)

        return () => {
            window.removeEventListener("scroll", updateProgress)
            window.removeEventListener("resize", updateProgress)
        }
    }, [])

    useEffect(() => {
        const nextSection = document.getElementById("organization")
        const prevSection = document.getElementById("screen-two")
        if (!nextSection) return

        const isSectionActive = () => {
            const rect = sectionRef.current?.getBoundingClientRect()
            if (!rect) return false
            return rect.top < window.innerHeight && rect.bottom > 0
        }

        const lockInput = () => {
            inputLockRef.current = true
            window.setTimeout(() => {
                inputLockRef.current = false
            }, 420)
        }

        const advanceToNextSection = () => {
            if (!nextSection || advancingRef.current) return
            advancingRef.current = true
            const l = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (el: Element, opts?: object) => void } | undefined
            if (l) {
                l.scrollTo(nextSection, { duration: 0.75 })
            } else {
                nextSection.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            window.setTimeout(() => {
                advancingRef.current = false
            }, 500)
            lockInput()
        }

        const retreatToPrevSection = () => {
            if (!prevSection || advancingRef.current) return
            advancingRef.current = true
            const l = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (el: Element, opts?: object) => void } | undefined
            if (l) {
                l.scrollTo(prevSection, { duration: 0.7 })
            } else {
                prevSection.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            window.setTimeout(() => {
                advancingRef.current = false
            }, 500)
            lockInput()
        }

        const stepWithinSection = (direction: 1 | -1) => {
            const l = (window as unknown as Record<string, unknown>).__lenis as {
                scrollTo: (target: number, opts?: object) => void
                scroll: number
            } | undefined

            const step = window.innerHeight * 0.9
            if (l) {
                l.scrollTo(l.scroll + direction * step, { duration: 0.55 })
            } else {
                window.scrollBy({ top: direction * step, behavior: "smooth" })
            }
            lockInput()
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSectionActive()) return
            if (inputLockRef.current || advancingRef.current) {
                event.preventDefault()
                return
            }

            const isDown = event.key === "PageDown" || event.key === "ArrowDown"
            const isUp = event.key === "PageUp" || event.key === "ArrowUp"
            if (!isDown && !isUp) return
            event.preventDefault()

            if (isDown) {
                if (progressRef.current < 0.995) {
                    stepWithinSection(1)
                    return
                }
                advanceToNextSection()
                return
            }

            if (progressRef.current > 0.01) {
                stepWithinSection(-1)
                return
            }
            retreatToPrevSection()
        }

        const onWheel = (event: WheelEvent) => {
            if (!isSectionActive()) return
            event.preventDefault()
            if (inputLockRef.current || advancingRef.current) return

            const isDown = event.deltaY > 0

            if (isDown) {
                if (progressRef.current < 0.995) {
                    stepWithinSection(1)
                    return
                }
                advanceToNextSection()
                return
            }

            if (progressRef.current > 0.01) {
                stepWithinSection(-1)
                return
            }
            retreatToPrevSection()
        }

        window.addEventListener("keydown", onKeyDown)
        window.addEventListener("wheel", onWheel, { passive: false })

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("wheel", onWheel)
        }
    }, [])

    const cloud1Opacity = 1 - clamp(progress / 0.28, 0, 1)
    const cloud2Opacity = fadeInOut(progress, 0.16, 0.34, 0.56)
    const cloud3Opacity = fadeInOut(progress, 0.44, 0.62, 0.82)
    const cloud4Opacity = fadeIn(progress, 0.76, 0.94)

    const growOpacity = fadeIn(progress, 0.22, 0.38)
    const withOpacity = fadeIn(progress, 0.48, 0.64)
    const growthOpacity = fadeIn(progress, 0.74, 0.9)

    const cropOpacity = fadeIn(progress, 0.14, 0.34)
    const cropScale = 0.86 + 0.14 * clamp((progress - 0.14) / 0.2, 0, 1)

    return (
        <div ref={sectionRef} className="relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/bg-cloud1.png')] bg-cover bg-center" style={{ opacity: cloud1Opacity }} />
                <div className="absolute inset-0 bg-[url('/img/bg-cloud2.png')] bg-cover bg-center" style={{ opacity: cloud2Opacity }} />
                <div className="absolute inset-0 bg-[url('/img/bg-cloud3.png')] bg-cover bg-center" style={{ opacity: cloud3Opacity }} />
                <div className="absolute inset-0 bg-[url('/img/bg-cloud4.png')] bg-cover bg-center" style={{ opacity: cloud4Opacity }} />

                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-5 px-4 pt-24 md:pt-28">
                    <h1 className="mx-8 text-center text-4xl font-bold text-black md:text-8xl">
                        <span style={{ opacity: growOpacity }}>Grow</span>{" "}
                        <span style={{ opacity: withOpacity }}>With</span>{" "}
                        <span style={{ opacity: growthOpacity }}>Growth</span>
                    </h1>

                    <Image
                        src="/img/crop1.png"
                        alt="Crop Image"
                        width={286}
                        height={150}
                        className="h-auto w-[286px]"
                        style={{ opacity: cropOpacity, transform: `scale(${cropScale})` }}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
