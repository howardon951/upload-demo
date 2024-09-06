import { useState } from "react";

interface UseErrorResult {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export function useError(): UseErrorResult {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  return {
    error,
    setError,
    clearError,
  };
}
