import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { removeWorker } from "../api/api.ts";

const RemoveWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: removeWorker,
    onSuccess: () => {
      navigate("/getworkers", { replace: true });
    },
  });

  const handleRemoveWorker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id || "");
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Remove Worker
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleRemoveWorker}>
        <button
          disabled={isRequestPending}
          className={
            isRequestPending
              ? "mt-3 rounded bg-neutral-200 px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Remove this worker ?
        </button>
      </form>

      {isRequestError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {requestError.message}
        </div>
      )}
    </div>
  );
};

export default RemoveWorker;
