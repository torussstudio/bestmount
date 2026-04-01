// import { useEffect } from "react";
// import Header from "../components/Header";
// import Materials from "../components/Materials";
// import CTA from "../components/CTA";
// import Container from "../components/layout/Container";
// import Section from "../components/layout/Section";
// import PrimaryButton from "../components/layout/PrimaryButton";
// import Seperator from "../components/layout/seperator";
// import HashLink from "../components/HashLink";

// const HomeBackground = ({ children }) => (
//   <div className="relative">
//     <div
//       className="
//         absolute inset-0
//         bg-[url('/home-bg.webp')]
//         bg-cover bg-[position:45%_10%] md:bg-center bg-no-repeat
//       "
//     />
//     <div className="absolute inset-0 bg-black/0" /> 
//     <div className="relative z-10">{children}</div>
//   </div>
// );

// export default function Home() {
//   return (
//     <>
//       <HomeBackground>
//         <Header />
        
//         {/* Hero section */}
//         <Section className="min-h-[85svh] md:min-h-screen flex items-center pt-24 pb-16 md:py-0 relative overflow-hidden">
//           <Container>
//             <div className="flex flex-col items-start justify-center w-full max-w-full">
//               <h1 className="text-[22px] min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-6xl leading-[1.1] md:leading-[1.15] font-skoda-expanded text-yellow-400 w-full whitespace-normal break-words pr-2">
//                 Sustainable Raw Materials, Perfectly Streamlined<sup className="hero-reg">&trade;</sup>.
//               </h1>

//               <p className="mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed">
//                 Discover sustainable raw materials that integrate functionality,
//                 value, and responsibility—shaping the present and advancing the future.
//               </p>

//               <HashLink to="/#materials" offset={100} className="mt-8 md:mt-10 inline-block">
//                 <PrimaryButton>Explore Our Materials</PrimaryButton>
//               </HashLink>
//             </div>
//           </Container>
//         </Section>
        
//         <Container>
//           <Seperator />
//         </Container>
        
//         <Materials />
        
//         {/* About section */}
//         <Section className="min-h-[75vh]">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
//               {/* Left label */}
//               <div className="md:col-span-3">
//                 <span className="text-sm uppercase tracking-wider ">
//                   About Us
//                 </span>
//               </div>

//               {/* Right content */}
//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
//                   From Glass to Growth
//                 </h2>
//                 <p className="mt-4">
//                   Best Mountain specializes in sourcing, processing and supplying sustainable raw materials for industries worldwide. 
//                   Rooted in the strength of glass and glass fiber furnaces, our materials powers ceramics, refractories and other specialty 
//                   industrial applications
//                 </p>
//               </div>
//               <div className="md:col-span-12 mt-15">
//                 <p className="text-3xl md:text-7xl font-thin">Sustainable sourcing, reliable supply, and long-term partnerships.</p>
//               </div>
//             </div>
//           </Container>
//         </Section>
//       </HomeBackground>
//       <CTA />
//     </>
//   );
// }

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import SplitText from "gsap/SplitText";

// import Header from "../components/Header";
// import Materials from "../components/Materials";
// import CTA from "../components/CTA";
// import Container from "../components/layout/Container";
// import Section from "../components/layout/Section";
// import PrimaryButton from "../components/layout/PrimaryButton";
// import Seperator from "../components/layout/seperator";
// import HashLink from "../components/HashLink";

// gsap.registerPlugin(SplitText);

// const HomeBackground = ({ children }) => (
//   <div className="relative">
//     <div
//       className="
//         absolute inset-0
//         bg-[url('/home-bg.webp')]
//         bg-cover bg-[position:45%_10%] md:bg-center bg-no-repeat
//       "
//     />
//     <div className="absolute inset-0 bg-black/0" />
//     <div className="relative z-10">{children}</div>
//   </div>
// );

// /* ─────────────────────────────────────────────────────────────
//    Premium line reveal config
//    — subtle y lift, feather-light rotation, blur fade
//    — "expo.out" gives that luxurious deceleration feel
// ───────────────────────────────────────────────────────────── */
// const LINE_FROM = {
//   y:          18,          // gentle upward drift — not dramatic
//   rotationX:  6,           // barely-there tilt, just enough depth
//   opacity:    0,
//   filter:     "blur(6px)", // soft focus-in moment
//   transformOrigin: "0% 50%",
// };

