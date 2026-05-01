import Image from "next/image";

export default function LogoBar() {
    return (
        <div className="fixed inset-x-0 top-0 z-[60] w-full">
            <div className="flex items-center justify-start px-4 py-3 md:px-6">
                <Image
                    src={'/img/nutrisource-logo.png'}
                    alt="Nutrisource Logo"
                    width={361}
                    height={88}
                    className="h-auto w-[170px] md:w-[361px]"
                    priority
                />
            </div>
        </div>
    );
}