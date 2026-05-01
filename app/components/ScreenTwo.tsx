import Image from "next/image";

export default function ScreenTwo() {
    return (
        <div className="overflow-x-hidden flex min-h-screen w-full items-center justify-center p-4 pt-24 md:pt-28">
            <Image
                src={'/img/home-video1.png'}
                alt="Nutrisource Logo"
                width={1258}
                height={579}
                className="h-auto w-[1258px] md:w-[1258px]"
                priority
            />
        </div>
    );
}