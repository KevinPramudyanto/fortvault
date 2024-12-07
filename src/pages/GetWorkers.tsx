import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import GetWorkersSkeleton from "../components/getworkers/GetWorkersSkeleton";
import GetWorkersCard from "../components/getworkers/GetWorkersCard";
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
    <div className="m-auto max-w-xl">
      {userCtx?.role === "manager" && (
        <Link
          to={"/addworker"}
          className="my-5 flex items-center justify-end gap-1 text-3xl text-green-800 hover:cursor-pointer hover:text-green-900"
        >
          <IoIosAddCircle />
          <div className="text-xl font-bold">Add Worker</div>
        </Link>
      )}

      {isPending && (
        <div className="flex flex-col gap-5">
          {Array(12)
            .fill("a")
            .map((_, idx) => (
              <GetWorkersSkeleton key={idx} />
            ))}
        </div>
      )}

      {isError && (
        <div className="mx-auto my-2 max-w-md border border-red-600 p-2 font-bold text-red-600">
          Error: {error.message}
        </div>
      )}

      {!isPending && !isError && workers.length === 0 && (
        <div>No workers yet</div>
      )}

      {!isPending && !isError && (
        <div className="flex flex-col gap-5">
          {workers.map((worker: { id: string; username: string }) => (
            <GetWorkersCard
              key={worker.id}
              id={worker.id}
              username={worker.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetWorkers;
