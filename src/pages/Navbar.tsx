import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <div className="m-auto flex max-w-screen-xl items-center justify-between gap-5 p-5">
          <Link to="/" title="FortVault Home">
            <NavbarLogo />
          </Link>

          <Link
            to={userCtx?.token ? "/signout" : "/signin"}
            className="rounded-full border border-green-800 px-3 py-1 font-bold text-green-800 hover:bg-green-900 hover:text-white"
          >
            {userCtx?.token ? "Sign Out" : "Sign In"}
          </Link>
        </div>
      </div>

      <div className="p-9 text-white">Navbar</div>
    </>
  );
};

export default Navbar;
