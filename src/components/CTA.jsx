import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import Container from "./layout/Container";
import Section from "./layout/Section";
import CtaButton from "./layout/CtaButton";

gsap.registerPlugin(SplitText);

/* same animation config */
const LINE_FROM = {
  y: 18,
  rotationX: 6,
  opacity: 0,
  filter: "blur(6px)",
  transformOrigin: "0% 50%",
};

const LINE_EASE  = "expo.out";
const LINE_DURATION = 0.95;
const LINE_STAGGER  = 0.09;

export default function CTA() {
  const labelRef      = useRef(null);
  const titleRef      = useRef(null);
  const paraRef       = useRef(null);
  const btnDesktopRef = useRef(null);
  const btnMobileRef  = useRef(null);

  useEffect(() => {
    let splits    = [];
    let tl        = null;
    let triggered = false; // guard: fire exactly once

    const split = (el) => {
      if (!el) return { lines: [] };
      const s = SplitText.create(el, {
        type: "lines",
        linesClass: "overflow-hidden",
      });
      splits.push(s);
      return s;
    };

    const cleanup = () => {
      // kill timeline FIRST so no in-flight tweens reference reverted nodes
      if (tl) { tl.kill(); tl = null; }
      splits.forEach((s) => s.revert());
      splits = [];
    };

    const animate = () => {
      cleanup(); // reset any previous state cleanly

      const title = split(titleRef.current);
      const para  = split(paraRef.current);

      // collect button targets that actually exist in the DOM
      const btnTargets = [btnDesktopRef.current, btnMobileRef.current].filter(Boolean);

      tl = gsap.timeline({ defaults: { ease: LINE_EASE } });

      tl
        .from(labelRef.current, {
          opacity: 0,
          y: 4,
          duration: 0.55,
          ease: "expo.out",
          clearProps: "opacity,y,filter",
        })

        .from(title.lines, {
          ...LINE_FROM,
          duration: LINE_DURATION,
          stagger: LINE_STAGGER,
          clearProps: "opacity,y,filter,rotationX,transform",
        }, "-=0.3")

        .from(para.lines, {
          ...LINE_FROM,
          duration: LINE_DURATION * 0.9,
          stagger: LINE_STAGGER,
          clearProps: "opacity,y,filter,rotationX,transform",
        }, `-=${LINE_DURATION * 0.55}`)

        // animate all visible buttons together in one tween — avoids null-target stalls
        .fromTo(
          btnTargets,
          { opacity: 0, y: 10, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0,         // simultaneous
            clearProps: "opacity,y,filter",
          },
          `-=${LINE_DURATION * 0.45}`
        );
    };

    // observe the title (always visible when section enters) not the label
    // which can be in a side column and intersect at a different moment
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || triggered) return;
          triggered = true;
          observer.disconnect();
          animate();
        });
      },
      { threshold: 0.25 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, []);

  return (
    <>
      <Section className="bg-[url('/cta-bg.webp')] bg-cover bg-center bg-no-repeat relative pb-0">
        <Container className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-6 md:gap-x-12">
            <div className="md:col-span-3 flex flex-col justify-between items-start h-full">
              <span
                ref={labelRef}
                className="text-[20px] uppercase tracking-wider text-black/80"
              >
                Get in touch
              </span>

              <div ref={btnDesktopRef} className="hidden lg:block">
                <div ref={btnDesktopRef} className="hidden lg:block">
  <CtaButton>Download Full SRM Chart</CtaButton>
</div>
              </div>
            </div>

            <div className="md:col-span-9 md:justify-self-end max-w-[560px] px-2 md:px-0">
              <h2
                ref={titleRef}
                className="text-[30px] sm:text-3xl lg:text-4xl font-skoda font-semibold text-black leading-[1.15] md:leading-tight text-balance md:text-wrap pr-4 md:pr-0"
              >
                Let's Build the Better future together
              </h2>

              <p
                ref={paraRef}
                className="mt-6 md:mt-4 text-[15px] sm:text-base text-black leading-relaxed max-w-[95%] md:max-w-none"
              >
                Looking for sustainable raw materials for your industry? Get in
                touch with us to discuss your requirements or request a custom
                quote.
              </p>

              <div
                ref={btnMobileRef}
                className="block lg:hidden mt-10 md:mt-8 text-left"
              >
               <div
  ref={btnMobileRef}
  className="block lg:hidden mt-10 md:mt-8 text-left"
>
  <CtaButton>Download Full SRM Chart</CtaButton>
</div>
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <div className="flex flex-col-reverse justify-center items-center text-center md:flex-row md:justify-between md:text-left gap-y-3 pb-8 md:pb-6 mt-10 md:mt-4 border-t border-black/10 pt-6">
            <p className="text-[11px] sm:text-xs text-black/70">
              © Best Mountain. All rights reserved.
            </p>
            <p className="text-[11px] sm:text-xs text-black/70">
              Designed by{" "}
              <a
                href="https://toruss.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-black transition-colors"
              >
                Toruss
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}