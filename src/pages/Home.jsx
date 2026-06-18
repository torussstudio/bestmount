
import { memo, useEffect, useRef } from "react";
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

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */

const EASES = {
  title: "power4.out",
  para: "expo.out",
  big: "circ.out",
  ui: "expo.out",
};

/** Shared "from" state for masked-line reveals */
const LINE_FROM = {
  autoAlpha: 0,
  y: 20,
  rotationX: 8,
  filter: "blur(5px)",
  transformOrigin: "0% 50%",
  transformPerspective: 600,
};

/* ─────────────────────────────────────────────
   Module-level singletons (no per-render cost)
───────────────────────────────────────────── */

/** Registers GSAP plugins once at module load — avoids repeated calls inside effects */
gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Injects `.split-line` mask CSS exactly once into <head>.
 * Using a module-scoped flag instead of a closure keeps the
 * pattern explicit and avoids an IIFE.
 */
let maskStyleInjected = false;
function injectMaskStyle() {
  if (maskStyleInjected) return;
  maskStyleInjected = true;
  const style = document.createElement("style");
  style.textContent = ".split-line { overflow: hidden; display: block; }";
  document.head.appendChild(style);
}

/**
 * Resolves when all document fonts are ready.
 * Falls back to an already-resolved promise when the Fonts API is unavailable.
 */
const fontsReady = () => document.fonts?.ready ?? Promise.resolve();

/* ─────────────────────────────────────────────
   Animation builders
───────────────────────────────────────────── */

/**
 * Builds and returns the hero section timeline + cleanup.
 * The timeline is created paused; callers decide when to play.
 */
