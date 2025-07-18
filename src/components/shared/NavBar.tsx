import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <nav className="w-full bg-white py-3 flex justify-between items-center">
      <div className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer">
        Debate Forum
      </div>

      <div>
        <Button variant="outline">Login</Button>
      </div>
    </nav>
  );
};

export default NavBar;
