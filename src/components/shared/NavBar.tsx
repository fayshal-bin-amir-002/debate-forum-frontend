import Link from "next/link";
import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <nav className="w-full bg-white py-3 flex justify-between items-center border-b">
      <Link
        href="/"
        className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer"
      >
        Debate Forum
      </Link>

      <div>
        <Link href="/auth">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
