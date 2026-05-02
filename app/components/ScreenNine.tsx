"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function ScreenNine() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const whitePanelRef = useRef<HTMLDivElement>(null)
    const leftPanelRef = useRef<HTMLDivElement>(null)
    const rightPanelRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        let rafId: number
        let lastProgress = -1

        const tick = () => {
            const el = sectionRef.current
            if (!el) { rafId = requestAnimationFrame(tick); return }

            const { top, height } = el.getBoundingClientRect()
            const travel = height - window.innerHeight
            const progress = travel > 0 ? Math.min(Math.max(-top / travel, 0), 1) : 0

            if (Math.abs(progress - lastProgress) > 0.0005) {
                lastProgress = progress

                // White panel slides down as we scroll through the section
                let targetCoverage = 62
                const buttonEl = buttonRef.current
                if (buttonEl) {
                    const br = buttonEl.getBoundingClientRect()
                    const center = br.top + br.height / 2
                    targetCoverage = Math.min(Math.max((center / window.innerHeight) * 100, 45), 90)
                }
                const whiteTranslate = -100 + progress * (targetCoverage - 100 + 100)
                if (whitePanelRef.current) {
                    whitePanelRef.current.style.transform = `translateY(${whiteTranslate}%)`
                }

                // Side panels fade/slide in during the second half of travel
                const panelReveal = Math.min(Math.max((progress - 0.55) / 0.25, 0), 1)
                if (leftPanelRef.current) {
                    leftPanelRef.current.style.opacity = String(panelReveal)
                    leftPanelRef.current.style.transform = `translateX(${(1 - panelReveal) * -40}px)`
                    leftPanelRef.current.style.visibility = panelReveal > 0.02 ? "visible" : "hidden"
                }
                if (rightPanelRef.current) {
                    rightPanelRef.current.style.opacity = String(panelReveal)
                    rightPanelRef.current.style.transform = `translateX(${(1 - panelReveal) * 40}px)`
                    rightPanelRef.current.style.visibility = panelReveal > 0.02 ? "visible" : "hidden"
                }
            }

            rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [])

    return (
        <div ref={sectionRef} className="relative h-[220vh] w-full bg-[#7CBB0E]">
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden p-4">
                <div
                    ref={whitePanelRef}
                    className="absolute inset-x-0 top-0 h-full bg-white"
                    style={{ transform: "translateY(-100%)" }}
                />

                <div className="relative z-10 flex w-full max-w-[1220px] flex-col items-center">
                    <h1 className="mx-8 mb-16 text-center text-4xl font-bold text-black md:text-4xl">Passion @ Core</h1>

                    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-10">
                        <div
                            ref={leftPanelRef}
                            className="w-full max-w-[460px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{ opacity: 0, transform: "translateX(-40px)", visibility: "hidden" }}
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
                            <p className="mt-4 text-sm leading-6 text-black text-bold md:text-base">
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
                            ref={rightPanelRef}
                            className="w-full max-w-[460px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{ opacity: 0, transform: "translateX(40px)", visibility: "hidden" }}
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
                            <p className="mt-4 text-sm leading-6 text-black font-bold md:text-base">Its just not a vision or mission, its passion to deliver Change, Excellence and Impact!</p>
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