// const LINE_EASE     = "expo.out";
// const LINE_DURATION = 0.95;  // slow enough to feel premium
// const LINE_STAGGER  = 0.09;  // tight stagger — lines cascade, not parade

// /* ─────────────────────────────────────────────────────────────
//    Reusable helper — splits, builds, returns cleanup
// ───────────────────────────────────────────────────────────── */
// function animateSection(buildFn) {
//   const splits = [];
//   const splitText = (el, options) => {
//     const s = SplitText.create(el, { linesClass: "overflow-hidden", ...options });
//     splits.push(s);
//     return s;
//   };

//   const tl = gsap.timeline({ defaults: { ease: LINE_EASE } });
//   buildFn({ tl, splitText });

//   return () => {
//     tl.kill();
//     splits.forEach((s) => s.revert());
//   };
// }

// /* ─────────────────────────────────────────────────────────────
//    Animation definitions
// ───────────────────────────────────────────────────────────── */
// const animations = {

//   hero: ({ tl, splitText }, refs) => {
//     const { heroTitleRef, heroParaRef, buttonRef } = refs;
//     const title = splitText(heroTitleRef.current, { type: "lines" });
//     const para  = splitText(heroParaRef.current,  { type: "lines" });

//     // Title — calm, unhurried entrance
//     tl.from(title.lines, {
//       ...LINE_FROM,
//       duration: LINE_DURATION,
//       stagger:  LINE_STAGGER,
//       delay:    0.1,
//     })

//     // Para — starts while title is still settling
//     .from(para.lines, {
//       ...LINE_FROM,
//       duration: LINE_DURATION * 0.9,
//       stagger:  LINE_STAGGER,
//     }, `-=${LINE_DURATION * 0.55}`)

//     // Button — appears just before last para line finishes
//     .fromTo(
//       buttonRef.current,
//       { opacity: 0, y: 10, filter: "blur(4px)" },
//       { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.6, ease: "expo.out" },
//       `-=${LINE_DURATION * 0.45}`  // slightly before text completes
//     );
//   },

//   about: ({ tl, splitText }, refs) => {

//   const {
//     aboutLabelRef,
//     aboutTitleRef,
//     aboutParaRef,
//     bigTextRef
//   } = refs;

//   const title = splitText(aboutTitleRef.current, { type: "lines" });
//   const para  = splitText(aboutParaRef.current,  { type: "lines" });
//   const big   = splitText(bigTextRef.current,    { type: "lines" });

//   tl.from(aboutLabelRef.current, {
//       opacity: 0,
//       y: 8,
//       filter: "blur(4px)",
//       duration: 0.9,
//     })

//     .from(title.lines, {
//       ...LINE_FROM,
//       duration: LINE_DURATION,
//       stagger: LINE_STAGGER
//     }, "-=0.3")

//     .from(para.lines, {
//       ...LINE_FROM,
//       duration: LINE_DURATION,
//       stagger: LINE_STAGGER
//     }, `-=${LINE_DURATION * 0.6}`)

//     // big text AFTER paragraph finishes
//     .from(big.lines, {
//       ...LINE_FROM,
//       y: 22,
//       duration: LINE_DURATION * 1.05,
//       stagger: 0.13
//     }, "+=0.15");

// },

//   bigText: ({ tl, splitText }, refs) => {
//     const { bigTextRef } = refs;
//     const big = splitText(bigTextRef.current, { type: "lines" });

//     // Big quote — slightly more airy stagger for the large type
//     tl.from(big.lines, {
//       ...LINE_FROM,
//       y:        22,         // a touch more lift for large text
//       duration: LINE_DURATION * 1.05,
//       stagger:  0.11,
//     });
//   },
// };

// export default function Home() {
//   const heroTitleRef  = useRef(null);
//   const heroParaRef   = useRef(null);
//   const buttonRef     = useRef(null);

//   const aboutLabelRef = useRef(null);
//   const aboutTitleRef = useRef(null);
//   const aboutParaRef  = useRef(null);
//   const bigTextRef    = useRef(null);

//   useEffect(() => {
//     const sections = [
//       {
//         trigger: heroTitleRef,
//         animate: animations.hero,
//         refs:    { heroTitleRef, heroParaRef, buttonRef },
//       },
//      {
//   trigger: aboutTitleRef,
//   animate: animations.about,
//   refs: {
//     aboutLabelRef,
//     aboutTitleRef,
//     aboutParaRef,
//     bigTextRef
//   },
// },
//     ];

