import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ScrollToTop } from './components/layout/ScrollToTop'
import Home from './pages/Home'
import QuemSomos from './pages/QuemSomos'
import EmpresasParceiras from './pages/EmpresasParceiras'
import TrabalheConosco from './pages/TrabalheConosco'
import Contato from './pages/Contato'
import Privacidade from './pages/Privacidade'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-dvh bg-surface">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/empresas-parceiras" element={<EmpresasParceiras />} />
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
