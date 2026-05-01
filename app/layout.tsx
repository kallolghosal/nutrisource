import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import LenisProvider from "./components/LenisProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NutriSource India | Sustainable Agriculture, Reimagined",
  description:
    "A redesigned NutriSource India homepage focused on sustainable agriculture, nutrition management and farmer enablement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className={`${roboto.className} min-h-full flex flex-col`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
