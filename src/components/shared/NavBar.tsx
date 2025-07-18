import { IUserProps } from "@/types/user";
import { Header } from "../ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="w-full h-14">
      <Header session={session} />
    </nav>
  );
};

export default NavBar;
