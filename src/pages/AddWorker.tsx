import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addWorker } from "../api/api.ts";

const AddWorker = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: addWorker,
    onSuccess: () => {
      navigate("/getworkers", { replace: true });
    },
  });

  const handleAddWorker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (usernameRef.current) {
      if (
        usernameRef.current.value.length < 1 ||
        usernameRef.current.value.length > 20
      ) {
        setIsError(true);
        setError("Username must be between 1-20 characters.");
        return;
      }

      mutate({
        username: usernameRef.current.value,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">Add Worker</div>
      <form className="p-5 sm:p-10" onSubmit={handleAddWorker}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="username">
            Username :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>

        <button
          disabled={isRequestPending}
          className={
            isRequestPending
              ? "submitting mt-3 rounded px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Add Worker
        </button>
      </form>

      {isError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {error}
        </div>
      )}
      {isRequestError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {requestError.message}
        </div>
      )}
    </div>
  );
};

export default AddWorker;
