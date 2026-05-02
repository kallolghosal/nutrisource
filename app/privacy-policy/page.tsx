import LogoBar from "../components/LogoBar";
import SideSlideMenu from "../components/SideSlideMenu";
import Footer from "../components/Footer";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function PrivacyPolicy() {
  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'data-collection', label: 'Data Collection' },
    { id: 'data-use', label: 'Data Use' },
    { id: 'data-sharing', label: 'Data Sharing' },
    { id: 'security', label: 'Security' },
    { id: 'user-rights', label: 'User Rights' },
    { id: 'contact', label: 'Contact Information' },
  ]

  return (
    <>
      <LogoBar />
      <SideSlideMenu />
      <main className={`w-full mt-30 max-w-7xl mx-auto p-8 ${roboto.className}`}>
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
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

export function generateMetadata() {
  return {
    title: 'Privacy Policy - Nutrisource India Pvt. Ltd.',
    description: 'Read the privacy policy of Nutrisource India Pvt. Ltd. to understand how we collect, use, and protect your information.',
  }
}