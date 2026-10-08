import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ic-orbite.club"),
  title: "IC ORBITE — A Student Coding Club | Interested. Code Orbit",
  description:
    "Official website of IC ORBITE. An immersive student coding community where curious minds learn, build, and grow together. Ideas in orbit ∞ A brighter tomorrow.",
  keywords: [
    "IC ORBITE",
    "Interested Code Orbit",
    "Student Coding Club",
    "Developer Community",
    "Hackathons",
    "Tech Workshops",
    "Learn Build Grow",
    "Creative Tech",
  ],
  icons: {
    icon: "/images/ic-orbite-logo.png",
    apple: "/images/ic-orbite-logo.png",
  },
  openGraph: {
    title: "IC ORBITE — A Student Coding Club",
    description:
      "Turning curiosity into capability. Learn • Build • Grow • Together.",
    url: "https://ic-orbite.club",
    siteName: "IC ORBITE",
    images: [
      {
        url: "/images/ic-orbite-logo.png",
        width: 1254,
        height: 1254,
        alt: "IC ORBITE Official Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05060A] text-[#EDE9FE] selection:bg-violet-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
