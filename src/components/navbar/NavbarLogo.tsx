import { FaTools } from "react-icons/fa";

const NavbarLogo = () => {
  return (
    <div className="flex items-center justify-between gap-2 text-xl text-green-800 hover:cursor-pointer hover:text-green-900 sm:text-2xl">
      <FaTools />
      <div className="font-black">FortVault</div>
    </div>
  );
};

export default NavbarLogo;
