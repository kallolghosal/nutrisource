import ScreenOne from './components/ScreenOne'
import ScreenTwo from './components/ScreenTwo'
import ScreenThreeSeven from './components/ScreenThreeSeven'
import ScreenEight from './components/ScreenEight'
import SreenNine from './components/ScreenNine'
import ScreenTen from './components/ScreenTen'
import ScreenEleven from './components/ScreenEleven'
import ScreenTwelve from './components/ScreenTwelve'
import ScreenTeam from './components/ScreenTeam'
import Noise from './components/Noise'
import SmilingMoments from './components/SmilingMoments'
import Contact from './components/Contact'
import GrowWith from './components/GrowWith'
import LogoBar from './components/LogoBar'
import SideSlideMenu from './components/SideSlideMenu'

export default function Home() {
  return (
    <>
      <LogoBar />
      <SideSlideMenu />
      <main id="snap-container" className="w-full">
        <section id="home" data-menu-section="home" className="min-h-screen">
          <ScreenOne />
        </section>
        <section id="screen-two" data-menu-section="home" className="min-h-screen">
          <ScreenTwo />
        </section>
        <section id="screen-three-seven" data-menu-section="home">
          <ScreenThreeSeven />
        </section>
        <section id="organization" data-menu-section="organization" className="min-h-screen">
          <ScreenEight />
        </section>
        <section id="passion" data-menu-section="passion" className="min-h-screen">
          <SreenNine />
        </section>
        <section id="capability" data-menu-section="capability" className="min-h-screen">
          <ScreenTen />
        </section>
        <section id="offerings" data-menu-section="offerings" className="min-h-screen">
          <ScreenEleven />
        </section>
        <section id="farmsanta" data-menu-section="farmsanta" className="min-h-screen">
          <ScreenTwelve />
        </section>
        <section id="team" data-menu-section="team" className="min-h-screen">
          <ScreenTeam />
        </section>
        <section id="noise" data-menu-section="noise" className="min-h-screen">
          <Noise />
        </section>
        <section id="moments" data-menu-section="moments" className="min-h-screen">
          <SmilingMoments />
        </section>
        <section id="sayhi" data-menu-section="sayhi" className="min-h-screen">
          <Contact />
        </section>
        <section id="grow" data-menu-section="grow" className="min-h-screen">
          <GrowWith />
        </section>
      </main>
    </>
  )
}
