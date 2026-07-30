export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  availableCopies: number;
  totalCopies: number;
  category: string;
  coverImage?: string;
  location?: string;
  libraryId: 'AB1' | 'AB2';
  description?: string;
}
