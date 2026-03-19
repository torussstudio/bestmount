import arrowPng from "../../assets/images/btn-ico-b.png"

export default function CtaButton({ children, className = "" }) {
  return (
    <button
      type="button"
      className={`
        cursor-pointer 
        group relative inline-flex items-center
        rounded-full
        text-black
        transition-transform duration-300 ease-out
        hover:scale-[1.03]
        ${className}
      `}
    >
      {/* Shadow - spreads on hover */}
      <span
        className="
          pointer-events-none
          absolute inset-0 top-auto
          h-4
          rounded-full
          bg-black/50
          blur-xl
          transition-all duration-300 ease-out
          group-hover:blur-2xl
          group-hover:bg-black/70
          group-hover:h-6
          group-hover:-translate-y-1
        "
      />

      {/* Hover glow bloom (interaction feedback) */}
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

      {/* Static edge glow (rim light) */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          rounded-full
          ring-5 ring-white/80
          blur-[1.5px]
          opacity-80
        "
      />

      {/* Inner highlight (glass sheen) */}
      <span
        className="
          pointer-events-none
          absolute inset-[4px]
          rounded-full
          bg-gradient-to-br
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
            inline-flex items-center
            transition-transform duration-300 ease-out
            group-hover:rotate-45
          "
        >
          <img
            src={arrowPng}
            alt=""
            className="w-5 h-5 flex-shrink-0"
            draggable="false"
          />
        </span>

        {/* Text */}
        <span className="font-normal whitespace-nowrap">
          {children}
        </span>
      </span>
    </button>
  )
}