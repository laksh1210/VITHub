import { API_ENDPOINTS } from '@/constants/api';
import { BaseService } from './core/base.service';
import { Book } from '@/types/library';


class LibraryService extends BaseService {
  constructor() {
    super("");
  }

  public async getBooks(): Promise<Book[]> {
    return this.get<Book[]>(API_ENDPOINTS.LIBRARY.BOOKS);
  }

  public async borrowBook(id: string): Promise<void> {
    return this.post<void>(API_ENDPOINTS.LIBRARY.BORROW(id));
  }
}

export const libraryService = new LibraryService();
