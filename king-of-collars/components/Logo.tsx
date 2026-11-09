// Brand logo: wordmark + dog head (public/logo.png, opaque white background, so use it on white).
export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.png" alt="אלוף הקולרים" className={`${className} w-auto`} />
  );
}
