import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'

const Nav = () => {
    useGSAP(() => {
        const menuItem = document.querySelectorAll('.menu-link');

        menuItem.forEach((item) => {
            const original = SplitText.create(
            item.querySelector(".menu-item"),        
            {
                type:"chars",
            })
            const duplicate = SplitText.create(
            item.querySelector(".menu-item-dupe"),        
            {
                type:"chars",
            })

            gsap.set(duplicate.chars, {
                yPercent:100,
            })


            const tl = gsap.timeline({paused: true});
            item.addEventListener("mouseenter", () => tl.play());
            item.addEventListener("mouseleave", () => tl.reverse());

                tl.to(original.chars, {
                    yPercent: -100,
                    duration: 0.05,
                    stagger:{
                      amount: 0.075,
                      from: 'end'  
                    },
                    duration: 0.35,
                    color: "#E67F22",
                    ease: 'circ .inOut'}, 0)
                tl.to(duplicate.chars, {
                    yPercent: 0,
                    duration: 0.05,
                    stagger:{
                      amount: 0.075,
                      from: 'end'  
                    },
                    duration: 0.35,
                    color: "#E67F22",
                    ease: 'circ .inOut'
                }, 0)
        })
        
        // Menu animation
        gsap.set(".menu-item-reveal", {
            yPercent: -100,
          });

        const textContainers = document.querySelectorAll('.menu-col')
        let SplitTextByContainer = [];

        textContainers.forEach((container) => {
            const textElements = container.querySelectorAll('.menu-item-wrapper, p, .menu-tag')
            let containerSplits =[];

            textElements.forEach((element) => {
                const split = SplitText.create(element, {
                    type: 'chars lines',
                    mask: 'lines',
                    linesClass: 'line'
                });
                containerSplits.push(split);
                gsap.set(split.lines, {
                    y:"100%"
                })
            })
            SplitTextByContainer.push(containerSplits)
        })

        const container = document.querySelector('.container-block');
        const menuToggleButton = document.querySelector('.menu-toggle-button');
        const menuOverlay = document.querySelector(".menu-overlay");
        const menuOverlayContainer = document.querySelector(".menu-overlay-content");
        const menuMediaWrapper = document.querySelector('.menu-media-wrapper');
        const copyContainers = document.querySelectorAll('.menu-col');
        const menuToggleLabel = document.querySelector('.menu-toggle-label p');
        const hamburgerIcon = document.querySelector('.menu-hamburger-icon')

        let isMenuOpen = false;
        let isAnimating = false;

        menuToggleButton.addEventListener("click", () => {
            if(isAnimating) return;

            if(!isMenuOpen) {
                isAnimating = true;

                menuOverlayContainer.classList.add("active");

                const tl = gsap.timeline();

                tl.to(menuToggleLabel, {
                    y: "-110%",
                    duration: 1,
                    ease: 'power2.inOut'
                })
                .to(".menu-item-reveal",{
                    yPercent: 0,
                    opacity:1,
                    stagger: 0.08,
                    duration: 1.5,
                    ease: 'circ.inOut'
                }, '<')
                .to(container, {
                    y:'100svh',
                    duration: 1,
                    ease: 'circ.inOut'
                }, '<').to(menuOverlay, {
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    duration: 1,
                    ease: 'circ.inOut'
                }, "<").to(menuOverlayContainer, {
                    yPercent: 0,
                    duration: 1,
                    ease: 'circ.inOut'
                }, "<")

                SplitTextByContainer.forEach((containerSplits) => {
                    const copyLines = containerSplits.flatMap((split) => split.lines)
                    tl.to(copyLines, {
                        y: "0%",
                        duration: 2,
                        ease: 'circ.inOut',
                        stagger: -0.075
                    }, -0.15)
                    
                })
                hamburgerIcon.classList.add("active")
                tl.call(() => {
                    isAnimating = false
                })
                isMenuOpen = true
            } else {
                isAnimating = true
                menuOverlayContainer.classList.remove("active");
                hamburgerIcon.classList.remove("active");
                const tl = gsap.timeline();

                tl.to(container, {
                    y: '0svh',
                    duration: 1,
                    ease: 'circ.inOut'
                }).to(menuOverlay, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    duration: 1,
                    ease: 'circ.inOut'
                }, '<').to(menuOverlayContainer, {
                    yPercent: -50,
                    duration: 1,
                    ease: 'circ.inOut'
                }, '<')
                .to(menuToggleLabel, {
                    y: "0%",
                    duration: 1,
                    ease: 'circ.inOut'
                }, "<")
                .to('.menu-item-reveal',{
                    yPercent: -100,
                    opacity: 0.25,
                    duration: 1.5
                }, "<")
                .to(copyContainers, {
                    opacity: 0.25,
                    duration:1,
                    ease: 'circ.inOut'
                }, "<")

                tl.call(() => {
                    SplitTextByContainer.forEach((containerSplits) => {
                        const copyLines = containerSplits.flatMap((split) => split.lines);
                        gsap.set(copyLines, {y: "-110%"});
                    })
                    gsap.set(copyContainers, {opacity: 1})
                    isAnimating =false;
                    isMenuOpen = false;
                })

            }
        })
    })
  return (
    <div>
      <nav>
        <div className="menu-bar">
            <div className="menu-logo">
                <a href="#Home">Jc</a>
            </div>
            <div className="menu-toggle-button">
                <div className="menu-toggle-label">
                    <p>Menu</p>
                </div>
                <div className="menu-hamburger-icon">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="menu-overlay">
            <div className="menu-overlay-content">
                <div className="menu-content-wrapper">
                    <div className="menu-content-main">
                        <div className="menu-col">
                            <div className="menu-link">
                                <a href="#" className='menu-item-reveal'>
                                    <span className='menu-item'>Home</span>
                                    <span className='menu-item-dupe'>Home</span> 
                                </a>
                            </div>
                            <div className="menu-link">
                                <a href="#" className='menu-item-reveal'>
                                    <span className='menu-item'>About</span>    
                                    <span className='menu-item-dupe'>About</span>
                                </a>
                            </div>
                            <div className="menu-link">
                                <a href="#" className='menu-item-reveal'>
                                    <span className='menu-item'>Projects</span>
                                    <span className='menu-item-dupe'>Projects</span>
                                </a>
                            </div>
                            <div className="menu-link">
                                <a href="#" className='menu-item-reveal'>
                                    <span className='menu-item'>Hire me</span>
                                    <span className='menu-item-dupe'>Hire me</span>
                                </a>
                            </div>
                        </div>
                        <div className="menu-col">
                            <div className="menu-tag"><a href="#">Frontend</a></div>
                            <div className="menu-tag"><a href="#">Fullstack</a></div>
                            <div className="menu-tag"><a href="#">Web Design</a></div>
                        </div>
                    </div>
                    <div className="menu-footer">
                        <div className="menu-col">
                            <p>Caloocan City, Philippines</p>
                        </div>
                        <div className="menu-col">
                            <p>+63 9507 047 474</p>
                            <p>jeremycervantes1304@gmail.com</p>
                            <p>github.com/j3remyC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
