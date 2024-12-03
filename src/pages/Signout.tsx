import { useContext, useEffect } from "react";
import UserContext from "../context/user.tsx";

const Signout = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    userCtx?.setToken(null);
    userCtx?.setRole(null);
  }, []);

  return null;
};

export default Signout;
