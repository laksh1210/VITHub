import { useQuery } from "@tanstack/react-query";
import { canteenQueuesService } from "@/services/canteen-queues.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useCanteenQueues() {
  return useQuery({
    queryKey: queryKeys.canteenQueues.all,
    queryFn: () => canteenQueuesService.getAll(),
  });
}

export function useCanteenQueue(id: string) {
  return useQuery({
    queryKey: queryKeys.canteenQueues.detail(id),
    queryFn: () => canteenQueuesService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCanteenQueueByCanteenId(canteenId: string) {
  return useQuery({
    queryKey: queryKeys.canteenQueues.byCanteen(canteenId),
    queryFn: () => canteenQueuesService.getByCanteenId(canteenId),
    enabled: Boolean(canteenId),
  });
}
