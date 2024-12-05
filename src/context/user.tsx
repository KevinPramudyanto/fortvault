import { createContext, Dispatch, SetStateAction } from "react";

export default createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  id: string | null;
  setId: Dispatch<SetStateAction<string | null>>;
  role: string | null;
  setRole: Dispatch<SetStateAction<string | null>>;
} | null>(null);
