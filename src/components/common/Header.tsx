import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../context/user.tsx";
import { readTools } from "../../api/api.ts";

const Header = () => {
  const userCtx = useContext(UserContext);

  const {
    data: tools = [],
    isPending,
    isError,
  } = useQuery({ queryKey: ["tools"], queryFn: readTools });

  return (
    <div className="flex flex-wrap items-center justify-center gap-5 text-left text-xl font-bold sm:text-2xl">
      <NavLink
        to="/readtools"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        Items
      </NavLink>
      {userCtx?.role === "manager" && (
        <NavLink
          to="/getworkers"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Workers
        </NavLink>
      )}
      {userCtx?.role === "manager" && (
        <span
          className={
            !isPending &&
            !isError &&
            tools.filter((tool: { approved: boolean }) => !tool.approved)
              .length > 0
              ? "text-red-600"
              : ""
          }
        >
          <NavLink
            to="/getnotifications"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Notifications (
            {!isPending &&
              !isError &&
              tools.filter((tool: { approved: boolean }) => !tool.approved)
                .length}
            )
          </NavLink>
        </span>
      )}
    </div>
  );
};

export default Header;
