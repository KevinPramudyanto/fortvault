import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createTool } from "../api/api.ts";

const CreateTool = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: createTool,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleCreateTool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (nameRef.current && descriptionRef.current && brandRef.current) {
      if (nameRef.current.value === "") {
        setIsError(true);
        setError("Name is required.");
        return;
      }
      if (descriptionRef.current.value === "") {
        setIsError(true);
        setError("Description is required.");
        return;
      }
      if (brandRef.current.value === "") {
        setIsError(true);
        setError("Brand is required.");
        return;
      }

      mutate({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">Add Item</div>
      <form className="p-5 sm:p-10" onSubmit={handleCreateTool}>
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
            required
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
            required
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
            required
          />
        </div>

        <button
          disabled={isRequestPending}
          className={
            isRequestPending
              ? "mt-3 rounded bg-neutral-200 px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Add Item
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

export default CreateTool;
