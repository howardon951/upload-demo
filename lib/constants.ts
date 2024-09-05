export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
export const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB in bytes

export const allowedTypes = [
  "image/*",
  "video/*",
  "application/pdf", // pdf
  "application/msword", // doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "text/csv", // csv
  "application/vnd.ms-powerpoint", // ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
  "text/plain",
];