//     const cleanups = new Map();

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//          if (!entry.isIntersecting) return;

// const section = sections.find((s) => s.trigger.current === entry.target);
// if (!section) return;

// cleanups.get(entry.target)?.();

// const cleanup = animateSection((ctx) =>
//   section.animate(ctx, section.refs)
// );

// cleanups.set(entry.target, cleanup);

// // 👇 stop observing after first animation
// observer.unobserve(entry.target);
//         });
//       },
//       { threshold: 0.25 }
//     );

//     sections.forEach(({ trigger }) => {
//       if (trigger.current) observer.observe(trigger.current);
//     });

//     return () => {
//       cleanups.forEach((cleanup) => cleanup());
//       sections.forEach(({ trigger }) => {
//         if (trigger.current) observer.unobserve(trigger.current);
//       });
//     };
//   }, []);

//   return (
//     <>
//       <HomeBackground>

//         <Header />

//         <Section className="min-h-[85svh] md:min-h-screen flex items-center pt-24 pb-16 md:py-0 relative overflow-hidden">
//           <Container>
//             <div className="flex flex-col items-start justify-center w-full max-w-full">

//               <h1
//                 ref={heroTitleRef}
//                 className="text-[22px] min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-6xl leading-[1.1] md:leading-[1.15] font-skoda-expanded text-yellow-400 w-full whitespace-normal break-words pr-2"
//               >
//                 Sustainable Raw Materials, Perfectly Streamlined<sup className="hero-reg">&trade;</sup>.
//               </h1>

//               <p
//                 ref={heroParaRef}
//                 className="mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed"
//               >
//                 Discover sustainable raw materials that integrate functionality,
//                 value, and responsibility—shaping the present and advancing the future.
//               </p>

//               <HashLink
//                 ref={buttonRef}
//                 to="/#materials"
//                 offset={100}
//                 className="mt-8 md:mt-10 inline-block"
//               >
//                 <PrimaryButton>
//                   Explore Our Materials
//                 </PrimaryButton>
//               </HashLink>

//             </div>
//           </Container>
//         </Section>

//         <Container>
//           <Seperator />
//         </Container>

//         <Materials />

//         <Section className="min-h-[75vh]">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">

//               <div className="md:col-span-3">
//                 <span ref={aboutLabelRef} className="text-sm uppercase tracking-wider">
//                   About Us
//                 </span>
//               </div>

//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2
//                   ref={aboutTitleRef}
//                   className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400"
//                 >
//                   From Glass to Growth
//                 </h2>

//                 <p ref={aboutParaRef} className="mt-4">
//                   Best Mountain specializes in sourcing, processing and supplying sustainable raw materials for industries worldwide.
//                   Rooted in the strength of glass and glass fiber furnaces, our materials powers ceramics, refractories and other specialty
//                   industrial applications
//                 </p>
//               </div>

//               <div className="md:col-span-12 mt-15">
//                 <p
//                   ref={bigTextRef}
//                   className="text-3xl md:text-7xl font-thin leading-tight"
//                 >
//                   Sustainable sourcing, reliable supply, and long-term partnerships.
//                 </p>
//               </div>

//             </div>
//           </Container>
//         </Section>

//       </HomeBackground>

//       <CTA />
//     </>
//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

import Header from "../components/Header";
import Materials from "../components/Materials";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import PrimaryButton from "../components/layout/PrimaryButton";
import Seperator from "../components/layout/seperator";
import HashLink from "../components/HashLink";

