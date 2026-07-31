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
    id: "3",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    isbn: "978-0134610993",
    publishedYear: 2020,
    availableCopies: 1,
    totalCopies: 2,
    category: "Computer Science",
    location: "Block B - Shelf 2",
    libraryId: "AB1",
  },
  {
    id: "4",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "978-0135957059",
    publishedYear: 2019,
    availableCopies: 4,
    totalCopies: 4,
    category: "Software Engineering",
    location: "Block C - Shelf 1",
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
  },
  {
    id: "5",
    title: "Design Patterns",
    author: "Erich Gamma",
    isbn: "978-0201633610",
    publishedYear: 1994,
    availableCopies: 2,
    totalCopies: 5,
    category: "Software Engineering",
    location: "Block A - Shelf 4",
    libraryId: "AB2",
  },
  {
    id: "6",
    title: "Computer Networking",
    author: "James Kurose",
    isbn: "978-0133594140",
    publishedYear: 2016,
    availableCopies: 1,
    totalCopies: 3,
    category: "Computer Science",
    location: "Block D - Shelf 2",
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
