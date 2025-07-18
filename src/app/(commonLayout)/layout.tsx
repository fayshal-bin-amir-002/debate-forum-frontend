import { Footer } from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

import { ReactNode } from "react";

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
