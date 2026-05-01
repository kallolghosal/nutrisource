"use client"

import Lenis from "@studio-freight/lenis"
import { createContext, useContext, useEffect, useState } from "react"

export const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
    return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null)

    useEffect(() => {
        const instance = new Lenis({
            lerp: 0.14,
            smoothWheel: true,
            wheelMultiplier: 1.2,
        })

        setLenis(instance)
        // expose for components that cannot use the hook
        ;(window as unknown as Record<string, unknown>).__lenis = instance

        let rafId: number
        const raf = (time: number) => {
            instance.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(rafId)
            instance.destroy()
        }
    }, [])

    useEffect(() => {
        if (!lenis) return

        const animatingRef = { current: false }

        const getSections = () =>
            Array.from(document.querySelectorAll("main section[id]")) as HTMLElement[]

        const clamp = (value: number, min: number, max: number) =>
            Math.min(Math.max(value, min), max)

        const getSectionRange = (sections: HTMLElement[], index: number) => {
            const start = sections[index].offsetTop
            const next = sections[index + 1]
            const end = (next ? next.offsetTop : document.body.scrollHeight) - window.innerHeight
            return { start, end: Math.max(start, end) }
        }

        const getCurrentIndex = (sections: HTMLElement[]) => {
            if (sections.length === 0) return -1
            const marker = lenis.scroll + window.innerHeight * 0.5
            for (let i = 0; i < sections.length; i += 1) {
                const start = sections[i].offsetTop
                const next = sections[i + 1]
                const end = next ? next.offsetTop : document.body.scrollHeight
                if (marker >= start && marker < end) return i
            }
            let nearest = 0
            let nearestDistance = Number.POSITIVE_INFINITY
            for (let i = 0; i < sections.length; i += 1) {
                const d = Math.abs(sections[i].offsetTop - lenis.scroll)
                if (d < nearestDistance) {
                    nearestDistance = d
                    nearest = i
                }
            }
            return nearest
        }

        const moveSection = (direction: -1 | 1) => {
            if (animatingRef.current) return true

            const sections = getSections()
            if (sections.length === 0) return false

            const currentIndex = getCurrentIndex(sections)
            if (currentIndex < 0) return false

            const { start, end } = getSectionRange(sections, currentIndex)
            const hasInternalRange = end - start > 8

            // If current section still has internal travel, keep native Lenis scrolling.
            if (hasInternalRange) {
                if (direction === 1 && lenis.scroll < end - 4) return false
                if (direction === -1 && lenis.scroll > start + 4) return false
            }

            const targetIndex = clamp(currentIndex + direction, 0, sections.length - 1)
            if (targetIndex === currentIndex) return false

            animatingRef.current = true
            lenis.scrollTo(sections[targetIndex], { duration: 0.8 })
            window.setTimeout(() => {
                animatingRef.current = false
            }, 850)
            return true
        }

        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < 10) return
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

            const direction: -1 | 1 = event.deltaY > 0 ? 1 : -1
            const handled = moveSection(direction)
            if (handled) event.preventDefault()
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown" || event.key === "PageDown") {
                const handled = moveSection(1)
                if (handled) event.preventDefault()
                return
            }
            if (event.key === "ArrowUp" || event.key === "PageUp") {
                const handled = moveSection(-1)
                if (handled) event.preventDefault()
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false })
        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [lenis])

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
