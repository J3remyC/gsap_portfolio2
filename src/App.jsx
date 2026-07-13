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
        {/* <div className="container-block"> */}
         <Hero></Hero>
        {/* </div> */}
    </div>
  )
}

export default App
