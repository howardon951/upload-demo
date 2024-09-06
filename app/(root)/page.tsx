"use client";

import React from "react";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import UploadStats from "@/components/UploadStats";
import ErrorDialog from "@/components/ErrorDialog";
import { useUpload } from "@/hooks/useUpload";

const Page: React.FC = () => {
  const {
    uploadedFiles,
    totalUploadedSize,
    addFiles,
    removeFile,
    error,
    setError,
  } = useUpload();

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="text-3xl font-bold mb-6 text-center">File Uploader</h1>
        <div className="space-y-8 max-w-3xl mx-auto">
          <FileUpload onAddFiles={addFiles} setError={setError} />
          <UploadStats totalUploadedSize={totalUploadedSize} />
          <FileList files={uploadedFiles} onFileRemove={removeFile} />
        </div>
      </div>
      <ErrorDialog
        isOpen={!!error}
        onClose={() => setError(null)}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default Page;
