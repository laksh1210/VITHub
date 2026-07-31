import { BaseService } from './core/base.service';
import { Book } from '@/types/library';

const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "978-0262033848",
    publishedYear: 2009,
    availableCopies: 3,
    totalCopies: 5,
    category: "Computer Science",
    location: "Block A - Shelf 3",
    libraryId: "AB1",
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    publishedYear: 2008,
    availableCopies: 0,
    totalCopies: 2,
    category: "Software Engineering",
    location: "Block B - Shelf 1",
    libraryId: "AB2",
  }
];

class LibraryService extends BaseService {
  constructor() {
    super("");
  }

  public async getBooks(): Promise<Book[]> {
    return Promise.resolve(MOCK_BOOKS);
  }

  public async borrowBook(id: string): Promise<void> {
    return Promise.resolve();
  }
}

export const libraryService = new LibraryService();
