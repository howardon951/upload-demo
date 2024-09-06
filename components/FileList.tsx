import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from "@/lib/utils";

interface FileListProps {
  files: File[];
  onFileRemove: (file: File) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileRemove }) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

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
              <Progress value={progress} className="w-[60%]" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
