import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// interface FileWithProgress extends File {
//   progress: number;
// }

interface FileListProps {
  files: File[];
  onFileRemove: (file: File) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileRemove }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="mt-8 mx-auto">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="flex-grow">{file.name}</span>
                <span className="text-sm text-gray-500 mr-4">
                  {formatFileSize(file.size)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onFileRemove(file)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Progress value={0} className="w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
