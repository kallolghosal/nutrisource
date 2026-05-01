"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ScreenNine() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    // whiteTranslate: -100 = white layer fully hidden above viewport; higher values bring it down
    const [whiteTranslate, setWhiteTranslate] = useState(-100)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const el = sectionRef.current
            if (!el) return
            const { top, height } = el.getBoundingClientRect()
            const travel = height - window.innerHeight
            if (travel <= 0) {
                setWhiteTranslate(-100)
                return
            }

            // progress: 0 when section pins, 1 after internal scroll travel completes
            const progress = Math.min(Math.max(-top / travel, 0), 1)
            setScrollProgress(progress)

            // Compute target white coverage from actual button position.
            // Example: 62 means white should cover top 62% when animation completes.
            let targetCoverage = 62
            const buttonEl = buttonRef.current
            if (buttonEl && window.innerHeight > 0) {
                const buttonRect = buttonEl.getBoundingClientRect()
                const buttonCenterInViewport = buttonRect.top + buttonRect.height / 2
                targetCoverage = Math.min(Math.max((buttonCenterInViewport / window.innerHeight) * 100, 45), 90)
            }

            // Convert desired coverage to translateY value.
            // -100%: hidden, -40%: top 60% visible, 0%: full white.
            const targetTranslate = targetCoverage - 100
            setWhiteTranslate(-100 + progress * (targetTranslate + 100))
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const panelReveal = Math.min(Math.max((scrollProgress - 0.55) / 0.25, 0), 1)

    return (
        <div ref={sectionRef} className="relative h-[220vh] w-full bg-[#7CBB0E]">
            <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden p-4">
                {/* White layer moves down on internal scroll, revealing green at the top first. */}
                <div
                    className="absolute inset-x-0 top-0 h-full bg-white"
                    style={{ transform: `translateY(${whiteTranslate}%)` }}
                />

                <div className="relative z-10 flex w-full max-w-[1220px] flex-col items-center">
                    <h1 className="mx-8 mb-16 text-center text-4xl font-bold text-black md:text-4xl">Passion @ Core</h1>

                    <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:items-end md:gap-10">
                        <div
                            className="w-full max-w-[560px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{
                                opacity: panelReveal,
                                transform: `translateX(${(1 - panelReveal) * -40}px)`,
                                visibility: panelReveal > 0.02 ? "visible" : "hidden",
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
                            <p className="mt-4 text-sm leading-6 text-black text-bold md:text-base">
                                Impact Driven Collaboration Platform to create value for every stakeholder at all levels
                            </p>
                        </div>

                        <Image
                            alt="Santa"
                            className="pointer-events-none h-auto w-[360px] md:w-[460px]"
                            height={452}
                            src="/img/home-santa.png"
                            width={370}
                        />

                        <div
                            className="w-full max-w-[560px] rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-7"
                            style={{
                                opacity: panelReveal,
                                transform: `translateX(${(1 - panelReveal) * 40}px)`,
                                visibility: panelReveal > 0.02 ? "visible" : "hidden",
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