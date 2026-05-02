import LogoBar from "../components/LogoBar";
import SideSlideMenu from "../components/SideSlideMenu";
import Footer from "../components/Footer";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function TermsConditions() {
  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'user-obligations', label: 'User Obligations' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'disclaimer', label: 'Disclaimer of Warranties' },
    { id: 'limitation-of-liability', label: 'Limitation of Liability' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'contact', label: 'Contact Information' },
  ]

  return (
    <>
      <LogoBar />
      <SideSlideMenu />
      <main className={`w-full mt-30 max-w-7xl mx-auto p-8 ${roboto.className}`}>
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">Last updated: June 2024</p>

        <nav className="mb-8">
          <ul className="flex flex-col gap-2">
            {sections.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-blue-600 hover:underline">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map(section => (
          <section key={section.id} id={section.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{section.label}</h2>
            <p className="mb-4">[Content for {section.label} goes here...]</p>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}