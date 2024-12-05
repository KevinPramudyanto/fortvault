import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import Header from "../components/common/Header";
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
      <Header />

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
            id: string;
            name: string;
            description: string;
            brand: string;
            image: string;
            worker: string;
            approved: boolean;
          }) => (
            <div key={tool.id} className="m-5 border p-5">
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
              <div>
                Available to borrow:{" "}
                {tool.approved && !tool.worker ? "Yes" : "No"}
              </div>
              <div>
                Pending manager approval: {tool.approved ? "No" : "Yes"}
              </div>
              {userCtx?.role === "manager" && tool.approved && !tool.worker && (
                <>
                  <Link
                    className="m-1 border p-1"
                    to={"/updatetool/" + tool.id}
                  >
                    Update
                  </Link>
                  <Link
                    className="m-1 border p-1"
                    to={"/deletetool/" + tool.id}
                  >
                    Delete
                  </Link>
                </>
              )}
              {userCtx?.role === "manager" && !tool.approved && (
                <>
                  <Link
                    className="m-1 border p-1"
                    to={"/approvetool/" + tool.id}
                  >
                    Approve
                  </Link>
                  <Link
                    className="m-1 border p-1"
                    to={"/rejecttool/" + tool.id}
                  >
                    Reject
                  </Link>
                </>
              )}
              {userCtx?.role === "worker" && (
                <>
                  {tool.worker ? (
                    tool.worker === userCtx?.id && (
                      <Link
                        className="m-1 border p-1"
                        to={"/removetool/" + tool.id}
                      >
                        Return
                      </Link>
                    )
                  ) : (
                    <Link className="m-1 border p-1" to={"/addtool/" + tool.id}>
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
