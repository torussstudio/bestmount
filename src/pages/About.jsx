// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitText from "gsap/SplitText";

// import Header from "../components/Header";
// import CTA from "../components/CTA";
// import Container from "../components/layout/Container";
// import Section from "../components/layout/Section";
// import Seperator from "../components/layout/seperator";
// import arrowRight         from "../assets/images/arrow-right.png";
// import reliabilityIcon    from "../assets/images/reliability.png";
// import sustainabilityIcon from "../assets/images/sustainability.png";
// import valueIcon          from "../assets/images/value.png";
// import continuityIcon     from "../assets/images/continuity.png";

// /* ─────────────────────────────────────────────
//    Animation constants
// ───────────────────────────────────────────── */
// const EASE     = "expo.out";
// const DURATION = 1.4;
// const STAGGER  = 0.085;

// const LINE_FROM = {
//   y:               22,
//   rotationX:       8,
//   opacity:         0,
//   filter:          "blur(8px)",
//   transformOrigin: "0% 50%",
// };

// /* ─────────────────────────────────────────────
//    Value card data
//    col = desktop grid-column (checkerboard)
// ───────────────────────────────────────────── */
// const VALUE_CARDS = [
//   { icon: reliabilityIcon,    label: "Reliability",    col: 1 },
//   { icon: valueIcon,          label: "Value",          col: 3 },
//   { icon: sustainabilityIcon, label: "Sustainability", col: 2 },
//   { icon: continuityIcon,     label: "Continuity",     col: 4 },
// ];

// /* ─────────────────────────────────────────────
//    Animation helper — scroll-triggered section
// ───────────────────────────────────────────── */
// function buildScrollSection({ trigger, textRefs, extraRefs = [], start = "top 78%" }) {
//   const splits = [];

//   const tl = gsap.timeline({
//     scrollTrigger: { trigger: trigger.current, start, once: true },
//     defaults: { ease: EASE },
//   });

//   textRefs.forEach((ref, i) => {
//     if (!ref?.current) return;
//     const s = SplitText.create(ref.current, { type: "lines", linesClass: "overflow-hidden" });
//     splits.push(s);
//     tl.from(s.lines, { ...LINE_FROM, duration: DURATION, stagger: STAGGER }, i === 0 ? 0 : "-=0.75");
//   });

//   extraRefs.forEach((ref) => {
//     if (!ref?.current) return;
//     tl.from(ref.current, { y: 30, opacity: 0, duration: 1.1, ease: EASE }, "-=0.9");
//   });

//   return () => { tl.scrollTrigger?.kill(); tl.kill(); splits.forEach((s) => s.revert()); };
// }

// /* ─────────────────────────────────────────────
//    ValueCard component
// ───────────────────────────────────────────── */
// function ValueCard({ icon, label, cardRef, style }) {
//   return (
//     <div
//       ref={cardRef}
//       style={style}
//       className="relative bg-white/10 backdrop-blur-md flex flex-col items-center
//         justify-center p-8 max-md:p-4 gap-4 aspect-square group"
//     >
//       <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60" />
//       <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
//       <div className="relative z-10 flex flex-col items-center gap-4">
//         <img src={icon} alt={label} className="w-20 h-20 md:w-32 md:h-32" />
//         <span className="text-white text-xl md:text-2xl font-thin">{label}</span>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Background wrapper
// ───────────────────────────────────────────── */
// function AboutBackground({ children }) {
//   return (
//     <div
//       className="relative bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: "url('/about-bg.webp')" }}
//     >
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Page — all useRef/useEffect at top level,
//    never inside arrays or conditionals
// ───────────────────────────────────────────── */
// export default function About() {
//   /* hero */
//   const heroTitleRef = useRef(null);
//   const heroParaRef  = useRef(null);
//   const heroArrowRef = useRef(null);

//   /* story */
//   const storyLabelRef = useRef(null);
//   const storyTitleRef = useRef(null);
//   const storyParaRef  = useRef(null);
//   const storyBigRef   = useRef(null);
//   const storyGridRef  = useRef(null);

