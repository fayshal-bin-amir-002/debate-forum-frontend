import { Header } from "../ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Container from "./Container";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Container>
      <nav className="w-full h-14">
        <Header session={session} />
      </nav>
    </Container>
  );
};

export default NavBar;
