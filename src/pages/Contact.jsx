import Header from "../components/Header";
import Container from "../components/layout/Container";
import PrimaryButton from "../components/layout/PrimaryButton";
import Section from "../components/layout/Section";
import Seperator from "../components/layout/seperator";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ContactBackground = ({ children }) => (
  <div
    className="relative"
    style={{
      backgroundImage: "url('/connect-bg.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "scroll",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/0 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

const LINE_FROM = {
  y: 18,
  rotationX: 6,
  opacity: 0,
  filter: "blur(6px)",
  transformOrigin: "0% 50%",
};

const LINE_EASE = "expo.out";
const LINE_DURATION = 0.95;
const LINE_STAGGER = 0.09;

function animateSection(buildFn) {
  const splits = [];

  const splitText = (el, options) => {
    if (!el) return { lines: [] };
    const s = SplitText.create(el, {
      linesClass: "overflow-hidden",
      ...options,
    });
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

export default function Contact() {
  const heroTitleRef    = useRef(null);
  const heroPara1Ref    = useRef(null);
  const heroPara2Ref    = useRef(null);
  const heroBtnRef      = useRef(null);

  const connectLabelRef = useRef(null);
  const connectTitleRef = useRef(null);
  const connectPara1Ref = useRef(null);
  const connectPara2Ref = useRef(null);
  const connectBigRef   = useRef(null);

  const contactLabelRef = useRef(null);
  const contactTitleRef = useRef(null);
  const formTitleRef    = useRef(null);

  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_6we0wnn",
        "template_7ofno2k",
        {
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
        },
        "0NPwzq3JhrllHrIW_"
      );
      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      const sections = [
        {
          trigger: heroTitleRef,
          animate: ({ tl, splitText }) => {
            const title = splitText(heroTitleRef.current, { type: "lines" });
            const p1    = splitText(heroPara1Ref.current, { type: "lines" });
            const p2    = splitText(heroPara2Ref.current, { type: "lines" });

            tl
              .from(title.lines, { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER })
              .from(p1.lines,    { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.6")
              .from(p2.lines,    { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.6")
              .fromTo(
                heroBtnRef.current,
                { opacity: 0, y: 10, filter: "blur(4px)" },
                { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.6 },
                "-=0.5"
              );
          },
        },
        {
          trigger: connectTitleRef,
          animate: ({ tl, splitText }) => {
            const title = splitText(connectTitleRef.current, { type: "lines" });
            const p1    = splitText(connectPara1Ref.current, { type: "lines" });
            const p2    = splitText(connectPara2Ref.current, { type: "lines" });
            const big   = splitText(connectBigRef.current,   { type: "lines" });

            tl
              .from(connectLabelRef.current, { opacity: 0, y: 8, filter: "blur(4px)", duration: 0.9 })
              .from(title.lines, { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.3")
              .from(p1.lines,    { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.6")
              .from(p2.lines,    { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.6")
              .from(big.lines,   { ...LINE_FROM, y: 22, duration: LINE_DURATION * 1.05, stagger: 0.12 }, "+=0.1");
          },
        },
        {
          trigger: contactTitleRef,
          animate: ({ tl, splitText }) => {
            const title     = splitText(contactTitleRef.current, { type: "lines" });
            const formTitle = splitText(formTitleRef.current,    { type: "lines" });

            tl
              .from(contactLabelRef.current, { opacity: 0, y: 8, filter: "blur(4px)", duration: 0.9 })
              .from(title.lines,     { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.3")
              .from(formTitle.lines, { ...LINE_FROM, duration: LINE_DURATION, stagger: LINE_STAGGER }, "-=0.3");
          },
        },
      ];

      const heroCleanup = animateSection(sections[0].animate);

      const cleanups  = new Map();
      const triggered = new Set();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const section = sections.find((s) => s.trigger.current === entry.target);
            if (!section || triggered.has(entry.target)) return;
            triggered.add(entry.target);
            cleanups.get(entry.target)?.();
            cleanups.set(entry.target, animateSection(section.animate));
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      sections.slice(1).forEach(({ trigger }) => {
        if (trigger.current) observer.observe(trigger.current);
      });

      cancelled = () => {
        observer.disconnect();
        heroCleanup();
        cleanups.forEach((cleanup) => cleanup());
      };
    });

    return () => {
      if (typeof cancelled === "function") cancelled();
      else cancelled = true;
    };
  }, []);

  return (
    <>
      <ContactBackground>
        <Header />
        <Section className="min-h-screen flex items-center">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10">
              <div className="md:col-span-12">
                <h1
                  ref={heroTitleRef}
                  className="text-5xl md:text-7xl font-skoda-expanded text-yellow-400 text-center font-thin leading-[0.95]"
                >
                  Forging <br /> Better Bonds
                  <sup className="contact-reg">&trade;</sup>
                </h1>
                <p
                  ref={heroPara1Ref}
                  className="text-3xl md:text-4xl mt-10 text-center text-white font-thin"
                >
                  We believe progress is built together.
                </p>
                <p
                  ref={heroPara2Ref}
                  className="max-w-xl mt-6 text-center sm:text-center sm:ml-16 leading-tight"
                >
                  Reach out to explore sustainable raw materials, partnerships,
                  or collaborations that add real value.
                </p>
                <div ref={heroBtnRef} className="text-center mt-10">
                  <PrimaryButton scrollTo="contact-form" offset={100}>
                    Get in Touch
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Container>
          <Seperator />
        </Container>

        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              <div className="md:col-span-3">
                <span
                  ref={connectLabelRef}
                  className="text-sm uppercase tracking-wider text-white"
                >
                  Let's Connect
                </span>
              </div>

              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2
                  ref={connectTitleRef}
                  className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400"
                >
                  Let's Work Together to Drive Positive Change
                </h2>
                <p ref={connectPara1Ref} className="mt-4">
                  Reach out to discover how our sustainable raw materials can
                  strengthen your processes and support your goals.
                </p>
                <p ref={connectPara2Ref} className="mt-4">
                  At Best Mountain, every partnership begins with trust,
                  clarity, and shared purpose — because great outcomes start
                  with the right connections.
                </p>
              </div>
              <div className="md:col-span-12 pt-10">
                <p
                  ref={connectBigRef}
                  className="text-2xl sm:text-4xl md:text-6xl font-thin leading-tight"
                >
                  Transparent in process. Genuine in connection. Continuous in
                  purpose.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Container>
          <Seperator />
        </Container>

        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12">
              <div className="md:col-span-3">
                <span
                  ref={contactLabelRef}
                  className="text-sm uppercase tracking-wider text-white"
                >
                  Contact us
                </span>
              </div>

              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2
                  ref={contactTitleRef}
                  className="text-3xl md:text-4xl font-skoda font-normal text-yellow-400"
                >
                  Let's Start a Conversation
                </h2>
                <div className="mt-15">
                  <p className="uppercase font-3xl">email</p>
                  <a href="mailto:materials@bm-materials.com">
                    <p className="font-2xl hover:text-yellow-400 transition">
                      materials@bm-materials.com
                    </p>
                  </a>
                  <div className="mt-8"></div>
                  <p className="uppercase font-3xl">call</p>
                  <a href="tel:+85228367022">
                    <p className="hover:text-yellow-400 transition font-2xl">
                      +852 2836 7022
                    </p>
                  </a>
                  <div className="mt-8"></div>
                  <p className="uppercase font-3xl">address</p>
                  <a
                    href="https://maps.app.goo.gl/EhwF6ozjPwb8xKbE6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="hover:text-yellow-400 transition font-2xl capitalize">
                      Unit C, 5F, Kee Shing Centre, No 74-76 Kimberley Road Tsim
                      Sha Tsui, Kowloon, Hong Kong S.A.R.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </Container>

          <Container className="mt-20">
            <div className="flex justify-center" id="contact-form">
              <div className="w-full max-w-6xl p-2 pt-6 pb-6 md:p-12 bg-white/5 backdrop-blur-md border border-white/0 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.6)]">
                <h2
                  ref={formTitleRef}
                  className="text-center text-3xl md:text-4xl font-skoda font-normal"
                >
                  Get in touch with us today.
                </h2>

                <form onSubmit={handleSubmit} className="mt-10 space-y-6 max-w-2xl mx-auto">
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company / Organization"
                      className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <textarea
                      rows="4"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Message"
                      required
                      className="w-full bg-transparent border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-[#eee8cd] transition"
                    />
                  </div>

                  {status === "success" && (
                    <p className="text-center text-green-400 text-sm">
                      ✓ Message sent! We'll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-center text-red-400 text-sm">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="cursor-pointer group inline-flex items-center gap-3 rounded-full border border-white/0 bg-white/10 backdrop-blur-lg px-8 py-3 text-white transition hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="inline-flex text-white transition-transform duration-300 ease-out group-hover:rotate-45">
                        <FiArrowUpRight className="w-5 h-5 flex-shrink-0" />
                      </span>
                      <span className="font-normal">
                        {status === "sending" ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </ContactBackground>
    </>
  );
}