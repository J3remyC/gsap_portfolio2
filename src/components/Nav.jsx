import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'

const Nav = () => {
    useGSAP(() => {
        const textContainers = document.querySelectorAll('.menu-col')
        let SplitTextByContainer = [];

        textContainers.forEach((container) => {
            const textElements = container.querySelectorAll('a, p')
            let containerSplits =[];

            textElements.forEach((element) => {
                const split = SplitText.create(element, {
                    type: 'lines',
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

                const tl = gsap.timeline();
                tl.to(menuToggleLabel, {
                    y: "-110%",
                    duration: 1,
                    ease: 'power2.inOut'
                }).to(container, {
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
                }, '<').to(menuToggleLabel, {
                    y: "0%",
                    duration: 1,
                    ease: 'circ.inOut'
                }, "<").to(copyContainers, {
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
                <a href="#Home">Jeremy</a>
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
                            <div className="menu-link"><a href="#">Home</a></div>
                            <div className="menu-link"><a href="#">About</a></div>
                            <div className="menu-link"><a href="#">Projects</a></div>
                            <div className="menu-link"><a href="#">Hire me</a></div>
                        </div>
                        <div className="menu-col">
                            <div className="menu-tag"><a href="#">Frontend Developer</a></div>
                            <div className="menu-tag"><a href="#">Fullstack Developer</a></div>
                            <div className="menu-tag"><a href="#">Web Designer</a></div>
                        </div>
                    </div>
                    <div className="menu-footer">
                        <div className="menu-col">
                            <p>Caloocan City, Philippines</p>
                        </div>
                        <div className="menu-col">
                            <p>+63 9507 047 474</p>
                            <p>+63 9507 047 474</p>
                            <p>+63 9507 047 474</p>
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
