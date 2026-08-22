import { PawIcon } from "./icons";

// Brand logo lockup: paw in a teal circle with a gold champion's crown
// (אלוף = champion). No raster asset exists yet — this SVG lockup IS the logo.
export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 12"
        fill="currentColor"
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 text-amber-400 z-10"
        style={{ width: size * 0.62, top: -size * 0.22 }}
      >
        <path d="M2 11L1 2l5 3.5L12 0l6 5.5L23 2l-1 9z" />
      </svg>
      <span className="w-full h-full rounded-full bg-brand text-white grid place-items-center shadow-sm">
        <PawIcon className="w-[60%] h-[60%]" />
      </span>
    </span>
  );
}
