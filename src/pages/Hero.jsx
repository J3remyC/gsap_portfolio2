import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import React from 'react'

const Hero = () => {
  useGSAP(() => {
    const headerSplit = SplitText.create(".header-first, .header-second", {
      type: "chars, lines",
    });
    
    const shortTextSplit = SplitText.create(".short-text-wrapper", {
      type: "words",
      mask: "words",
    });
    gsap.set(headerSplit.chars, {
      opacity: 0,
      yPercent: -100,
    });
    
    gsap.set(shortTextSplit.words, {
      opacity: 0,
      yPercent: -100,
    });
    
    gsap.set(".hero-box", {
      opacity: 0,
      yPercent: -100,
    });
    const hasPlayed = sessionStorage.getItem("heroRevealPlayed");

    // ---------------- INTRO ----------------
    if (!hasPlayed) {
      sessionStorage.setItem("heroRevealPlayed", "true");
    
      gsap.to(".hero-section", {
        clipPath: "polygon(0 45%, 25% 45%, 25% 55%, 0% 55%)",
        duration: 1.5,
        ease: "circ.inOut",
        delay: 1,
      });
    
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
          });
    
          gsap.to(counter, {
            innerHTML: 100,
            duration: 2,
            ease: "circ.inOut",
            snap: { innerHTML: 1 },
          });
        },
      });
    
      gsap.to(".hero-section", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "circ.inOut",
        delay: 5,
    
        onStart: () => {
          gsap.to(".progress-bar", {
            opacity: 0,
            duration: 0.3,
          });
        },
    
        onComplete: () => {
          gsap.to(headerSplit.chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: "circ.inOut",
          });
    
          gsap.to(shortTextSplit.words, {
            yPercent: 0,
            opacity: 1,
            duration: 0.3,
            stagger: {
              amount: 0.5,
            },
            ease: "circ.inOut",
          });
    
          gsap.to(".hero-box", {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: {
              each: 0.05,
              from: "center",
            },
            ease: "circ.inOut",
          });
    
          gsap.to(".hero-title", {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            delay: 0.8,
          });
        },
      });
    }
    
    // ---------------- SKIP INTRO ----------------
    else {
      gsap.set(".hero-section", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
    
      gsap.set(".progress-bar", {
        opacity: 0,
        width: "100vw",
      });
    
      gsap.set(counter, {
        innerHTML: 100,
      });
    
      gsap.set(headerSplit.chars, {
        yPercent: 0,
        opacity: 1,
      });
    
      gsap.set(shortTextSplit.words, {
        yPercent: 0,
        opacity: 1,
      });
    
      gsap.set(".hero-box", {
        yPercent: 0,
        opacity: 1,
      });
    
      gsap.set(".hero-title", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      });
    }
    
    // ---------------- LOOPING TEXT ----------------
    
    const words = [
      "{ Frontend }",
      "{ Backend }",
      "{ Designer }",
      "{ Full Stack }",
      "{ Freelancer }",
      "{ Problem Solver }",
    ];
    
    const descriptions = [
      "Building responsive, interactive, and high-performance user interfaces with modern web technologies.",
      "Developing secure, scalable, and efficient server-side applications, APIs, and databases.",
      "Designing clean, intuitive, and visually engaging user experiences that balance form and function.",
      "Bridging frontend and backend development to deliver complete, end-to-end web applications.",
      "Collaborating with clients to transform ideas into polished, production-ready digital solutions.",
      "Turning complex challenges into simple, efficient, and maintainable solutions through thoughtful engineering.",
    ];
    
    const changingText = document.querySelector(".changing-text");
    const shortDesc = document.querySelector(".short-desc");
    
    let current = 0;
    
    function animateWords(firstRun = false) {
      changingText.textContent = words[current];
      shortDesc.textContent = descriptions[current];
    
      const changingSplit = SplitText.create(changingText, {
        type: "chars",
        mask: "chars",
      });
    
      const descSplit = SplitText.create(shortDesc, {
        type: "chars",
        mask: "chars",
      });
    
      gsap.set(changingSplit.chars, {
        yPercent: 100,
        opacity: 0,
      });
    
      gsap.set(descSplit.chars, {
        yPercent: 100,
        opacity: 0,
      });
    
      const tl = gsap.timeline({
        delay: firstRun ? 7 : 0,
        onComplete: () => {
          changingSplit.revert();
          descSplit.revert();
          current = (current + 1) % words.length;
          animateWords();
        },
      });
    
      tl.to(changingSplit.chars, {
        yPercent: 0,
        opacity: 1,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        duration: 0.7,
        ease: "circ.inOut",
      })
        .to(
          descSplit.chars,
          {
            yPercent: 0,
            opacity: 1,
            stagger: {
              amount: 0.5,
              from: "random",
            },
            duration: 0.7,
            ease: "circ.inOut",
          },
          0
        )
        .to({}, { duration: 2 })
        .to(changingSplit.chars, {
          yPercent: -100,
          opacity: 0,
          stagger: {
            amount: 0.5,
            from: "random",
          },
          duration: 0.7,
          ease: "circ.inOut",
        })
        .to(
          descSplit.chars,
          {
            yPercent: -100,
            opacity: 0,
            stagger: {
              amount: 0.5,
              from: "random",
            },
            duration: 0.7,
            ease: "circ.inOut",
          },
          "<"
        );
    }
    
    // Delay only the first time the intro plays
    animateWords(!hasPlayed);
    
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
            <span className="changing-text"></span>
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
