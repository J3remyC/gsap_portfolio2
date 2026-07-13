import React from 'react'
import { useGSAP } from '@gsap/react'
import {ScrollTrigger, SplitText } from 'gsap/all'
import gsap from 'gsap'
const About = () => {
  useGSAP(() => {
    const split = SplitText.create(".about-text", {
      type: "words",
      mask: "words"
    });
    const split2 = SplitText.create(".about-text-shadow", {
      type: "words",
      mask: "words"
    });
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-section",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=2000",
        markers: true
      }
    });
  
    tl.from(split.words, {
      yPercent: 150,
      stagger: 0.05
    });
  
    return () => {
      split.revert();
    };
  });
  return (
    <div>
      <section className="about-section">
        <div className="about-text-wrapper">
          <div className="about-text">
          Code is where logic meets creativity. I build websites that don't just work—they feel alive. From responsive interfaces to immersive animations, I combine thoughtful design with clean development to create experiences that leave a lasting impression. Every project is an opportunity to learn, experiment, and transform ideas into something meaningful.
          </div>
          <div className="about-text-shadow">
          Code is where logic meets creativity. I build websites that don't just work—they feel alive. From responsive interfaces to immersive animations, I combine thoughtful design with clean development to create experiences that leave a lasting impression. Every project is an opportunity to learn, experiment, and transform ideas into something meaningful.
          </div>
        </div>
      </section>
      <section>

      </section>
      <section>

      </section>
    </div>
  )
}

export default About
