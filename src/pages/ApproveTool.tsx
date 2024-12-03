import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { readTool, approveTool } from "../api/api.ts";

const ApproveTool = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: tool = {},
    isPending: isReadPending,
    isError: isReadError,
    error: readError,
  } = useQuery({
    queryKey: ["tool", id],
    queryFn: () => readTool(id || ""),
  });

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: approveTool,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleApproveTool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id || "");
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Approve Item
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleApproveTool}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="name">
            Name :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            autoComplete="off"
            disabled
            defaultValue={tool.name}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="description">
            Description :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="description"
            type="text"
            placeholder="Description"
            ref={descriptionRef}
            autoComplete="off"
            disabled
            defaultValue={tool.description}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="brand">
            Brand :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="brand"
            type="text"
            placeholder="Brand"
            ref={brandRef}
            autoComplete="off"
            disabled
            defaultValue={tool.brand}
          />
        </div>

        <button
          disabled={isReadPending || isRequestPending}
          className={
            isReadPending || isRequestPending
              ? "mt-3 rounded bg-neutral-200 px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Approve this item ?
        </button>
      </form>

      {isReadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {readError.message}
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

export default ApproveTool;
