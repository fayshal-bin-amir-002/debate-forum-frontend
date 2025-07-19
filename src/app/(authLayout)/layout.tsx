import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Debate Forum",
  description:
    "Login or register to join the Debate Forum and participate in discussions.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Login or Register | Debate Forum",
    description:
      "Access your account or sign up to join debates and share your voice.",
    url: "https://debate-forum-bay.vercel.app/auth",
    siteName: "Debate Forum",
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;
