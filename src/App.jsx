import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import Nav from './components/Nav'
import Hero from './pages/Hero'

const App = () => {
  return (
    <div>
        <Nav></Nav>
        <Hero></Hero>
    </div>
  )
}

export default App
