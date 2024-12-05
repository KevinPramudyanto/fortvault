import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import Header from "../components/common/Header";
import UserContext from "../context/user.tsx";
import { getWorkers } from "../api/api.ts";

const GetWorkers = () => {
  const userCtx = useContext(UserContext);

  const {
    data: workers = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });

  return (
    <div className="m-auto max-w-md">
      <Header />

      {userCtx?.role === "manager" && (
        <Link
          to={"/addworker"}
          className="my-5 flex items-center justify-end gap-1 text-3xl text-green-800 hover:cursor-pointer hover:text-green-900"
        >
          <IoIosAddCircle />
          <div className="text-xl font-bold">Add Worker</div>
        </Link>
      )}

      {isPending && <div>Loading data in progress...</div>}

      {isError && <div>Error: {error.message}</div>}

      {!isPending && !isError && workers.length === 0 && (
        <div>No workers yet</div>
      )}

      {!isPending &&
        !isError &&
        workers.map((worker: { id: string; username: string }) => (
          <div key={worker.id} className="m-5 border p-5">
            <div>Username: {worker.username}</div>
            <Link
              className="m-1 border p-1"
              to={"/removeworker/" + worker.id}
              state={worker.username}
            >
              Remove
            </Link>
          </div>
        ))}
    </div>
  );
};

export default GetWorkers;
