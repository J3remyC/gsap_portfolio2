import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import React from 'react'

const Hero = () => {
  useGSAP(() => {
    gsap.to(".hero-section", {
      clipPath: "polygon(0 45%, 25% 45%, 25% 55%, 0% 55%)",
      duration: 1.5,
      ease: "circ.inOut",
      delay:1, 
    })
    gsap.to(".hero-section", {
      clipPath: "polygon(0 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: "circ.inOut",
      delay: 3,

      onStart: () => {
        gsap.to(".progress-bar", {
          width: "100vw",
          duration: 2,
          ease: "circ.inOut",
        })

        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: "circ.inOut",
          snap: { innerHTML: 1 },
        })
      }
    })
    const headerSplit = SplitText.create('.header-first, .header-second',{
      type: 'chars, lines',
    })
    const shortTextSplit = SplitText.create('.short-text-wrapper',{
      type: 'words',
      mask: 'words'
    })

    gsap.set(headerSplit.chars, {
      opacity: 0,
      yPercent: -100
    })
    gsap.set(shortTextSplit.words, {
      opacity: 0,
      yPercent: -100
    })
    gsap.set('.hero-box', {
      opacity: 0,
      yPercent: -100
    })


    gsap.to(".hero-section", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "circ.inOut",
      delay: 5,

      onStart: () => {
        gsap.to('.progress-bar', {
          opacity: 0,
          duration: 0.3
        })
      },
      onComplete: () => {
        gsap.to(headerSplit.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'circ.inOut'
        })
        gsap.to(shortTextSplit.words, {
          yPercent: 0,
          opacity: 1,
          duration: 0.3,
          stagger: {
            amount: 0.5
          },
          ease: 'circ.inOut'
        })
        gsap.to('.hero-box', {
          yPercent: 0,
          duration: 0.5,
          stagger: {
            each: 0.050,
            from: 'center'
          },
          opacity: 1,
          ease: 'circ.inOut'
        })
      }
    })

    // LOOPING TEXT
    
  })
  return (
    <div>
      <section className='hero-section'>
        <div className="progress-bar">
          <p>loading</p>
          <p>/<span id="counter">0</span></p>
        </div>
        <div className="short-text-wrapper">
          <div className="short-text">
            Design That <br/>
            Speaks, Stories <br/>
            That Connect<br/>
          </div>
        </div>
        <div className='header-wrapper'>
          <span className='header-first'>Hi i'm</span>
          <span className='header-second'>Jeremy</span>
          <h2 className="hero-title">
            <span className="changing-text">Developer</span>
          </h2>
          <p className='short-desc'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, alias. Quis corrupti dolore distinctio possimus odit, sunt at numquam nesciunt?
          </p>
        </div>
      </section>
    </div>
  )
}

export default Hero
