"use client";

import React, { useState } from "react";
import FileUpload from "@/components/FileUpload";
import FileList from "@/components/FileList";
import { MAX_TOTAL_SIZE } from "@/lib/constants";
import { formatFileSize, isAllowedFileType } from "@/lib/utils";
import ErrorDialog from "@/components/ErrorDialog";

const Page = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalUploadedSize, setTotalUploadedSize] = useState<number>(0);

  const handleFileUpload = (files: File[]) => {
    const newFiles = files
      .filter((file) => isAllowedFileType(file.type))
      .map((file) => file);

    const newTotalSize =
      totalUploadedSize + newFiles.reduce((acc, file) => acc + file.size, 0);

    if (newTotalSize > MAX_TOTAL_SIZE) {
      setError("Total file size exceeds the 50MB limit.");
      return;
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setTotalUploadedSize(newTotalSize);
    setError(null);
  };

  const handleFileRemove = (file: File) => {
    if (!uploadedFiles.some((f) => f.name === file.name)) {
      setError("File not found in uploaded files.");
      return;
    }
    setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    setTotalUploadedSize((prevSize) => prevSize - file.size);
  };

  const remainingSize = MAX_TOTAL_SIZE - totalUploadedSize;

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="text-3xl font-bold mb-6 text-center">File Uploader</h1>
        <div className="space-y-8 min-w-5xl mx-auto">
          <FileUpload
            onFileUpload={handleFileUpload}
            onError={(message) => setError(message)}
          />
          <div className="text-center">
            <div className="flex justify-between">
              <span>Total Uploaded:</span>
              <span>{formatFileSize(totalUploadedSize)}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining:</span>
              <span>{formatFileSize(remainingSize)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Limit:</span>
              <span>{formatFileSize(MAX_TOTAL_SIZE)}</span>
            </div>
          </div>
          <FileList files={uploadedFiles} onFileRemove={handleFileRemove} />
        </div>
      </div>
      <ErrorDialog
        isOpen={error !== null}
        onClose={() => setError(null)}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default Page;
// todos
// - [ ] before upload
//     - [x] 10MB each file
//     - [x] 50Mb total
//     - [ ] file type selector and file type limiter
// - [ ] upload
//     - [ ] add a progress bar
// - [ ] add a way to pause the upload
// - [ ] add a way to resume the upload
// - [ ] add a way to cancel the upload
// - [ ] after upload
//     - [x] add a way to remove a file from the list
//     - [ ] add a way to download the files
// - [x] error handling
//     - [x] add a way to handle errors : pop up error message
