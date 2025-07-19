import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Debate Forum",
  description:
    "A platform to join and create online debates, express opinions, and vote on arguments.",
  metadataBase: new URL("https://debate-forum-bay.vercel.app"),
  openGraph: {
    title: "Debate Forum",
    description:
      "Join online debates, express your thoughts, and see what others think.",
    url: "https://debate-forum-bay.vercel.app",
    siteName: "Debate Forum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debate Forum",
    description: "Participate in online debates and share your views.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