//   /* stand */
//   const standLabelRef = useRef(null);
//   const standTitleRef = useRef(null);
//   const standParaRef  = useRef(null);

//   /* value cards — declared individually (Rules of Hooks) */
//   const card1Ref = useRef(null);
//   const card2Ref = useRef(null);
//   const card3Ref = useRef(null);
//   const card4Ref = useRef(null);

//   /* philosophy */
//   const philosophyLabelRef = useRef(null);
//   const philosophyTitleRef = useRef(null);
//   const philosophyParaRef  = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(SplitText, ScrollTrigger);

//     const cleanups  = [];
//     let   cancelled = false;

//     document.fonts.ready.then(() => {
//       if (cancelled) return;

//       /* 1 — HERO (immediate, no scroll trigger) */
//       (() => {
//         const splits = [];
//         const tl     = gsap.timeline({ defaults: { ease: EASE } });

//         [heroTitleRef, heroParaRef].forEach((ref, i) => {
//           if (!ref.current) return;
//           const s = SplitText.create(ref.current, { type: "lines", linesClass: "overflow-hidden" });
//           splits.push(s);
//           tl.from(s.lines, { ...LINE_FROM, duration: DURATION, stagger: STAGGER }, i === 0 ? 0.2 : "-=0.75");
//         });

//         if (heroArrowRef.current) {
//           tl.from(heroArrowRef.current, { x: -16, opacity: 0, duration: 1, ease: EASE }, "-=0.9");
//         }

//         cleanups.push(() => { tl.kill(); splits.forEach((s) => s.revert()); });
//       })();

//       /* 2 — STORY */
//       cleanups.push(buildScrollSection({
//         trigger:   storyTitleRef,
//         textRefs:  [storyLabelRef, storyTitleRef, storyParaRef, storyBigRef],
//         extraRefs: [storyGridRef],
//         start:     "top 80%",
//       }));

//       /* 3 — STAND */
//       cleanups.push(buildScrollSection({
//         trigger:  standTitleRef,
//         textRefs: [standLabelRef, standTitleRef, standParaRef],
//         start:    "top 80%",
//       }));

//       /* 4 — VALUE CARDS: staggered cascade */
//       (() => {
//         const cards = [card1Ref, card2Ref, card3Ref, card4Ref]
//           .map((r) => r.current)
//           .filter(Boolean);
//         if (!cards.length) return;

//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: cards[0], start: "top 82%", once: true },
//           defaults:       { ease: "back.out(1.4)" },
//         });
//         tl.from(cards, { y: 40, opacity: 0, scale: 0.94, duration: 0.85, stagger: 0.13 });

//         cleanups.push(() => { tl.scrollTrigger?.kill(); tl.kill(); });
//       })();

//       /* 5 — PHILOSOPHY */
//       cleanups.push(buildScrollSection({
//         trigger:  philosophyTitleRef,
//         textRefs: [philosophyLabelRef, philosophyTitleRef, philosophyParaRef],
//         start:    "top 78%",
//       }));
//     });

//     return () => { cancelled = true; cleanups.forEach((fn) => fn()); };
//   }, []);

//   /* map card refs to data for JSX — plain array, no hooks */
//   const cardRefMap = [card1Ref, card2Ref, card3Ref, card4Ref];

//   return (
//     <>
//       <AboutBackground>
//         <Header />

//         {/* ── HERO ─────────────────────────────────────── */}
//         <Section className="min-h-screen flex items-center">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">

//               <div className="md:col-span-12">
//                 <h1
//                   ref={heroTitleRef}
//                   className="text-4xl md:text-5xl lg:text-7xl text-yellow-400 uppercase font-skoda-expanded leading-[0.95]"
//                 >
//                   Where purpose
//                   <br />
//                   takes form.
//                 </h1>
//               </div>

//               <div className="col-span-12">
//                 <div className="grid grid-cols-12 items-start gap-x-0 md:gap-x-8 md:justify-items-end">

