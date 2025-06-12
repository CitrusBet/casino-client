import Header from '../components/Header'
import Hero from '../components/Hero'
import MainContent from '../components/MainContent'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1B1C2D] relative">
      <Sidebar />
      <div className="ml-[74px] lg:ml-[74px] relative transition-all duration-300">
        <Hero />
        <Header />
        <MainContent />
      </div>
    </div>
  )
}
