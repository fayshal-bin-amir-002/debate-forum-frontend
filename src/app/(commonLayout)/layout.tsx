import Container from "@/components/shared/Container";
import NavBar from "@/components/shared/NavBar";

import { ReactNode } from "react";

const CommonLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <NavBar />
      <main className="h-[1000px]">{children}</main>
    </Container>
  );
};

export default CommonLayout;