gsap.registerPlugin(SplitText, ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Background wrapper
───────────────────────────────────────────────────────────── */
const HomeBackground = ({ children }) => (
  <div className="relative">
    <div
      className="
        absolute inset-0
        bg-[url('/home-bg.webp')]
        bg-cover bg-[position:45%_10%] md:bg-center bg-no-repeat
      "
    />
    <div className="absolute inset-0 bg-black/0" />
    <div className="relative z-10">{children}</div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Easing tokens
   — each section has its own character
───────────────────────────────────────────────────────────── */
const EASE_TITLE = "power4.out";   // snappy, weighty — headlines
const EASE_PARA  = "expo.out";     // smooth, trailing — body copy
const EASE_BIG   = "circ.out";     // cinematic decel — display quote
const EASE_UI    = "expo.out";     // controls, labels, buttons

/* ─────────────────────────────────────────────────────────────
   Base "from" state for line reveals
   — call lineFrom({...overrides}) per context
───────────────────────────────────────────────────────────── */
const lineFrom = (overrides = {}) => ({
  autoAlpha:        0,
  y:                20,
  rotationX:        8,
  filter:           "blur(5px)",
  transformOrigin:  "0% 50%",
  transformPerspective: 600,
  ...overrides,
});

/* ─────────────────────────────────────────────────────────────
   Inject overflow-hidden mask once (for SplitText lines)
───────────────────────────────────────────────────────────── */
const injectMaskStyle = (() => {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    const s = document.createElement("style");
    s.textContent = `.split-line { overflow: hidden; display: block; }`;
    document.head.appendChild(s);
  };
})();

/* ─────────────────────────────────────────────────────────────
   HERO animation builder
───────────────────────────────────────────────────────────── */
function buildHero({ heroTitleRef, heroParaRef, buttonRef }) {
  injectMaskStyle();

  const titleSplit = SplitText.create(heroTitleRef.current, {
    type:       "lines",
    linesClass: "split-line",
  });
  const paraSplit = SplitText.create(heroParaRef.current, {
    type:       "lines",
    linesClass: "split-line",
  });

  // Prime GPU layers before animation starts
  gsap.set([titleSplit.lines, paraSplit.lines, buttonRef.current], {
    willChange: "transform, opacity, filter",
  });

  const tl = gsap.timeline({ paused: true })

    /* H1 — power4: snappy authority */
    .from(titleSplit.lines, {
      ...lineFrom(),
      ease:     EASE_TITLE,
      duration: 1.05,
      stagger:  0.085,
      delay:    0.05,
    })

    /* Paragraph — expo: softer, trails behind */
    .from(paraSplit.lines, {
      ...lineFrom({ y: 16, rotationX: 5, filter: "blur(4px)" }),
      ease:     EASE_PARA,
      duration: 0.9,
      stagger:  0.07,
    }, "-=0.55")

    /* Button — scale-blur entrance, physical feel */
    .fromTo(
      buttonRef.current,
      { autoAlpha: 0, y: 14, scale: 0.95, filter: "blur(5px)" },
      { autoAlpha: 1, y: 0,  scale: 1,    filter: "blur(0px)", ease: EASE_UI, duration: 0.7 },
      "-=0.42"
    )

    /* Release GPU memory after animation settles */
    .call(() => {
      gsap.set([titleSplit.lines, paraSplit.lines, buttonRef.current], {
        willChange: "auto",
      });
    });

  return {
    tl,
    cleanup: () => {
      tl.kill();
      titleSplit.revert();
      paraSplit.revert();
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   ABOUT animation builder
───────────────────────────────────────────────────────────── */
function buildAbout({ aboutLabelRef, aboutTitleRef, aboutParaRef, bigTextRef }) {
  injectMaskStyle();

  const titleSplit = SplitText.create(aboutTitleRef.current, {
    type:       "lines",
    linesClass: "split-line",
  });
  const paraSplit = SplitText.create(aboutParaRef.current, {
    type:       "lines",
    linesClass: "split-line",
  });

  // Big quote: split by words AND lines
  // words animate individually (shimmer), lines act as overflow masks
  const bigSplit = SplitText.create(bigTextRef.current, {
    type:       "lines,words",
    linesClass: "split-line",
  });

  gsap.set(
    [aboutLabelRef.current, titleSplit.lines, paraSplit.lines, bigSplit.words],
    { willChange: "transform, opacity, filter" }
  );

  const tl = gsap.timeline({ paused: true })

    /* Label — slides in from left */
    .fromTo(
      aboutLabelRef.current,
      { autoAlpha: 0, x: -10, filter: "blur(3px)" },
      { autoAlpha: 1, x: 0,   filter: "blur(0px)", ease: EASE_UI, duration: 0.85 }
    )

    /* H2 — power4, authoritative */
    .from(titleSplit.lines, {
      ...lineFrom(),
      ease:     EASE_TITLE,
      duration: 0.95,
      stagger:  0.085,
    }, "-=0.38")

    /* Paragraph — expo, natural follow */
    .from(paraSplit.lines, {
      ...lineFrom({ y: 15, filter: "blur(3px)" }),
      ease:     EASE_PARA,
      duration: 0.88,
      stagger:  0.068,
    }, "-=0.5")

    /* Big quote — word-level shimmer cascade
       circ.out gives it weight and cinematic decel
       35ms per-word stagger at text-7xl = luxurious ripple */
    .from(bigSplit.words, {
      autoAlpha:           0,
      y:                   30,
      rotationX:           12,
      filter:              "blur(7px)",
      transformOrigin:     "0% 50%",
      transformPerspective: 900,
      ease:                EASE_BIG,
      duration:            1.15,
      stagger: {
        each: 0.034,
        from: "start",
      },
    }, "+=0.12")

    /* Release GPU */
    .call(() => {
      gsap.set(
        [aboutLabelRef.current, titleSplit.lines, paraSplit.lines, bigSplit.words],
        { willChange: "auto" }
      );
    });

  return {
    tl,
    cleanup: () => {
      tl.kill();
      titleSplit.revert();
      paraSplit.revert();
      bigSplit.revert();
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   Page component
───────────────────────────────────────────────────────────── */
export default function Home() {
  /* Hero refs */
  const heroTitleRef = useRef(null);
  const heroParaRef  = useRef(null);
  const buttonRef    = useRef(null);

  /* About refs */
  const aboutLabelRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutParaRef  = useRef(null);
  const bigTextRef    = useRef(null);

  useEffect(() => {
    /* Build both timelines upfront */
    const hero  = buildHero({ heroTitleRef, heroParaRef, buttonRef });
    const about = buildAbout({ aboutLabelRef, aboutTitleRef, aboutParaRef, bigTextRef });

    /* ── Hero fires immediately (above fold) ──────────────── */
    hero.tl.play();

    /* ── About fires on scroll via ScrollTrigger ──────────── */
    ScrollTrigger.create({
      trigger: aboutTitleRef.current,
      start:   "top 78%",   // slightly earlier than raw 75% threshold
      once:    true,
      onEnter: () => about.tl.play(),
    });

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      hero.cleanup();
      about.cleanup();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <HomeBackground>

        <Header />

        {/* ── HERO ───────────────────────────────────────── */}
        <Section className="min-h-[85svh] md:min-h-screen flex items-center pt-24 pb-16 md:py-0 relative overflow-hidden">
          <Container>
            <div className="flex flex-col items-start justify-center w-full max-w-full">

              <h1
                ref={heroTitleRef}
                className="text-[22px] min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-6xl leading-[1.1] md:leading-[1.15] font-skoda-expanded text-yellow-400 w-full whitespace-normal break-words pr-2"
              >
                Sustainable Raw Materials, Perfectly Streamlined<sup className="hero-reg">&trade;</sup>.
              </h1>

              <p
                ref={heroParaRef}
                className="mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed"
              >
                Discover sustainable raw materials that integrate functionality,
                value, and responsibility—shaping the present and advancing the future.
              </p>

              <HashLink
                ref={buttonRef}
                to="/#materials"
                offset={100}
                className="mt-8 md:mt-10 inline-block"
              >
                <PrimaryButton>
                  Explore Our Materials
                </PrimaryButton>
              </HashLink>

            </div>
          </Container>
        </Section>

        <Container>
          <Seperator />
        </Container>

        <Materials />

        {/* ── ABOUT ──────────────────────────────────────── */}
        <Section className="min-h-[75vh]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">

              <div className="md:col-span-3">
                <span
                  ref={aboutLabelRef}
                  className="text-sm uppercase tracking-wider"
                >
                  About Us
                </span>
              </div>

              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2
                  ref={aboutTitleRef}
                  className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400"
                >
                  From Glass to Growth
                </h2>

                <p ref={aboutParaRef} className="mt-4">
                  Best Mountain specializes in sourcing, processing and supplying
                  sustainable raw materials for industries worldwide. Rooted in the
                  strength of glass and glass fiber furnaces, our materials powers
                  ceramics, refractories and other specialty industrial applications.
                </p>
              </div>

              <div className="md:col-span-12 mt-15">
                <p
                  ref={bigTextRef}
                  className="text-3xl md:text-7xl font-thin leading-tight"
                >
                  Sustainable sourcing, reliable supply, and long-term partnerships.
                </p>
              </div>

            </div>
          </Container>
        </Section>

      </HomeBackground>

      <CTA />
    </>
  );
}