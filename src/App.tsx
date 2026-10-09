import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import AcademicLevels from "./components/AcademicLevels";
import MissionWork from "./components/MissionWork";
import Testimonials from "./components/Testimonials";
import Admissions from "./components/Admissions";
import WhoWeAre from "./components/WhoWeAre";
import MissionVision from "./components/MissionVision";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <AcademicLevels />
              <MissionWork />
              <Testimonials />
            </main>
          }
        />

        <Route
          path="/admisiones"
          element={
            <main className="admissions-page">
              <Admissions />
            </main>
          }
        />

        <Route
          path="/nuestro-colegio/quienes-somos"
          element={<WhoWeAre />}
        />

        <Route
          path="/nuestro-colegio/mision-vision"
          element={<MissionVision />}
        />

        <Route
          path="*"
          element={
            <main className="admissions-page">
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </main>
          }
        />
      </Routes>

      <Footer />
      <WhatsAppWidget />
    </BrowserRouter>
  );
}