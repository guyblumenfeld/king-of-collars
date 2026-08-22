// Small stroke icons (24×24) — replace the emoji so the site reads as a real brand.
type IconProps = { className?: string };

function Base({ children, className }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function CollarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="10" r="7" />
      <path d="M10.5 16.7l.6 2.3a1 1 0 001.8 0l.6-2.3" />
      <circle cx="12" cy="20.5" r="1.4" />
      <path d="M6.2 6.5l1.2 1M17.8 6.5l-1.2 1M4.9 10h1.6M17.5 10h1.6" />
    </Base>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 4L4 7l1.8 3.6L8 9.6V20h8V9.6l2.2 1L20 7l-5-3a3 3 0 01-6 0z" />
    </Base>
  );
}

export function BallIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.2 5.8C8.5 8 8.5 16 5.2 18.2M18.8 5.8C15.5 8 15.5 16 18.8 18.2" />
    </Base>
  );
}

export function PawIcon(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="15.5" rx="4" ry="3.2" />
      <circle cx="7" cy="10.5" r="1.7" />
      <circle cx="10.4" cy="7.5" r="1.7" />
      <circle cx="13.6" cy="7.5" r="1.7" />
      <circle cx="17" cy="10.5" r="1.7" />
    </Base>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M1.5 6h13v11h-13zM14.5 10h4l3 3.5V17h-7" />
      <circle cx="5.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </Base>
  );
}

export function ReturnIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 14l-4-4 4-4" />
      <path d="M5 10h9a5 5 0 015 5v0a5 5 0 01-5 5H8" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 2.5V11c0 4.8-3 8.3-7 10-4-1.7-7-5.2-7-10V5.5z" />
      <path d="M9 11.5l2 2 4-4" />
    </Base>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 11.5a1.5 1.5 0 001.5 1.2h7.7a1.5 1.5 0 001.5-1.2L20 8H6" />
    </Base>
  );
}
