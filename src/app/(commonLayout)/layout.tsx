import { Footer } from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home | Debate Forum",
  description:
    "Explore trending debates, join discussions, and voice your opinion on the Debate Forum homepage.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Debate Forum – Engage in Thoughtful Discussions",
    description:
      "Visit the Debate Forum homepage to explore and participate in meaningful online debates across various topics.",
    url: "https://debate-forum-bay.vercel.app",
    siteName: "Debate Forum",
  },
};

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default CommonLayout;
