# VITHub API Architecture

The API Foundation is a highly scalable, strictly typed architecture built for VITHub's frontend.

## 1. Service Layer (`src/services/`)
- All services should extend the `BaseService`.
- `BaseService` provides built-in typed wrappers for `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `upload`, and `download`.
- It automatically unwraps the `ApiResponse<T>` envelope via `parseResponse`.
- Always import services from the registry `src/services/index.ts`.

## 2. API Endpoints (`src/constants/api.ts`)
- Never hardcode endpoints in service files.
- Store all endpoints hierarchically in `API_ENDPOINTS`.

## 3. Query Architecture (`src/lib/query/`)
- **Query Keys**: Managed in `query-keys.ts` as a factory to ensure consistency (e.g. `queryKeys.buildings.detail(id)`).
- **Query Options**: Default behaviors like `volatile`, `standard`, and `static` are configured in `query-options.ts`.

## 4. Generic Hooks (`src/hooks/api/`)
Instead of using `useQuery` directly in components, wrap API calls with generic hooks that enforce our architecture:
- `useApiQuery`: For standard GET requests. Includes built-in `AbortSignal` injection.
- `useApiMutation`: For POST/PUT/DELETE.
- `usePaginatedQuery`: Extends `useApiQuery` for paginated results (Spring Boot standard).
- `useInfiniteApiQuery`: For infinite scrolling with `pageParam`.

## 5. Error Handling (`src/utils/api/error-mapper.ts`)
- The Axios interceptor traps errors globally.
- `mapApiError` parses them into a standard `ApiError` format with user-friendly messages for status codes like 400, 401, 403, 404, 422, 500.

## 6. Data Flow
1. UI triggers `useApiQuery` hook.
2. Hook resolves `QueryKey` and passes `AbortSignal`.
3. Hook calls `FeatureService.getSomething({ signal })`.
4. `FeatureService` extends `BaseService.get()`.
5. `BaseService` uses `apiClient` (Axios).
6. Request Interceptor injects JWT token.
7. Network call is made.
8. Response Interceptor traps any global errors (401 triggers refresh queue).
9. `parseResponse` normalizes output.
10. Data returns to TanStack Query cache.
11. UI updates.
