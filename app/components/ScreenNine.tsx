"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function ScreenNine() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    // phase 0 = green visible, phase 1 = white panel down + content revealed
    const [phase, setPhase] = useState(0)
    // translateY% where bottom of white panel aligns with button vertical center
    const [panelStopY, setPanelStopY] = useState(-40)

    const computePanelStop = () => {
        const btn = buttonRef.current
        if (!btn) return
        const { top, height } = btn.getBoundingClientRect()
        const btnCenterY = top + height / 2
        // panel is h-full (= 100vh); bottom at translateY(T%) means T = btnCenterY - vh
        const pct = ((btnCenterY - window.innerHeight) / window.innerHeight) * 100
        setPanelStopY(Math.min(pct, -5)) // never go past -5% (keep a sliver of green)
    }

    // Compute once after mount, and on resize
    useEffect(() => {
        computePanelStop()
        window.addEventListener("resize", computePanelStop)
        return () => window.removeEventListener("resize", computePanelStop)
    }, [])

    // Recompute when phase becomes 1 (button may have shifted during panel animation)
    useEffect(() => {
        if (phase === 1) {
            const id = setTimeout(computePanelStop, 50)
            return () => clearTimeout(id)
        }
    }, [phase])

    // Reset phase to 0 when section scrolls fully out of view (e.g. user goes back up)
    useEffect(() => {
        const onScroll = () => {
            const rect = sectionRef.current?.getBoundingClientRect()
            if (!rect) return
            const outOfView = rect.bottom < 0 || rect.top > window.innerHeight
            if (outOfView) setPhase(0)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        let lastAt = 0
        const COOLDOWN = 750

        const canAct = () => {
            const now = Date.now()
            if (now - lastAt < COOLDOWN) return false
            lastAt = now
            return true
        }

        const isSectionActive = () => {
            const rect = sectionRef.current?.getBoundingClientRect()
            if (!rect) return false
            return rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
        }

        const onWheel = (event: WheelEvent) => {
            if (!isSectionActive()) return
            if (Math.abs(event.deltaY) < 10) return

            if (event.deltaY > 0 && phase === 0) {
                // First scroll-down: reveal white panel — consume the event
                if (!canAct()) { event.preventDefault(); event.stopPropagation(); return }
                event.preventDefault()
                event.stopPropagation()
                setPhase(1)
                return
            }

            if (event.deltaY < 0 && phase === 1) {
                // Scroll-up while content is visible: collapse back to green
                if (!canAct()) { event.preventDefault(); event.stopPropagation(); return }
                event.preventDefault()
                event.stopPropagation()
                setPhase(0)
            }
            // phase === 1 + scroll-down → falls through to LenisProvider → next section
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (!isSectionActive()) return

            const isDown = event.key === "PageDown" || event.key === "ArrowDown"
            const isUp = event.key === "PageUp" || event.key === "ArrowUp"
            if (!isDown && !isUp) return

            if (isDown && phase === 0) {
                if (!canAct()) { event.preventDefault(); event.stopPropagation(); return }
                event.preventDefault()
                event.stopPropagation()
                setPhase(1)
                return
            }

            if (isUp && phase === 1) {
                if (!canAct()) { event.preventDefault(); event.stopPropagation(); return }
                event.preventDefault()
                event.stopPropagation()
                setPhase(0)
            }
            // phase === 1 + down key → falls through to LenisProvider → next section
        }

        window.addEventListener("wheel", onWheel, { passive: false, capture: true })
        window.addEventListener("keydown", onKeyDown, { capture: true })
        return () => {
            window.removeEventListener("wheel", onWheel, { capture: true })
            window.removeEventListener("keydown", onKeyDown, { capture: true })
        }
    }, [phase])

    return (
        <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#7CBB0E]">
            {/* White panel slides down; stops so its bottom aligns with button centre */}
            <div
                className="absolute inset-x-0 top-0 h-full bg-white"
                style={{
                    transform: phase >= 1 ? `translateY(${panelStopY}%)` : "translateY(-100%)",
                    transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                }}
            />

            <div className="relative z-10 flex h-full w-full items-center justify-center overflow-y-auto p-4 pt-24 md:pt-28">
                <div className="flex w-full max-w-[1220px] flex-col items-center">
                    <h1 className="mx-8 mb-16 text-center text-4xl font-bold text-black">Passion @ Core</h1>

                    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-10">
                        <div
                            className="w-full max-w-[460px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{
                                opacity: phase >= 1 ? 1 : 0,
                                transform: phase >= 1 ? "translateX(0px)" : "translateX(-40px)",
                                visibility: phase >= 1 ? "visible" : "hidden",
                                transition: "opacity 0.5s ease, transform 0.5s ease",
                                transitionDelay: phase >= 1 ? "350ms" : "0ms",
                            }}
                        >
                            <p className="text-sm leading-6 text-black md:text-base">
                                Our Passion@Core is to promote sustainable agriculture and empower rural livelihoods for a better future, greener planet and inclusive growth of the society.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-black md:text-base">
                                Our integrated approach, combining innovative products, expert domain knowledge, Best in class Agritech platform and real time farm advisory service, sets us apart from other players in the industry.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-black md:text-base">
                                Our continuous and committed efforts sequentially aim to:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm leading-6 text-black md:text-base">
                                {[
                                    "Ensure efficient and cost effective agriculture to improve yield and reduce GHG.",
                                    "Create collaborative digital ecosystems to support Rural Livelihood",
                                    "Provide direct market access to Farmers' place",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <Image src="/img/globe-small.png" alt="" width={18} height={18} className="mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-sm leading-6 text-black font-bold md:text-base">
                                Impact Driven Collaboration Platform to create value for every stakeholder at all levels
                            </p>
                        </div>

                        <Image
                            alt="Santa"
                            className="pointer-events-none h-auto w-[60px] md:w-[460px]"
                            height={452}
                            src="/img/home-santa.png"
                            width={370}
                        />

                        <div
                            className="w-full max-w-[460px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{
                                opacity: phase >= 1 ? 1 : 0,
                                transform: phase >= 1 ? "translateX(0px)" : "translateX(40px)",
                                visibility: phase >= 1 ? "visible" : "hidden",
                                transition: "opacity 0.5s ease, transform 0.5s ease",
                                transitionDelay: phase >= 1 ? "350ms" : "0ms",
                            }}
                        >
                            <p className="text-sm leading-6 text-black md:text-base">
                                Nutrisource is built on passion and robust knowledge on Agriculture domain to deliver excellence and positive impact on rural livelihood.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-black md:text-base">
                                We strongly believe sustainability is the key for existence and growth whereas collaborations among stakeholders are essential to bring positive impacts and deliver values to the rural livelihoods.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-black md:text-base">
                                We remain committed to enable and empower the marginal farmers to achieve efficient and sustainable agriculture and improve their livelihoods by providing comprehensive 360-degree Agri solutions comprising quality products, real-time knowledge, advanced digital technology, and value-based services at farmers&apos; doorstep.
                            </p>
                            <p className="mt-4 text-sm leading-6 text-black font-bold md:text-base">
                                Its just not a vision or mission, its passion to deliver Change, Excellence and Impact!
                            </p>
                        </div>
                    </div>

                    <button
                        ref={buttonRef}
                        className="mt-7 rounded-full bg-green-600 px-5 py-2 text-base font-semibold text-white transition hover:bg-green-700"
                        type="button"
                    >
                        Download App
                    </button>
                </div>
            </div>
        </div>
    )
}
