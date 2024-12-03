import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import UserContext from "../context/user.tsx";
import { readTools } from "../api/api.ts";

const ReadTools = () => {
  const userCtx = useContext(UserContext);

  const {
    data: tools = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["tools"], queryFn: readTools });

  return (
    <div className="m-auto max-w-md">
      <div className="flex items-center justify-center gap-5 text-left text-2xl font-bold sm:text-3xl">
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
      </div>

      {userCtx?.role === "manager" && (
        <Link
          to={"/createtool"}
          className="my-5 flex items-center justify-end gap-1 text-3xl text-green-800 hover:cursor-pointer hover:text-green-900"
        >
          <IoIosAddCircle />
          <div className="text-xl font-bold">Add Item</div>
        </Link>
      )}

      {isPending && <div>Loading data in progress...</div>}

      {isError && <div>Error: {error.message}</div>}

      {!isPending && !isError && tools.length === 0 && <div>No items yet</div>}

      {!isPending &&
        !isError &&
        tools.map(
          (tool: {
            _id: string;
            name: string;
            description: string;
            brand: string;
            image: string;
            worker: string;
          }) => (
            <div key={tool._id} className="m-5 border p-5">
              <img
                className="aspect-video object-cover"
                src={
                  "https://res.cloudinary.com/" +
                  import.meta.env.VITE_CLOUDNAME +
                  "/image/upload/" +
                  tool.image
                }
                alt={tool.image}
              />
              <div>Name: {tool.name}</div>
              <div>Description: {tool.description}</div>
              <div>Brand: {tool.brand}</div>
              <div>Status: {tool.worker && "not "}available for loan</div>
              {userCtx?.role === "manager" && (
                <>
                  <Link
                    className="m-1 border p-1"
                    to={"/updatetool/" + tool._id}
                  >
                    Update
                  </Link>
                  <Link
                    className="m-1 border p-1"
                    to={"/deletetool/" + tool._id}
                  >
                    Delete
                  </Link>
                </>
              )}
              {userCtx?.role === "worker" && (
                <>
                  {tool.worker ? (
                    <Link
                      className="m-1 border p-1"
                      to={"/removetool/" + tool._id}
                    >
                      Return
                    </Link>
                  ) : (
                    <Link
                      className="m-1 border p-1"
                      to={"/addtool/" + tool._id}
                    >
                      Borrow
                    </Link>
                  )}
                </>
              )}
            </div>
          ),
        )}
    </div>
  );
};

export default ReadTools;
