import downloadPng from "../../assets/images/download.png"

export default function DownButton({ children, className ="" }) {
  return (
    <button
      type="button"
        className={`cursor-pointer 
        group relative inline-flex items-center
        rounded-full
        transition-transform duration-300 ease-out
        hover:scale-[1.03]
        ${className}
      `}
    >
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
          ring-1 ring-white/30
          blur-[1.5px]
          opacity-60
        "
      />

      {/* Inner highlight (glass sheen) */}
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
            inline-flex
            transition-transform duration-300 ease-out
          "
        >
          <img
            src={downloadPng}
            alt=""
            className="w-5 h-5"
            draggable="false"
          />
        </span>

        {/* Text */}
        <span className="whitespace-nowrap">
          {children}
        </span>
      </span>
    </button>
  )
}