//                   <div className="hidden lg:flex col-span-2 md:col-start-6 justify-end pt-2">
//                     <img
//                       ref={heroArrowRef}
//                       src={arrowRight}
//                       alt=""
//                       className="w-15 h-10 object-contain"
//                     />
//                   </div>

//                   <div className="col-span-12 md:col-span-4">
//                     <p ref={heroParaRef} className="leading-relaxed pt-4">
//                       At Best Mountain, every raw material reflects responsibility, performance,
//                       and value. We connect industries with sustainable materials — streamlined
//                       for efficiency and built for lasting reliability.
//                     </p>
//                   </div>

//                 </div>
//               </div>

//             </div>
//           </Container>
//         </Section>

//         {/* ── STORY ────────────────────────────────────── */}
//         <Section className="min-h-screen">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">

//               <div className="md:col-span-5">
//                 <div
//                   ref={storyGridRef}
//                   className="grid grid-cols-2 gap-0 w-full max-w-[450px] aspect-square"
//                 >
//                   <div className="bg-white/10 backdrop-blur-md" />
//                   <div />
//                   <div />
//                   <div className="bg-white/10 backdrop-blur-md" />
//                 </div>
//               </div>

//               <div className="md:col-span-7 md:pl-10">
//                 <span ref={storyLabelRef} className="text-xs uppercase tracking-[0.25em]">
//                   Our Story
//                 </span>

//                 <h2
//                   ref={storyTitleRef}
//                   className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl"
//                 >
//                   Grounded in Origin,
//                   <br />
//                   Guided by Responsibility
//                 </h2>

//                 <p ref={storyParaRef} className="mt-6 leading-relaxed max-w-md">
//                   Our journey began in the world of glass and high-temperature materials.
//                   Through decades of sourcing and supply, we've grown into a trusted partner
//                   for industries seeking balance between production and sustainability.
//                   Each connection we build is rooted in clarity, trust, and long-term value —
//                   the very principles that shaped our foundation.
//                 </p>
//               </div>

//               <div className="md:col-span-12 pt-10">
//                 <p
//                   ref={storyBigRef}
//                   className="text-2xl sm:text-4xl md:text-6xl font-thin leading-tight"
//                 >
//                   Rooted in integrity, refined through time, and guided by responsibility.
//                 </p>
//               </div>

//             </div>
//           </Container>
//         </Section>

//         <Container>
//           <Seperator />
//         </Container>

//         {/* ── STAND FOR ────────────────────────────────── */}
//         <Section>
//           <Container>

//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
//               <div className="md:col-span-3">
//                 <span ref={standLabelRef} className="text-sm uppercase tracking-wider">
//                   what we stand for
//                 </span>
//               </div>

//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2
//                   ref={standTitleRef}
//                   className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400"
//                 >
//                   Performance with Purpose
//                 </h2>

//                 <p ref={standParaRef} className="mt-4">
//                   We streamline material supply to help industries operate smarter,
//                   cleaner, and more consistently. Our focus remains on functionality,
//                   reliability, and measurable impact — because the strength of a system
//                   lies not in its complexity, but in how seamlessly it works.
//                 </p>
//               </div>
//             </div>

//             {/* value cards — checkerboard: cards on odd squares, gaps on even */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full mt-15 md:mt-20">
//               {VALUE_CARDS.map(({ icon, label, col }, i) => (
//                 <ValueCard
//                   key={label}
//                   icon={icon}
//                   label={label}
//                   cardRef={cardRefMap[i]}
//                   style={{ gridColumn: col }}
//                 />
//               ))}
//             </div>

//           </Container>
//         </Section>

//         {/* ── PHILOSOPHY ───────────────────────────────── */}
//         <Section className="min-h-screen">
//           <Container>
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
//               <div className="md:col-span-8 pt-0 md:pt-28">

//                 <span ref={philosophyLabelRef} className="text-xs uppercase tracking-widest">
//                   Our Philosophy
//                 </span>

//                 <h2
//                   ref={philosophyTitleRef}
//                   className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl"
//                 >
//                   Streamlined Systems.
//                   <br />
//                   Sustainable Results.
//                 </h2>

