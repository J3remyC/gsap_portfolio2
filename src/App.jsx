import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import Nav from './components/Nav'
import Hero from './pages/Hero'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <>
      <Nav />

      <div className="container-block">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
