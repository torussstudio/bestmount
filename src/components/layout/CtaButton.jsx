// import downloadPng from "../../assets/images/download.png"

// export default function DownButton({ children, className = "" }) {
//   return (
//     <button
//       type="button"
//       className="
//         group relative inline-flex items-center
//         rounded-full
//         cursor-pointer
//         transition duration-300
//         hover:scale-[1.04]
//       "
//     >

//       {/* soft glow */}
//       <span
//         className="
//           absolute inset-0
//           rounded-full

//           bg-black/35
//           blur-xl
//           opacity-70

//           transition-all duration-300
//           group-hover:blur-2xl
//           group-hover:opacity-90
//         "
//       />

//       {/* glass */}
//       <span
//         className="
//           relative z-10
//           flex items-center gap-3

//           rounded-full

//           px-7 py-4

//           bg-white/[0.18]
//           backdrop-blur-xl

//           border border-white/[0.35]

//           text-[#e6decc]
//         "
//       >

//         <img
//           src={downloadPng}
//           alt=""
//           className="
//             w-5 h-5

//             transition-transform duration-300
//             group-hover:translate-y-[2px]
//           "
//         />

//         <span className="text-base whitespace-nowrap">
//           {children}
//         </span>

//       </span>

//     </button>
//   )
// }

import downloadPng from "../../assets/images/download.png"

export default function DownButton({
  children,
  className = "",
  href = "/BM-SRM-Chart-2026.pdf",
}) {
  return (
    <a
      href={href}
      download
      target="_blank"
      className={`
        group relative inline-flex items-center justify-center
        rounded-full
        transition-all duration-300
        hover:scale-[1.02]
        ${className}
      `}
    >
      {/* glow */}
      <span
        className="
          absolute inset-0
          rounded-full
          bg-black/30
          blur-xl
          opacity-60
          transition-all duration-300
          group-hover:opacity-80
        "
      />

      {/* glass layer */}
     <span
  className="
    relative z-10
    inline-flex items-center justify-center gap-4

    rounded-full

    px-10 py-5

    bg-white/[0.14]
    backdrop-blur-xl

    border border-white/[0.28]

    text-[#e8dfcb]

    shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
  "
>
  {/* icon */}
  <span className="flex items-center justify-center shrink-0">
    <img
      src={downloadPng}
      alt=""
      className="
        w-6 h-6
        object-contain
        transition-transform duration-300
        group-hover:translate-y-[1px]
      "
    />
  </span>

  {/* text */}
  <span
    className="
      text-[20px]
      leading-none
      tracking-[-0.02em]
      font-medium
      whitespace-nowrap
      pt-[1px]
    "
  >
    {children}
  </span>
</span>
    </a>
  )
}