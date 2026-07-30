import React from 'react';
import { Book } from '@/types/library';
import { useBorrowBook } from '@/hooks/api/use-library';
import { BookOpen, User, Hash, Library as LibraryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function BookCard({ book }: { book: Book }) {
  const { mutate: borrowBook, isPending } = useBorrowBook();
  const isAvailable = book.availableCopies > 0;

  const handleBorrow = () => {
    borrowBook(book.id, {
      onSuccess: () => {
        toast.success(`You have successfully borrowed "${book.title}"`);
      },
      onError: () => {
        toast.error(`Failed to borrow "${book.title}". Please try again.`);
      }
    });
  };

  return (
    <div className="flex flex-col rounded-2xl glass-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 group">
      {/* Cover Image Placeholder */}
      <div className="h-40 w-full bg-muted flex items-center justify-center relative overflow-hidden">
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary/40" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md",
            isAvailable 
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
              : "bg-rose-500/10 text-rose-500 border-rose-500/20"
          )}>
            {isAvailable ? 'Available' : 'Checked Out'}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h4 className="font-bold text-foreground line-clamp-1 mb-1">{book.title}</h4>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <User className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{book.author}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/50 rounded-lg p-2 border border-border">
            <LibraryIcon className="w-3.5 h-3.5" />
            <span className="font-medium">{book.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/50 rounded-lg p-2 border border-border">
            <Hash className="w-3.5 h-3.5" />
            <span className="font-medium">{book.isbn}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            {book.availableCopies} <span className="text-muted-foreground font-normal">/ {book.totalCopies} Copies</span>
          </span>
          <button
            onClick={handleBorrow}
            disabled={!isAvailable || isPending}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
          >
            {isPending ? 'Processing...' : 'Borrow'}
          </button>
        </div>
      </div>
    </div>
  );
}
