import { useEffect, useState, useRef } from "react";
import { LuChevronDown } from "react-icons/lu";
import Container from "./layout/Container";
import logo from "../assets/images/bm-logo-tm-w.png";
import { Link } from "react-router-dom";
import HashLink from "./HashLink";
import { memo } from "react";

const Dropdown = memo(({ open }) => (
  <div
    className={`
      absolute top-[calc(100%+15px)] right-0 min-w-[220px] z-50
      bg-black/20 backdrop-blur-md rounded-4xl
      transition-all duration-500 ease-out
      ${open
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-4 pointer-events-none"}
    `}
  >
    <div className="max-w-[500px] mx-auto px-5 md:px-6 py-8 md:py-10 text-white">
      <ul className="space-y-6 text-sm md:text-lg">
        <li><Link className="hover:text-yellow-400 transition" to="/">Home</Link></li>
        <li><Link className="hover:text-yellow-400 transition" to="/about">About</Link></li>
        <li>
          <HashLink className="hover:text-yellow-400 transition" to="/#materials" offset={100}>
            Materials
          </HashLink>
        </li>
        <li><Link className="hover:text-yellow-400 transition" to="/contact">Contact</Link></li>
      </ul>
    </div>
  </div>
));

const Hamburger = memo(({ open }) => (
  <div className="flex items-center gap-1">
    <div className="flex flex-col gap-[6px]">
      <span className="block w-6 h-[2px] bg-white" />
      <span className="block w-6 h-[2px] bg-white" />
      <span className="block w-6 h-[2px] bg-white" />
    </div>
    <LuChevronDown
      className={`
        text-white text-xl
        transition-transform duration-500 ease-out
        ${open ? "rotate-180" : "rotate-0"}
      `}
    />
  </div>
));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!open) return;
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // header background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-6 left-0 w-full z-50">
      <Container>
        <div className="relative" ref={wrapRef}>
          <div
            className={[
              "relative",
              "transition-all duration-300 ease-out",
              scrolled ? "rounded-4xl bg-black/20 backdrop-blur-md ring-0 ring-white/10" : "bg-transparent",
            ].join(" ")}
          >
            <div className="relative flex items-center justify-between py-3 md:py-5 px-4 md:px-8">
              <div className="text-white font-bold tracking-wide">
                <Link to="/"><img className="max-w-[150px] md:max-w-[250px]" src={logo} alt="Best Mountain" /></Link>
              </div>

              <button
                type="button"
                aria-expanded={open}
                aria-label="Toggle menu"
                onClick={() => setOpen(prev => !prev)}
                className="cursor-pointer"
              >
                <Hamburger open={open} />
              </button>
            </div>
          </div>

          <Dropdown open={open} />
        </div>
      </Container>
    </header>
  );
}