function buildHeroTimeline({ heroTitleRef, heroParaRef, buttonRef }) {
  injectMaskStyle();

  const titleSplit = SplitText.create(heroTitleRef.current, {
    type: "lines",
    linesClass: "split-line",
  });

  const paraSplit = SplitText.create(heroParaRef.current, {
    type: "lines",
    linesClass: "split-line",
  });

  const allTargets = [titleSplit.lines, paraSplit.lines, buttonRef.current];
  gsap.set(allTargets, { willChange: "transform, opacity, filter" });

  const tl = gsap
    .timeline({ paused: true })

    .from(titleSplit.lines, {
      ...LINE_FROM,
      ease: EASES.title,
      duration: 1.05,
      stagger: 0.085,
      delay: 0.05,
    })

    .from(
      paraSplit.lines,
      {
        ...LINE_FROM,
        y: 16,
        rotationX: 5,
        filter: "blur(4px)",
        ease: EASES.para,
        duration: 0.9,
        stagger: 0.07,
      },
      "-=0.55"
    )

    .fromTo(
      buttonRef.current,
      { autoAlpha: 0, y: 14, scale: 0.95, filter: "blur(5px)" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", ease: EASES.ui, duration: 0.7 },
      "-=0.42"
    )

    // Release GPU hint after animation completes
    .call(() => gsap.set(allTargets, { willChange: "auto" }));

  return {
    tl,
    cleanup: () => {
      tl.kill();
      titleSplit.revert();
      paraSplit.revert();
    },
  };
}

/**
 * Builds and returns the about section timeline + cleanup.
 * The timeline is created paused; a ScrollTrigger plays it on enter.
 */
function buildAboutTimeline({ aboutLabelRef, aboutTitleRef, aboutParaRef, bigTextRef }) {
  injectMaskStyle();

  const titleSplit = SplitText.create(aboutTitleRef.current, {
    type: "lines",
    linesClass: "split-line",
  });

  const paraSplit = SplitText.create(aboutParaRef.current, {
    type: "lines",
    linesClass: "split-line",
  });

  const bigSplit = SplitText.create(bigTextRef.current, {
    type: "lines,words",
    linesClass: "split-line",
  });

  const allTargets = [aboutLabelRef.current, titleSplit.lines, paraSplit.lines, bigSplit.words];
  gsap.set(allTargets, { willChange: "transform, opacity, filter" });

  const tl = gsap
    .timeline({ paused: true })

    .fromTo(
      aboutLabelRef.current,
      { autoAlpha: 0, x: -10, filter: "blur(3px)" },
      { autoAlpha: 1, x: 0, filter: "blur(0px)", ease: EASES.ui, duration: 0.85 }
    )

    .from(
      titleSplit.lines,
      {
        ...LINE_FROM,
        ease: EASES.title,
        duration: 0.95,
        stagger: 0.085,
      },
      "-=0.38"
    )

    .from(
      paraSplit.lines,
      {
        ...LINE_FROM,
        y: 15,
        filter: "blur(3px)",
        ease: EASES.para,
        duration: 0.88,
        stagger: 0.068,
      },
      "-=0.5"
    )

    .from(
      bigSplit.words,
      {
        autoAlpha: 0,
        y: 30,
        rotationX: 12,
        filter: "blur(7px)",
        transformOrigin: "0% 50%",
        transformPerspective: 900,
        ease: EASES.big,
        duration: 1.15,
        stagger: { each: 0.034, from: "start" },
      },
      "+=0.12"
    )

    // Release GPU hint after animation completes
    .call(() => gsap.set(allTargets, { willChange: "auto" }));

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

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/**
 * Full-viewport background with an overlay, rendered only once.
 * Children are placed above the overlay via z-index.
 */
const HomeBackground = memo(({ children }) => (
  <div className="relative min-h-screen">
    <div className="absolute inset-0 bg-[url('/home-bg.webp')] bg-cover bg-no-repeat bg-[position:70%_20%]" />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10">{children}</div>
  </div>
));
HomeBackground.displayName = "HomeBackground";

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

export default function Home() {
  // Hero section refs
  const heroTitleRef = useRef(null);
  const heroParaRef = useRef(null);
  const buttonRef = useRef(null);

  // About section refs
  const aboutLabelRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutParaRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    let ctx;

    // Defer all GSAP work until fonts are ready to prevent SplitText mis-measures
    fontsReady().then(() => {
      ctx = gsap.context(() => {
        const hero = buildHeroTimeline({ heroTitleRef, heroParaRef, buttonRef });
        const about = buildAboutTimeline({ aboutLabelRef, aboutTitleRef, aboutParaRef, bigTextRef });

        // Hero plays immediately on mount
        hero.tl.play();

        // About plays once when its trigger enters the viewport
        const trigger = ScrollTrigger.create({
          trigger: aboutTitleRef.current,
          start: "top 78%",
          once: true,
          onEnter: () => about.tl.play(),
        });

        // Return cleanup so gsap.context().revert() handles teardown
        return () => {
          hero.cleanup();
          about.cleanup();
          trigger.kill();
        };
      });
    });

    return () => ctx?.revert();
  }, []); // Empty deps — runs once on mount, cleans up on unmount

  return (
    <>
      <HomeBackground>
        <Header />

        {/* ── HERO ─────────────────────────────────────── */}
        <Section className="min-h-[85svh] md:min-h-screen flex items-center pt-24 pb-16 md:py-0 relative overflow-hidden">
          <Container>
            <div className="flex flex-col items-start justify-center w-full max-w-full">
              <h1
                ref={heroTitleRef}
                className="text-[22px] min-[360px]:text-[26px] min-[400px]:text-3xl sm:text-4xl md:text-6xl leading-[1.1] md:leading-[1.15] font-skoda-expanded text-yellow-400 w-full whitespace-normal break-words pr-2"
              >
                testing
                Sustainable Raw Materials, Perfectly Streamlined
                <sup className="hero-reg">&trade;</sup>.
              </h1>

              <p
                ref={heroParaRef}
                className="mt-5 md:mt-6 text-[15px] sm:text-base md:text-lg max-w-2xl leading-relaxed"
              >
                Discover sustainable raw materials that integrate functionality,
                value, and responsibility—shaping the present and advancing the
                future.
              </p>

              <HashLink
                ref={buttonRef}
                to="/#materials"
                offset={100}
                className="mt-8 md:mt-10 inline-block"
              >
                <PrimaryButton>Explore Our Materials</PrimaryButton>
              </HashLink>
            </div>
          </Container>
        </Section>

        <Container>
          <Seperator />
        </Container>

        <Materials />

        {/* ── ABOUT ────────────────────────────────────── */}
        <Section className="min-h-[75vh]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              <div className="md:col-span-3">
                <span
                  ref={aboutLabelRef}
                  className="text-[20px] uppercase tracking-wider"
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