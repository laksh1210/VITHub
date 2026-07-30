import { useQuery } from "@tanstack/react-query";
import { canteenQueuesApi } from "@/lib/api/canteen-queues";
import { queryKeys } from "@/lib/query-keys";

export function useCanteenQueues() {
  return useQuery({
    queryKey: queryKeys.canteenQueues.all,
    queryFn: canteenQueuesApi.getAll,
  });
}

export function useCanteenQueue(id: string) {
  return useQuery({
    queryKey: queryKeys.canteenQueues.detail(id),
    queryFn: () => canteenQueuesApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCanteenQueueByCanteenId(canteenId: string) {
  return useQuery({
    queryKey: queryKeys.canteenQueues.byCanteen(canteenId),
    queryFn: () => canteenQueuesApi.getByCanteenId(canteenId),
    enabled: Boolean(canteenId),
  });
}
