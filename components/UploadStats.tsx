import React from "react";
import { MAX_TOTAL_SIZE } from "@/lib/constants";
import { formatFileSize } from "@/lib/utils";

interface UploadStatsProps {
  totalUploadedSize: number;
}

const UploadStats: React.FC<UploadStatsProps> = ({ totalUploadedSize }) => {
  const remainingSize = MAX_TOTAL_SIZE - totalUploadedSize;
  //   const percentageUploaded = (totalUploadedSize / MAX_TOTAL_SIZE) * 100;

  return (
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
  );
};

export default UploadStats;
