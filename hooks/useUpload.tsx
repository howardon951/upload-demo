import { useState, useCallback } from "react";
import { MAX_TOTAL_SIZE } from "@/lib/constants";
import { useError } from "./useError";

export type FileWithId = File & { _id: string };
interface UseUploadResult {
  uploadedFiles: FileWithId[];
  totalUploadedSize: number;
  addFiles: (files: File[]) => Promise<void>;
  removeFile: (file: FileWithId) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export function useUpload(): UseUploadResult {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([]);
  const [totalUploadedSize, setTotalUploadedSize] = useState<number>(0);
  const { error, setError, clearError } = useError();

  const onStoreDb = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return { ...file, _id: data.fileId };
  };

  const addFiles = useCallback(
    async (newFiles: File[]) => {
      const newTotalSize =
        totalUploadedSize + newFiles.reduce((acc, file) => acc + file.size, 0);

      if (newTotalSize > MAX_TOTAL_SIZE) {
        setError("Total file size exceeds the 50MB limit.");
        return;
      }

      const promises = newFiles.map(onStoreDb);
      const storedFiles = await Promise.all(promises);

      setUploadedFiles((prevFiles) => [...prevFiles, ...storedFiles]);
      setTotalUploadedSize(newTotalSize);
      clearError();
    },
    [totalUploadedSize, setError, clearError]
  );

  const removeFile = useCallback((file: FileWithId) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((f) => f._id !== file._id)
    );
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
