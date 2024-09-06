import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { isAllowedFileType } from "@/lib/utils";

interface FileUploadProps {
  onAddFiles: (files: File[]) => void;
  setError: (error: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAddFiles, setError }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => isAllowedFileType(file.type) && file.size <= MAX_FILE_SIZE
      );

      if (validFiles.length !== acceptedFiles.length) {
        setError("Some files were rejected due to size or type restrictions.");
      }

      if (validFiles.length > 0) {
        onAddFiles(validFiles);
      }
    },
    [onAddFiles, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
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
  );
};

export default FileUpload;