//                 <p ref={philosophyParaRef} className="mt-6 leading-relaxed max-w-md">
//                   Every process we follow — from sourcing to supply is designed
//                   to stay transparent and purposeful. By combining material
//                   expertise with sustainable thinking, we support industries in
//                   creating progress that endures beyond production cycles.
//                 </p>

//               </div>
//             </div>
//           </Container>
//         </Section>

//       </AboutBackground>

//       <CTA />
//     </>
//   );
// }


import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

import Header from "../components/Header";
import CTA from "../components/CTA";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Seperator from "../components/layout/seperator";
import arrowRight         from "../assets/images/arrow-right.png";
import reliabilityIcon    from "../assets/images/reliability.png";
import sustainabilityIcon from "../assets/images/sustainability.png";
import valueIcon          from "../assets/images/value.png";
import continuityIcon     from "../assets/images/continuity.png";

/* ─────────────────────────────────────────────────────────────
   Animation constants
──────────────────────────────────────────────────────────────*/
const EASE     = "expo.out";
const DURATION = 1.4;
const STAGGER  = 0.085;

/** Shared "from" state for every split-text line reveal */
const LINE_FROM = {
  y:               22,
  rotationX:       8,
  opacity:         0,
  filter:          "blur(8px)",
  transformOrigin: "0% 50%",
};

/* ─────────────────────────────────────────────────────────────
   Static data
──────────────────────────────────────────────────────────────*/
const VALUE_CARDS = [
  { icon: reliabilityIcon,    label: "Reliability",    col: 1 },
  { icon: valueIcon,          label: "Value",          col: 3 },
  { icon: sustainabilityIcon, label: "Sustainability", col: 2 },
  { icon: continuityIcon,     label: "Continuity",     col: 4 },
];

