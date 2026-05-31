import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Exercises from "./components/Exercises";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-root">
      <Header />
      <main id="center">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Exercises />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;