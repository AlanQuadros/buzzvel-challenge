import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Luma — Build skills that move you forward",
  description:
    "Practical courses taught by people who do the work. Learn design, technology, business and more — one focused lesson at a time.",
  applicationName: "Luma Learning",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Luma — Build skills that move you forward",
    description:
      "Practical learning for curious people. Start with one course. Build from there.",
    type: "website",
    locale: "en_US",
  },
};
export const viewport: Viewport = {
  themeColor: "#F9F8F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
