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

const articleCards = [
    {
        image: '/img/slider/4.jpg',
        title: '5 Reasons Why You Should Wrap...',
        body: 'So, you finally went to your first boxing class and learned the basics of the sport. You also learned that it is recommended to wrap your hands before putting on the gloves.',
    },
    {
        image: '/img/waseem.png',
        title: 'Music Genre Classification With...',
        body: 'A guide to analyzing audio and music signals in Python - music is like a mirror, and it tells people a lot about who you are and what you care about.',
    },
]

const sideImages = ['/img/slider/6.jpg', '/img/slider/8.jpg']

export default function Noise() {
    return (
        <div className={`${robotoCondensed.className} relative min-h-screen overflow-hidden bg-white px-6 py-16 md:px-10 lg:px-14`}>
            <div className="mx-auto max-w-[1280px]">
                <h1 className="text-center text-4xl font-bold text-black md:text-5xl">Noise we create</h1>

                <div className="mt-14 flex items-center gap-2 text-3xl font-bold text-[#3C2B2C] md:text-[2rem]">
                    <span className="inline-block h-3 w-1 rounded-full bg-[#FF2348]" />
                    <span className="text-xl font-semibold md:text-[2rem]">Latest Videos</span>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.35fr)_190px]">
                    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                        <div className="relative h-[360px] w-full md:h-[420px]">
                            <Image
                                alt="Featured video"
                                src="/img/slider/1.jpg"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm">
                                <div className="ml-2 h-0 w-0 border-y-[22px] border-l-[34px] border-y-transparent border-l-[#FF1744]" />
                            </div>
                            <div className="absolute inset-x-4 bottom-4 rounded-[18px] bg-white/78 p-4 backdrop-blur-md md:inset-x-6 md:p-5">
                                <h2 className="text-2xl font-semibold text-black md:text-[2rem]">Video Titel | Meta Tag</h2>
                                <p className="mt-2 text-sm leading-6 text-[#3F3F3F] md:text-lg">
                                    Fill your designs with placeholders in a click: text, images and even data! Generate
                                    &apos;Lorem Ipsum&apos; to fill your text layers and shape compositions with the perfect preview.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute right-0 top-[-56px] hidden items-center gap-3 lg:flex">
                            <button
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F2F2] text-[#898989] shadow-sm"
                                type="button"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A8E856] text-[#2C2C2C] shadow-sm"
                                type="button"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid gap-6">
                            {articleCards.map((card) => (
                                <article
                                    key={card.title}
                                    className="grid grid-cols-[154px_minmax(0,1fr)] gap-4 rounded-[24px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                                >
                                    <div className="relative h-[154px] overflow-hidden rounded-[16px]">
                                        <Image alt={card.title} src={card.image} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="line-clamp-1 text-xl font-semibold leading-7 text-[#3A2B2C]">{card.title}</h3>
                                        <p className="mt-2 line-clamp-4 text-base leading-7 text-[#6A6A6A]">{card.body}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {sideImages.map((image, index) => (
                            <div
                                key={image}
                                className="relative h-[180px] overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                            >
                                <div className="relative h-full overflow-hidden rounded-[18px]">
                                    <Image
                                        alt={`Story visual ${index + 1}`}
                                        src={image}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
