import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import NavbarLogo from "../components/navbar/NavbarLogo";
import UserContext from "../context/user.tsx";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY && currentScrollY > 200) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <>
      <div
        className={`fixed z-10 w-full border-b bg-neutral-100 duration-500 ${showNavbar ? "top-0" : "top-[-100px]"}`}
      >
        <div className="m-auto flex max-w-screen-xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" title="FortVault Home">
            <NavbarLogo />
          </Link>

          <Link
            to={userCtx?.token ? "/signout" : "/signin"}
            className="px-3 py-1 font-bold text-green-800 hover:rounded hover:bg-green-900 hover:text-white"
          >
            {userCtx?.token ? (
              <div className="flex items-center justify-center gap-1">
                <HiOutlineLogout size={30} />
                <div className="text-sm sm:text-base">Sign Out</div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <HiOutlineLogin size={30} />
                <div className="text-sm sm:text-base">Sign In</div>
              </div>
            )}
          </Link>
        </div>
      </div>

      <div className="p-6 text-white">Navbar</div>
    </>
  );
};

export default Navbar;
