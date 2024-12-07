import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoIosAddCircle } from "react-icons/io";
import ReadToolsCard from "../components/readtools/ReadToolsCard";
import UserContext from "../context/user.tsx";
import { readTools, getWorkers } from "../api/api.ts";

const ReadTools = () => {
  const userCtx = useContext(UserContext);

  const {
    data: tools = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["tools"], queryFn: readTools });

  const {
    data: workers = [],
    isPending: isWorkersReadPending,
    isError: isWorkersReadError,
    error: workersReadError,
  } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });

  return (
    <div className="m-auto">
      {userCtx?.role === "manager" && (
        <Link
          to={"/createtool"}
          className="my-5 flex items-center justify-end gap-1 text-3xl text-green-800 hover:cursor-pointer hover:text-green-900"
        >
          <IoIosAddCircle />
          <div className="text-xl font-bold">Add Item</div>
        </Link>
      )}

      {(isPending || isWorkersReadPending) && (
        <div>Loading data in progress...</div>
      )}

      {isError && (
        <div className="mx-auto my-2 max-w-md border border-red-600 p-2 font-bold text-red-600">
          Error: {error.message}
        </div>
      )}
      {isWorkersReadError && (
        <div className="mx-auto my-2 max-w-md border border-red-600 p-2 font-bold text-red-600">
          Error: {workersReadError.message}
        </div>
      )}

      {!isPending && !isError && tools.length === 0 && <div>No items yet</div>}

      {!isPending && !isError && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {tools.map(
            (tool: {
              id: string;
              name: string;
              description: string;
              brand: string;
              image: string;
              worker: string;
              workerUsername: string;
              approved: boolean;
            }) => (
              <ReadToolsCard
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                brand={tool.brand}
                image={tool.image}
                worker={tool.worker}
                workerUsername={
                  !isWorkersReadPending &&
                  !isWorkersReadError &&
                  workers.find(
                    (worker: { id: string }) => tool.worker === worker.id,
                  )?.username
                }
                approved={tool.approved}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ReadTools;
