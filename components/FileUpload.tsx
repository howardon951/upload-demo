import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { MAX_FILE_SIZE, MAX_TOTAL_SIZE } from "@/lib/constants";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  onError: (message: string) => void;
  // onProgress: (file: File, progress: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onError,
  // onProgress,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDropOrSelect = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);

      if (acceptedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
        onError("One or more files exceed the 10MB limit.");
        return;
      }

      if (totalSize > MAX_TOTAL_SIZE) {
        onError("Total file size exceeds the 50MB limit.");
        return;
      }
      // acceptedFiles.forEach((file) => {
      //   onProgress(file, 100);
      // });

      //   acceptedFiles.forEach((file) => {
      //     const xhr = new XMLHttpRequest();
      //     xhr.upload.addEventListener("progress", (event) => {
      //       if (event.lengthComputable && event.total > 0) {
      //         const percentCompleted = Math.min(
      //           (event.loaded / event.total) * 100,
      //           100
      //         );
      //         onProgress(file, percentCompleted);
      //       }
      //     });

      //     // Simulate file upload (replace with actual upload logic)
      //     let progress = 0;
      //     const interval = setInterval(() => {
      //       progress = Math.min(progress + 10, 100);
      //       onProgress(file, progress);
      //       if (progress >= 100) {
      //         clearInterval(interval);
      //       }
      //     }, 500);
      //   });

      onFileUpload(acceptedFiles);
    },
    [onError, onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropOrSelect,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p>Drag files here, or click to select files</p>
            <Button className="mt-4">Select Files</Button>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUpload;
