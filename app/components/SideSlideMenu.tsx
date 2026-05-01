'use client'

import { useEffect, useState } from 'react'

const menuItems = [
  { label: 'Home', icon: 'HM', sectionId: 'home' },
  { label: 'Organization We Built', icon: 'OW', sectionId: 'organization' },
  { label: 'Passion @ Core', icon: 'PC', sectionId: 'passion' },
  { label: 'Capability @ Core', icon: 'CC', sectionId: 'capability' },
  { label: 'Our Inclusive Offerings', icon: 'OI', sectionId: 'offerings' },
  { label: 'FarmSanta', icon: 'FS', sectionId: 'farmsanta' },
  { label: 'Team on Mission', icon: 'TM', sectionId: 'team' },
  { label: 'Noise We Create', icon: 'NW', sectionId: 'noise' },
  { label: 'DOWNLOAD APP', icon: 'DA', sectionId: 'download' },
  { label: 'Smiling Moments', icon: 'SM', sectionId: 'moments' },
  { label: 'Say Hi', icon: 'SH', sectionId: 'sayhi' },
  { label: 'Grow With Us', icon: 'GW', sectionId: 'grow' },
]

/** Scroll the snap container to the target section. */
function scrollToSection(sectionId: string) {
  const container = document.getElementById('snap-container')
  const section = document.getElementById(sectionId)
  if (!container || !section) return
  container.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
}

type MenuListProps = {
  activeSection: string
  onItemClick: (sectionId: string) => void
}

function MenuList({ activeSection, onItemClick }: MenuListProps) {
  return (
    <ul className="h-full flex flex-col justify-evenly px-2 py-3 text-sm text-white">
      {menuItems.map((item) => {
        const isDownload = item.label === 'DOWNLOAD APP'
        const isActive = item.sectionId === activeSection

        return (
          <li key={item.label}>
            <a
              href={`#${item.sectionId}`}
              onClick={(e) => {
                e.preventDefault()
                onItemClick(item.sectionId)
              }}
              className={[
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200',
                isDownload
                  ? 'bg-[#f78f1f] font-semibold text-[#203700] hover:bg-[#ffc27a]'
                  : isActive
                  ? 'bg-white/30'
                  : 'hover:bg-white/20',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tracking-[0.08em]',
                  isActive
                    ? 'border-white bg-white text-[#325400]'
                    : 'border-white/60 bg-white/20',
                ].join(' ')}
              >
                {item.icon}
              </span>
              <span className="whitespace-nowrap text-[13px] font-medium tracking-[0.02em]">
                {item.label}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default function SideSlideMenu() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const container = document.getElementById('snap-container')
    if (!container) return

    const sections = Array.from(container.querySelectorAll<HTMLElement>('section[data-menu-section]'))
    if (sections.length === 0) return

    const updateActiveSection = () => {
      const viewportCenter = container.scrollTop + container.clientHeight / 2

      const closestSection = sections.reduce((closest, section) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2
        const closestCenter = closest.offsetTop + closest.offsetHeight / 2
        const currentDistance = Math.abs(sectionCenter - viewportCenter)
        const closestDistance = Math.abs(closestCenter - viewportCenter)
        return currentDistance < closestDistance ? section : closest
      }, sections[0])

      const menuSection = closestSection.getAttribute('data-menu-section')
      if (menuSection) setActiveSection(menuSection)
    }

    updateActiveSection()
    container.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      container.removeEventListener('scroll', updateActiveSection)
    }
  }, [])

  // Keyboard navigation should move one snap section at a time.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!['PageDown', 'PageUp', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const container = document.getElementById('snap-container')
      if (!container) return

      const sections = Array.from(container.querySelectorAll<HTMLElement>('section[data-menu-section]'))
      if (sections.length === 0) return

      e.preventDefault()

      const scrollTop = container.scrollTop
      const currentIndex = sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(sections[closestIndex].offsetTop - scrollTop)
        const currentDistance = Math.abs(section.offsetTop - scrollTop)
        return currentDistance < closestDistance ? index : closestIndex
      }, 0)

      const isForward = e.key === 'PageDown' || e.key === 'ArrowDown'
      const nextIndex = isForward
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0)

      const nextSection = sections[nextIndex]
      if (!nextSection || nextIndex === currentIndex) return

      container.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' })
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setMobileOpen(false)
  }

  return (
    <>
      <aside className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 group md:block" aria-label="Site menu">
        <nav
          className="h-screen w-72 bg-[linear-gradient(90deg,#87E400_15%,#325400_100%)] shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out translate-x-[calc(100%-3.25rem)] group-hover:translate-x-0 overflow-hidden"
          aria-label="Quick links"
        >
          <MenuList activeSection={activeSection} onItemClick={handleItemClick} />
        </nav>
      </aside>

      <div className="fixed right-3 top-3 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center bg-transparent"
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
          </span>
        </button>
      </div>

      <aside
        className={[
          'fixed right-0 top-1/2 z-50 w-72 h-screen -translate-y-1/2 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
          'transition-transform duration-300 ease-out',
        ].join(' ')}
        aria-label="Mobile site menu"
      >
        <nav className="h-full bg-[linear-gradient(90deg,#87E400_15%,#325400_100%)] shadow-[0_12px_32px_rgba(0,0,0,0.28)] overflow-hidden">
          <MenuList activeSection={activeSection} onItemClick={handleItemClick} />
        </nav>
      </aside>
    </>
  )
}
