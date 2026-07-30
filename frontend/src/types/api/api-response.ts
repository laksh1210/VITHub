export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface FileUploadResponse {
  url: string;
  fileName: string;
  size: number;
}
