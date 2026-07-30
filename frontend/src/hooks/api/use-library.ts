import { useApiQuery } from './use-api-query';
import { useApiMutation } from './use-api-mutation';
import { libraryService } from '@/services/library.service';
import { queryKeys } from '@/lib/query/query-keys';
import { Book } from '@/types/library';
import { useQueryClient } from '@tanstack/react-query';

export function useBooks() {
  return useApiQuery<Book[]>(
    queryKeys.library.books(),
    () => libraryService.getBooks()
  );
}

export function useBorrowBook() {
  const queryClient = useQueryClient();
  
  return useApiMutation<void, string>(
    (id: string) => libraryService.borrowBook(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.library.books() });
      }
    }
  );
}
