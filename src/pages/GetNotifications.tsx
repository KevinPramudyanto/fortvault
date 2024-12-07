import { useQuery } from "@tanstack/react-query";
import GetNotificationsCard from "../components/getnotifications/GetNotificationsCard";
import { readTools, getWorkers } from "../api/api.ts";

const GetNotifications = () => {
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

      {!isPending &&
        !isError &&
        tools.filter((tool: { approved: boolean }) => !tool.approved).length ===
          0 && <div>No notifications yet</div>}

      {!isPending && !isError && (
        <div className="flex flex-col gap-5">
          {tools.map(
            (tool: {
              id: string;
              name: string;
              brand: string;
              worker: string;
              workerUsername: string;
              approved: boolean;
            }) =>
              !tool.approved && (
                <GetNotificationsCard
                  key={tool.id}
                  id={tool.id}
                  name={tool.name}
                  brand={tool.brand}
                  workerUsername={
                    !isWorkersReadPending &&
                    !isWorkersReadError &&
                    workers.find(
                      (worker: { id: string }) => tool.worker === worker.id,
                    )?.username
                  }
                />
              ),
          )}
        </div>
      )}
    </div>
  );
};

export default GetNotifications;
