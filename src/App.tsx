import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Introduction from './pages/Introduction'
import PageTransition from './components/PageTransition'

gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <>
      <Preloader />
      <div id="hero-page">
        <Hero />
      </div>
      <div id="introduction-page">
        <Introduction />
      </div>
      <PageTransition fromId="hero-page" toId="introduction-page" />
    </>
  )
}

export default App
