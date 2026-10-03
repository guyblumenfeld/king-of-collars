import type { Metadata } from "next";
import Script from "next/script";
import { Heebo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityWidget from "@/components/AccessibilityWidget";

// Self-hosted at build time (no render-blocking request to fonts.googleapis.com).
// `display: swap` shows text immediately with a fallback, then swaps in Heebo.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
});

const TITLE = "אלוף הקולרים - אביזרים איכותיים לכלבים";
const DESCRIPTION = "רצועות, קולרים, ביגוד ומשחקים לכלבים. משלוח מהיר עד הבית.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kingofcollars.com"),
  title: TITLE,
  description: DESCRIPTION,
  verification: {
    google: "mQy7dQ0dzY-TPzuu4Doht-E2FV7De6q6Qn9WAbW91Oo",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "אלוף הקולרים",
    locale: "he_IL",
    type: "website",
    images: ["/og-logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PNF2YEZ9DV"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PNF2YEZ9DV');
          `}
        </Script>
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        {/* keyboard skip-link for screen-reader / keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          דלגו לתוכן הראשי
        </a>
        <CartProvider>
          {/* #site-wrap scopes the a11y visual filters (see globals.css) */}
          <div id="site-wrap" className="flex-1 flex flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <WhatsAppButton />
          <AccessibilityWidget />
        </CartProvider>
      </body>
    </html>
  );
}
