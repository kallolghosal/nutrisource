import Image from 'next/image'
import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

const sidebarIcons = [
    'upload',
    'gallery',
    'camera',
    'profile',
    'bag',
    'link',
    'users',
    'grid',
    'award',
    'chart',
    'send',
]

const cards = [
    {
        title: 'How To Build A Self-Driving Car In One Month',
        body: 'Can I learn the necessary computer science to build the software part of a self-driving car in one month?',
        author: 'Mary',
    },
    {
        title: 'Self-Improvement Has Become An Extreme...',
        body: 'What we are told we must do each day to develop and be successful has gone out of control. We need simpler habits.',
        author: 'James',
    },
    {
        title: '10 Cooking Lessons To Use In Everyday Life',
        body: 'I recently stumbled upon this quote by Paul Theroux: “Cooking requires confident guesswork and improvisation.”',
        author: 'Jon Kantner',
    },
    {
        title: 'Typography Can Make Or Break Your Design',
        body: 'One of the most important skills you can learn as a designer is how to choose type. This is why typography matters.',
        author: 'Robert',
    },
]

function SidebarIcon({ name }: { name: string }) {
    const common = {
        className: 'h-5 w-5',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        viewBox: '0 0 24 24',
    }

    switch (name) {
        case 'upload':
            return <svg {...common}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></svg>
        case 'gallery':
            return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="9" cy="9" r="1.5" /><path d="m20 15-4-4L6 21" /></svg>
        case 'camera':
            return <svg {...common}><path d="M4 7h4l2-2h4l2 2h4" /><circle cx="12" cy="13" r="4" /><path d="M5 7h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" /></svg>
        case 'profile':
            return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M6 20a6 6 0 0 1 12 0" /></svg>
        case 'bag':
            return <svg {...common}><path d="M6 8h12l-1 11H7L6 8Z" /><path d="M9 8a3 3 0 1 1 6 0" /></svg>
        case 'link':
            return <svg {...common}><path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" /><path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 1 1-7-7l1-1" /></svg>
        case 'users':
            return <svg {...common}><path d="M16 21a4 4 0 0 0-8 0" /><circle cx="12" cy="11" r="3" /><path d="M22 21a4 4 0 0 0-3-3.87" /><path d="M2 21a4 4 0 0 1 3-3.87" /></svg>
        case 'grid':
            return <svg {...common}><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
        case 'award':
            return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="m8 14-1 6 5-3 5 3-1-6" /></svg>
        case 'chart':
            return <svg {...common}><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-8" /></svg>
        default:
            return <svg {...common}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    }
}

export default function SmilingMoments() {
    return (
        <div className={`${robotoCondensed.className} relative min-h-screen overflow-hidden bg-white px-6 py-16 md:px-10 lg:px-14`}>
            <div className="mx-auto max-w-[1280px]">
                <h1 className="text-center text-4xl font-bold text-black md:text-5xl">Smiling Moments</h1>

                <div className="mt-16 grid gap-6 lg:grid-cols-4">
                    {cards.map((card, index) => (
                        <article
                            key={card.title}
                            className="rounded-[18px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                        >
                            <div className="relative h-[155px] overflow-hidden rounded-[14px] md:h-[170px]">
                                <Image
                                    alt={card.title}
                                    src="/img/slider/1.jpg"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="px-1 pb-1 pt-4">
                                <h3 className="line-clamp-2 text-[1.05rem] font-semibold leading-7 text-[#3A2B2C]">
                                    {card.title}
                                </h3>
                                <p className="mt-2 line-clamp-3 text-[0.98rem] leading-7 text-[#7A7A7A]">
                                    {card.body}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-[14px] bg-[#FAFAFA] px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#F6F6F6]">
                                        <Image
                                            alt={card.author}
                                            src={index % 2 === 0 ? '/img/home-santa.png' : '/img/waseem.png'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[0.98rem] font-medium text-[#3A2B2C]">{card.author}</p>
                                        <p className="text-sm text-[#878787]">July 14 , 2022</p>
                                    </div>
                                </div>

                                <button className="text-[#A1A1A1]" type="button" aria-label="Bookmark article">
                                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1Z" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F2F2] text-[#898989] shadow-sm"
                        type="button"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-3 text-lg font-medium text-[#858585]">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>...</span>
                    </div>
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F2F2] text-[#898989] shadow-sm"
                        type="button"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
