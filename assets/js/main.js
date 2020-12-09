$(document).ready(function() {

    /* glass morphism gsap animation */

    const glass = document.getElementById('glass');

    const tlGlass = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1.5 } })

    tlGlass.from('img', { x: '-10%', opacity: 0 })
        .from('.glass', { opacity: 0, delay: .5, duration: 1 }, "-=1.5")
        .from('.glass', { x: '-20%', backdropFilter: 'blur(0px)' })
        .from('.seq', { y: -30, opacity: 0, stagger: .2, duration: .5 }, "-=.5")
        .from('h1', { y: 20, clipPath: 'inset(0 0 100% 0)' }, "-=.8")

    /* svg animation gsap config */

    /* locomotive scroll config */
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".smooth-scroll"),
        smooth: true
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    /*  gsap scroll trigger begins */
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.matchMedia({
        // setup animations and ScrollTriggers for desktops here...
        // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore

        /**********  match media for desktops ***********/
        "(min-width: 768px)": () => {

            /* execute on enter */
            const playonEnter = () => {
                var tl = gsap.timeline({ defaults: { duration: .7, ease: Back.easeOut.config(2), opacity: 0 } })
                var tl2 = gsap.timeline({ defaults: { duration: 1.5, delay: 1 } });
                var tl3 = gsap.timeline({ defaults: { duration: 1.5 } });

                tl.from(".card-bg", { delay: 1, scale: .2, transformOrigin: 'center' }, "=.2")
                    .from(".card-top", { scaleY: 0, transformOrigin: 'top' })
                    .from(".icon", { scale: .2, transformOrigin: 'center' }, "-=.7")
                    .from(".blip1", { scaleX: 0 })
                    .from(".blip2", { scaleX: 0 }, "-=.2")
                    .from(".blip3", { scaleX: 0 }, "-=.3")
                    .from(".blip4", { scaleX: 0 }, "-=.5")
                    .from(".blip5", { scaleX: 0 }, "-=.7")

                tl2.to(".whole-card", { y: 10, repeat: 8, yoyo: true })

                tl3.from(".main-content", { opacity: 0, y: 40, stagger: .3 })

            }

            /* svg scroll trigger config */
            ScrollTrigger.create({
                trigger: '.animate-section',
                pin: false,
                scrub: true,
                start: "top 100px",
                // end: "+=500",
                scroller: ".smooth-scroll",
                /* callbacks starts */
                onEnter: playonEnter,

            });
        },

        /**********  match media for mobiles ***********/

        "(max-width: 768px)": () => {
            /* execute on enter */
            const playonEnter = () => {
                var tl = gsap.timeline({ defaults: { duration: .7, ease: Back.easeOut.config(2), opacity: 0 } })
                var tl2 = gsap.timeline({ defaults: { duration: 1.5, delay: 1 } });
                var tl3 = gsap.timeline({ defaults: { duration: 1.5 } });

                tl.from(".card-bg", { delay: 1, scale: .2, transformOrigin: 'center' }, "=.2")
                    .from(".card-top", { scaleY: 0, transformOrigin: 'top' })
                    .from(".icon", { scale: .2, transformOrigin: 'center' }, "-=.7")
                    .from(".blip1", { scaleX: 0 })
                    .from(".blip2", { scaleX: 0 }, "-=.2")
                    .from(".blip3", { scaleX: 0 }, "-=.3")
                    .from(".blip4", { scaleX: 0 }, "-=.5")
                    .from(".blip5", { scaleX: 0 }, "-=.7")

                tl2.to(".whole-card", { y: 10, repeat: 8, yoyo: true })

                tl3.from(".main-content", { opacity: 0, y: 40, stagger: .3 })

            }

            /* svg scroll trigger config */
            ScrollTrigger.create({
                trigger: '.animate-section',
                pin: false,
                scrub: true,
                start: "top 100px",
                // end: "+=500",
                scroller: ".smooth-scroll",
                /* callbacks starts */
                onEnter: playonEnter,

            });
        }
    });

});