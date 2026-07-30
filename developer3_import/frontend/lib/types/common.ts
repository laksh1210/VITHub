export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

export type SortDirection = "asc" | "desc";
export type ViewMode = "card" | "table";

export interface SelectOption {
  value: string;
  label: string;
}
