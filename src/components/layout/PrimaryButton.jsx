import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function PrimaryButton({
  children,
  to,
  href,
  scrollTo,
  offset = 0,
  onClick,
  type = "button",
  className = "",
}) {
  const baseClasses = `
    cursor-pointer 
    group relative inline-flex items-center
    rounded-full
    transition-transform duration-300 ease-out
    hover:scale-[1.03]
    ${className}
  `;

  const handleScroll = () => {
    const el = document.getElementById(scrollTo);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const Content = (
    <>
      {/* Hover glow bloom */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          rounded-full
          bg-white/30
          blur-2xl
          opacity-0
          transition-opacity duration-300 ease-out
          group-hover:opacity-40
        "
      />

      {/* Static edge glow */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          rounded-full
          ring-1 ring-white/30
          blur-[1.5px]
          opacity-60
        "
      />

      {/* Inner highlight */}
      <span
        className="
          pointer-events-none
          absolute inset-[1px]
          rounded-full
          bg-linear-to-br
          from-white/25
          via-white/5
          to-transparent
        "
      />

      {/* Button body */}
      <span
        className="
          relative z-10 flex items-center gap-3
          rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/10
          px-8 py-4
        "
      >
        {/* Arrow */}
        <span
          className="
            inline-flex text-white
            transition-transform duration-300 ease-out
            group-hover:rotate-45
          "
        >
          <FiArrowUpRight className="w-5 h-5 flex-shrink-0" />
        </span>

        {/* Text */}
        <span className="whitespace-nowrap">
          {children}
        </span>
      </span>
    </>
  );

  // 1. Smooth scroll
  if (scrollTo) {
    return (
      <button
        type={type}
        onClick={handleScroll}
        className={baseClasses}
      >
        {Content}
      </button>
    );
  }

  // 2. Internal route
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {Content}
      </Link>
    );
  }

  // 3. External link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {Content}
      </a>
    );
  }

  // 4. Normal button
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
    >
      {Content}
    </button>
  );
}
