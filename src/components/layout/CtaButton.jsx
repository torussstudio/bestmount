import downloadPng from "../../assets/images/download.png"

export default function DownButton({ children, className = "" }) {
  return (
    <button
      type="button"
      className="
        group relative inline-flex items-center
        rounded-full
        cursor-pointer
        transition duration-300
        hover:scale-[1.04]
      "
    >

      {/* soft glow */}
      <span
        className="
          absolute inset-0
          rounded-full

          bg-black/35
          blur-xl
          opacity-70

          transition-all duration-300
          group-hover:blur-2xl
          group-hover:opacity-90
        "
      />

      {/* glass */}
      <span
        className="
          relative z-10
          flex items-center gap-3

          rounded-full

          px-7 py-4

          bg-white/[0.18]
          backdrop-blur-xl

          border border-white/[0.35]

          text-[#e6decc]
        "
      >

        <img
          src={downloadPng}
          alt=""
          className="
            w-5 h-5

            transition-transform duration-300
            group-hover:translate-y-[2px]
          "
        />

        <span className="text-base whitespace-nowrap">
          {children}
        </span>

      </span>

    </button>
  )
}