import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { uploadTool, createTool } from "../api/api.ts";

const CreateTool = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    mutate: uploadMutate,
    isPending: isUploadPending,
    isError: isUploadError,
  } = useMutation({
    mutationFn: uploadTool,
    onSuccess: (data) => {
      handleCreateTool(data.public_id);
    },
  });

  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: createTool,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (!image) {
      setIsError(true);
      setError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "preset");

    uploadMutate(formData);
  };

  const handleCreateTool = (image: string) => {
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

      createMutate({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
        image: image,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">Add Item</div>
      <form className="p-5 sm:p-10" onSubmit={handleUpload}>
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

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="image">
            Image :
          </label>
          <div className="rounded border border-black p-2 focus:outline-black">
            <input
              className="mb-2"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {preview && (
              <img
                className="aspect-video object-cover"
                src={preview}
                alt="preview"
              />
            )}
          </div>
        </div>

        <button
          disabled={isUploadPending || isCreatePending}
          className={
            isUploadPending || isCreatePending
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
      {isUploadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          Failed to upload tool.
        </div>
      )}
      {isCreateError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {createError.message}
        </div>
      )}
    </div>
  );
};

export default CreateTool;
