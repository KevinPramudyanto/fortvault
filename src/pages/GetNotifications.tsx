import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/common/Header";
import UserContext from "../context/user.tsx";
import { readTools } from "../api/api.ts";

const GetNotifications = () => {
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

      {isPending && <div>Loading data in progress...</div>}

      {isError && <div>Error: {error.message}</div>}

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
          }) =>
            !tool.approved && (
              <div key={tool.id} className="m-5 border p-5">
                <div>Name: {tool.name}</div>
                <div>Brand: {tool.brand}</div>
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
              </div>
            ),
        )}
    </div>
  );
};

export default GetNotifications;
