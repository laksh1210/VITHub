export const apiLogger = {
  log: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[API LOG] ${message}`, data ? data : "");
    }
  },
  error: (message: string, error?: unknown) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[API ERROR] ${message}`, error ? error : "");
    }
  },
  warn: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[API WARN] ${message}`, data ? data : "");
    }
  },
};
