import Image from "next/image";

export default function ScreenOne() {
    return (
        <div className="relative overflow-x-hidden flex min-h-screen w-full items-center bg-white bg-[url('/img/bg-top.png')] bg-cover bg-center px-4 pb-4 pt-24 md:pt-28">
            <div className="relative mx-auto w-full md:w-fit">
                <Image
                src={'/img/home-banner1.png'}
                alt="Hero Image"
                width={1000}
                height={451}
                className="w-full h-auto md:w-[1000px]"
                />
                {/* Globe — left edge, vertically centred */}
                <Image
                src={'/img/globe.png'}
                alt="Globe"
                width={192}
                height={193}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[60px] h-auto md:w-[192px] md:-translate-x-[60%]"
                />
                {/* Santa — right edge, vertically centred */}
                <Image
                src={'/img/home-santa.png'}
                alt="Santa"
                width={286}
                height={286}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[70px] h-auto md:w-[286px] md:translate-x-[80%]"
                />
            </div>
        </div>
    );
}