import Image from "next/image";

export default function ScreenSix() {
    return (
        <div className="overflow-x-hidden bg-[url('/img/bg-cloud3.png')] bg-cover bg-center flex min-h-screen w-full items-center justify-center p-4 pt-24 md:pt-28">
            <h1 className="text-4xl md:text-8xl font-bold text-black text-center mx-8">Grow With</h1>
            <Image
                src={'/img/crop1.png'}
                alt="Crop Image"
                width={286}
                height={150}
                className="h-auto w-[286px] md:w-[286px]"
                priority
            />
        </div>
    );
}