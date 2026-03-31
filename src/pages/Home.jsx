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

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import Header from "../components/Header";
import Materials from "../components/Materials";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import PrimaryButton from "../components/layout/PrimaryButton";
import Seperator from "../components/layout/seperator";
import HashLink from "../components/HashLink";

gsap.registerPlugin(SplitText);

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
   Premium line reveal config
   — subtle y lift, feather-light rotation, blur fade
   — "expo.out" gives that luxurious deceleration feel
───────────────────────────────────────────────────────────── */
const LINE_FROM = {
  y:          18,          // gentle upward drift — not dramatic
  rotationX:  6,           // barely-there tilt, just enough depth
  opacity:    0,
  filter:     "blur(6px)", // soft focus-in moment
  transformOrigin: "0% 50%",
};

const LINE_EASE     = "expo.out";
const LINE_DURATION = 0.95;  // slow enough to feel premium
const LINE_STAGGER  = 0.09;  // tight stagger — lines cascade, not parade

/* ─────────────────────────────────────────────────────────────
   Reusable helper — splits, builds, returns cleanup
───────────────────────────────────────────────────────────── */
function animateSection(buildFn) {
  const splits = [];
  const splitText = (el, options) => {
    const s = SplitText.create(el, { linesClass: "overflow-hidden", ...options });
    splits.push(s);
    return s;
  };

  const tl = gsap.timeline({ defaults: { ease: LINE_EASE } });
  buildFn({ tl, splitText });

  return () => {
    tl.kill();
    splits.forEach((s) => s.revert());
  };
}

/* ─────────────────────────────────────────────────────────────
   Animation definitions
───────────────────────────────────────────────────────────── */
const animations = {

  hero: ({ tl, splitText }, refs) => {
    const { heroTitleRef, heroParaRef, buttonRef } = refs;
    const title = splitText(heroTitleRef.current, { type: "lines" });
    const para  = splitText(heroParaRef.current,  { type: "lines" });

    // Title — calm, unhurried entrance
    tl.from(title.lines, {
      ...LINE_FROM,
      duration: LINE_DURATION,
      stagger:  LINE_STAGGER,
      delay:    0.1,
    })

    // Para — starts while title is still settling
    .from(para.lines, {
      ...LINE_FROM,
      duration: LINE_DURATION * 0.9,
      stagger:  LINE_STAGGER,
    }, `-=${LINE_DURATION * 0.55}`)

    // Button — appears just before last para line finishes
    .fromTo(
      buttonRef.current,
      { opacity: 0, y: 10, filter: "blur(4px)" },
      { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.6, ease: "expo.out" },
      `-=${LINE_DURATION * 0.45}`  // slightly before text completes
    );
  },

  about: ({ tl, splitText }, refs) => {

  const {
    aboutLabelRef,
    aboutTitleRef,
    aboutParaRef,
    bigTextRef
  } = refs;

  const title = splitText(aboutTitleRef.current, { type: "lines" });
  const para  = splitText(aboutParaRef.current,  { type: "lines" });
  const big   = splitText(bigTextRef.current,    { type: "lines" });

  tl.from(aboutLabelRef.current, {
      opacity: 0,
      y: 8,
      filter: "blur(4px)",
      duration: 0.9,
    })

    .from(title.lines, {
      ...LINE_FROM,
      duration: LINE_DURATION,
      stagger: LINE_STAGGER
    }, "-=0.3")

    .from(para.lines, {
      ...LINE_FROM,
      duration: LINE_DURATION,
      stagger: LINE_STAGGER
    }, `-=${LINE_DURATION * 0.6}`)

    // big text AFTER paragraph finishes
    .from(big.lines, {
      ...LINE_FROM,
      y: 22,
      duration: LINE_DURATION * 1.05,
      stagger: 0.13
    }, "+=0.15");

},

  bigText: ({ tl, splitText }, refs) => {
    const { bigTextRef } = refs;
    const big = splitText(bigTextRef.current, { type: "lines" });

    // Big quote — slightly more airy stagger for the large type
    tl.from(big.lines, {
      ...LINE_FROM,
      y:        22,         // a touch more lift for large text
      duration: LINE_DURATION * 1.05,
      stagger:  0.11,
    });
  },
};

export default function Home() {
  const heroTitleRef  = useRef(null);
  const heroParaRef   = useRef(null);
  const buttonRef     = useRef(null);

  const aboutLabelRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutParaRef  = useRef(null);
  const bigTextRef    = useRef(null);

  useEffect(() => {
    const sections = [
      {
        trigger: heroTitleRef,
        animate: animations.hero,
        refs:    { heroTitleRef, heroParaRef, buttonRef },
      },
     {
  trigger: aboutTitleRef,
  animate: animations.about,
  refs: {
    aboutLabelRef,
    aboutTitleRef,
    aboutParaRef,
    bigTextRef
  },
},
    ];

    const cleanups = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
         if (!entry.isIntersecting) return;

const section = sections.find((s) => s.trigger.current === entry.target);
if (!section) return;

cleanups.get(entry.target)?.();

const cleanup = animateSection((ctx) =>
  section.animate(ctx, section.refs)
);

cleanups.set(entry.target, cleanup);

// 👇 stop observing after first animation
observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach(({ trigger }) => {
      if (trigger.current) observer.observe(trigger.current);
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      sections.forEach(({ trigger }) => {
        if (trigger.current) observer.unobserve(trigger.current);
      });
    };
  }, []);

  return (
    <>
      <HomeBackground>

        <Header />

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

        <Section className="min-h-[75vh]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">

              <div className="md:col-span-3">
                <span ref={aboutLabelRef} className="text-sm uppercase tracking-wider">
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
                  Best Mountain specializes in sourcing, processing and supplying sustainable raw materials for industries worldwide.
                  Rooted in the strength of glass and glass fiber furnaces, our materials powers ceramics, refractories and other specialty
                  industrial applications
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