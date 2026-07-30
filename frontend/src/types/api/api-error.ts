export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

export interface ValidationError extends ApiError {
  validationErrors: Record<string, string[]>;
}