/* ─────────────────────────────────────────────────────────────
   buildScrollSection
   Builds a scroll-triggered GSAP timeline for a content block.
   Returns a cleanup function that kills the timeline and reverts
   all SplitText instances.
──────────────────────────────────────────────────────────────*/
function buildScrollSection({ trigger, textRefs, extraRefs = [], start = "top 78%" }) {
  const splits = [];

  const tl = gsap.timeline({
    scrollTrigger: { trigger: trigger.current, start, once: true },
    defaults:      { ease: EASE },
  });

  textRefs.forEach((ref, i) => {
    if (!ref?.current) return;

    const split = SplitText.create(ref.current, {
      type:       "lines",
      linesClass: "overflow-hidden",
    });
    splits.push(split);

    // First ref starts at t=0; every subsequent one overlaps with the previous
    tl.from(split.lines, { ...LINE_FROM, duration: DURATION, stagger: STAGGER }, i === 0 ? 0 : "-=0.75");
  });

  extraRefs.forEach((ref) => {
    if (!ref?.current) return;
    tl.from(ref.current, { y: 30, opacity: 0, duration: 1.1, ease: EASE }, "-=0.9");
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    splits.forEach((s) => s.revert());
  };
}

/* ─────────────────────────────────────────────────────────────
   ValueCard
──────────────────────────────────────────────────────────────*/
function ValueCard({ icon, label, cardRef, style }) {
  return (
    <div
      ref={cardRef}
      style={style}
      className="relative bg-white/10 backdrop-blur-md flex flex-col items-center
        justify-center p-8 max-md:p-4 gap-4 aspect-square group"
    >
      {/* Glassy ring border */}
      <div className="absolute inset-0 ring-1 ring-white/30 blur-[0.5px] opacity-60" />

      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <img src={icon} alt={label} className="w-20 h-20 md:w-32 md:h-32" />
        <span className="text-white text-xl md:text-2xl font-thin">{label}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AboutBackground
──────────────────────────────────────────────────────────────*/
function AboutBackground({ children }) {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/about-bg.webp')" }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   About page
──────────────────────────────────────────────────────────────*/
export default function About() {
  /* ── Hero refs ──────────────────────────────────────────── */
  const heroTitleRef = useRef(null);
  const heroParaRef  = useRef(null);
  const heroArrowRef = useRef(null);

  /* ── Story refs ─────────────────────────────────────────── */
  const storyLabelRef = useRef(null);
  const storyTitleRef = useRef(null);
  const storyParaRef  = useRef(null);
  const storyBigRef   = useRef(null);
  const storyGridRef  = useRef(null);

  /* ── Stand-for refs ─────────────────────────────────────── */
  const standLabelRef = useRef(null);
  const standTitleRef = useRef(null);
  const standParaRef  = useRef(null);

  /* ── Value-card refs (must be declared individually) ─────── */
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  /* ── Philosophy refs ────────────────────────────────────── */
  const philosophyLabelRef = useRef(null);
  const philosophyTitleRef = useRef(null);
  const philosophyParaRef  = useRef(null);

  /* ── Hero timeline (immediate, no scroll trigger) ────────── */
  const buildHeroAnimation = useCallback((cleanups) => {
    const splits = [];
    const tl     = gsap.timeline({ defaults: { ease: EASE } });

    [heroTitleRef, heroParaRef].forEach((ref, i) => {
      if (!ref.current) return;

      const split = SplitText.create(ref.current, {
        type:       "lines",
        linesClass: "overflow-hidden",
      });
      splits.push(split);

      tl.from(split.lines, { ...LINE_FROM, duration: DURATION, stagger: STAGGER }, i === 0 ? 0.2 : "-=0.75");
    });

    if (heroArrowRef.current) {
      tl.from(heroArrowRef.current, { x: -16, opacity: 0, duration: 1, ease: EASE }, "-=0.9");
    }

    cleanups.push(() => { tl.kill(); splits.forEach((s) => s.revert()); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Value-cards cascade (scroll-triggered) ──────────────── */
  const buildCardAnimation = useCallback((cleanups) => {
    const cards = [card1Ref, card2Ref, card3Ref, card4Ref]
      .map((r) => r.current)
      .filter(Boolean);

    if (!cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: cards[0], start: "top 82%", once: true },
      defaults:      { ease: "back.out(1.4)" },
    });

    tl.from(cards, { y: 40, opacity: 0, scale: 0.94, duration: 0.85, stagger: 0.13 });

    cleanups.push(() => { tl.scrollTrigger?.kill(); tl.kill(); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Master effect ───────────────────────────────────────── */
  useEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const cleanups  = [];
    let   cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      buildHeroAnimation(cleanups);

      cleanups.push(
        buildScrollSection({
          trigger:   storyTitleRef,
          textRefs:  [storyLabelRef, storyTitleRef, storyParaRef, storyBigRef],
          extraRefs: [storyGridRef],
          start:     "top 80%",
        }),

        buildScrollSection({
          trigger:  standTitleRef,
          textRefs: [standLabelRef, standTitleRef, standParaRef],
          start:    "top 80%",
        }),
      );

      buildCardAnimation(cleanups);

      cleanups.push(
        buildScrollSection({
          trigger:  philosophyTitleRef,
          textRefs: [philosophyLabelRef, philosophyTitleRef, philosophyParaRef],
          start:    "top 78%",
        }),
      );
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [buildHeroAnimation, buildCardAnimation]);

  // Stable ref-to-index map for VALUE_CARDS rendering (no hooks in render)
  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];

  return (
    <>
      <AboutBackground>
        <Header />

        {/* ── HERO ──────────────────────────────────────────── */}
        <Section className="min-h-screen flex items-center">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">

              <div className="md:col-span-12">
                <h1
                  ref={heroTitleRef}
                  className="text-4xl md:text-5xl lg:text-7xl text-yellow-400 uppercase font-skoda-expanded leading-[0.95]"
                >
                  Where purpose
                  <br />
                  takes form.
                </h1>
              </div>

              <div className="col-span-12">
                <div className="grid grid-cols-12 items-start gap-x-0 md:gap-x-8 md:justify-items-end">

                  <div className="hidden lg:flex col-span-2 md:col-start-6 justify-end pt-2">
                    <img
                      ref={heroArrowRef}
                      src={arrowRight}
                      alt=""
                      className="w-15 h-10 object-contain"
                    />
                  </div>

                  <div className="col-span-12 md:col-span-4">
                    <p ref={heroParaRef} className="leading-relaxed pt-4">
                      At Best Mountain, every raw material reflects responsibility, performance,
                      and value. We connect industries with sustainable materials — streamlined
                      for efficiency and built for lasting reliability.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </Container>
        </Section>

        {/* ── STORY ─────────────────────────────────────────── */}
        <Section className="min-h-screen">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">

              <div className="md:col-span-5">
                <div
                  ref={storyGridRef}
                  className="grid grid-cols-2 gap-0 w-full max-w-[450px] aspect-square"
                >
                  <div className="bg-white/10 backdrop-blur-md" />
                  <div />
                  <div />
                  <div className="bg-white/10 backdrop-blur-md" />
                </div>
              </div>

              <div className="md:col-span-7 md:pl-10">
                <span ref={storyLabelRef} className="text-xs uppercase tracking-[0.25em]">
                  Our Story
                </span>

                <h2
                  ref={storyTitleRef}
                  className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl"
                >
                  Grounded in Origin,
                  <br />
                  Guided by Responsibility
                </h2>

                <p ref={storyParaRef} className="mt-6 leading-relaxed max-w-md">
                  Our journey began in the world of glass and high-temperature materials.
                  Through decades of sourcing and supply, we've grown into a trusted partner
                  for industries seeking balance between production and sustainability.
                  Each connection we build is rooted in clarity, trust, and long-term value —
                  the very principles that shaped our foundation.
                </p>
              </div>

              <div className="md:col-span-12 pt-10">
                <p
                  ref={storyBigRef}
                  className="text-2xl sm:text-4xl md:text-6xl font-thin leading-tight"
                >
                  Rooted in integrity, refined through time, and guided by responsibility.
                </p>
              </div>

            </div>
          </Container>
        </Section>

        <Container>
          <Seperator />
        </Container>

        {/* ── WHAT WE STAND FOR ─────────────────────────────── */}
        <Section>
          <Container>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              <div className="md:col-span-3">
                <span ref={standLabelRef} className="text-sm uppercase tracking-wider">
                  what we stand for
                </span>
              </div>

              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2
                  ref={standTitleRef}
                  className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400"
                >
                  Performance with Purpose
                </h2>

                <p ref={standParaRef} className="mt-4">
                  We streamline material supply to help industries operate smarter,
                  cleaner, and more consistently. Our focus remains on functionality,
                  reliability, and measurable impact — because the strength of a system
                  lies not in its complexity, but in how seamlessly it works.
                </p>
              </div>
            </div>

            {/* Value cards — checkerboard layout: cards on odd columns, gaps on even */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full mt-15 md:mt-20">
              {VALUE_CARDS.map(({ icon, label, col }, i) => (
                <ValueCard
                  key={label}
                  icon={icon}
                  label={label}
                  cardRef={cardRefs[i]}
                  style={{ gridColumn: col }}
                />
              ))}
            </div>

          </Container>
        </Section>

        {/* ── PHILOSOPHY ────────────────────────────────────── */}
        <Section className="min-h-screen">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              <div className="md:col-span-8 pt-0 md:pt-28">

                <span ref={philosophyLabelRef} className="text-xs uppercase tracking-widest">
                  Our Philosophy
                </span>

                <h2
                  ref={philosophyTitleRef}
                  className="mt-5 text-3xl md:text-5xl font-skoda font-semibold text-yellow-400 max-w-xl"
                >
                  Streamlined Systems.
                  <br />
                  Sustainable Results.
                </h2>

                <p ref={philosophyParaRef} className="mt-6 leading-relaxed max-w-md">
                  Every process we follow — from sourcing to supply is designed
                  to stay transparent and purposeful. By combining material
                  expertise with sustainable thinking, we support industries in
                  creating progress that endures beyond production cycles.
                </p>

              </div>
            </div>
          </Container>
        </Section>

      </AboutBackground>

      <CTA />
    </>
  );
}