import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
})

export default function ScreenTeam() {
    const featuredMember = { name: 'Mohammad Waseem Makranial', role: 'Head IT', imageSrc: '/img/waseem.png' }
    const repeatedMembers = Array.from({ length: 4 }, (_, index) => ({
        ...featuredMember,
        id: `${featuredMember.name}-${index}`,
    }))

    return (
        <div className={`${robotoCondensed.className} flex min-h-screen w-full items-center justify-center bg-gray-100 py-20`}>
            <div className="w-full max-w-7xl rounded-lg bg-white p-10 shadow-lg overflow-hidden">
                <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Team On Mission</h1>
                <div className="flex flex-nowrap items-center justify-between gap-6">
                    {repeatedMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center gap-6">
                            <Image
                                alt={member.name}
                                src={member.imageSrc}
                                width={295}
                                height={294}
                                className="h-auto md:w-[295px] shrink-0"
                            />
                            <div className="text-center">
                                <h2 className="text-1xl font-semibold text-gray-800">{member.name}</h2>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
