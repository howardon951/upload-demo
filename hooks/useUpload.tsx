import { useState, useCallback } from "react";
import { MAX_TOTAL_SIZE } from "@/lib/constants";
import { useError } from "./useError";

interface UseUploadResult {
  uploadedFiles: File[];
  totalUploadedSize: number;
  addFiles: (files: File[]) => void;
  removeFile: (file: File) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export function useUpload(): UseUploadResult {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [totalUploadedSize, setTotalUploadedSize] = useState<number>(0);
  const { error, setError, clearError } = useError();

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const newTotalSize =
        totalUploadedSize + newFiles.reduce((acc, file) => acc + file.size, 0);

      if (newTotalSize > MAX_TOTAL_SIZE) {
        setError("Total file size exceeds the 50MB limit.");
        return;
      }

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setTotalUploadedSize(newTotalSize);
      clearError();
    },
    [totalUploadedSize, setError, clearError]
  );

  const removeFile = useCallback((file: File) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    setTotalUploadedSize((prevSize) => prevSize - file.size);
  }, []);

  return {
    uploadedFiles,
    totalUploadedSize,
    addFiles,
    removeFile,
    error,
    setError,
  };
}
