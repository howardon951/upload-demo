import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { allowedTypes } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// the browser do not check * type, so we need to check it here
export const isAllowedFileType = (fileType: string) => {
  return allowedTypes.some((type) => {
    if (type.endsWith("/*")) {
      return fileType.startsWith(type.slice(0, -2));
    }
    return type === fileType;
  });
};
