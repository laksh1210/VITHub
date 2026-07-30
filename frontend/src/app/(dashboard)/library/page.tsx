'use client';

import React, { useState } from 'react';
import LibraryWidget from '@/components/dashboard/LibraryWidget';
import { useBooks } from '@/hooks/api/use-library';
import { BookCard } from '@/components/library/book-card';
import { Library, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
  const { data: books, isLoading, isError } = useBooks();
  const [activeLibrary, setActiveLibrary] = useState<'AB1' | 'AB2'>('AB1');

  const filteredBooks = books?.filter(book => book.libraryId === activeLibrary);

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col space-y-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-2">
          <Library className="w-8 h-8 text-primary" />
          Campus Libraries
        </h1>
        <p className="text-muted-foreground">Search the catalog, borrow resources, and view real-time seat availability across AB1 and AB2.</p>
      </div>

      {/* Analytics Widget section */}
      <section>
        <LibraryWidget />
      </section>

      {/* Books Catalog section */}
      <section className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground mr-4">Resource Catalog</h2>
            <div className="flex bg-muted p-1 rounded-xl">
              <button
                onClick={() => setActiveLibrary('AB1')}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg transition-all",
                  activeLibrary === 'AB1' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                VIT AB1
              </button>
              <button
                onClick={() => setActiveLibrary('AB2')}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg transition-all",
                  activeLibrary === 'AB2' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                VIT AB2
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={`Search ${activeLibrary} catalog...`} 
              className="pl-9 pr-4 py-2 rounded-xl border border-border bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64 glass-panel"
            />
          </div>
        </div>

        {isLoading && (
          <div className="w-full h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        )}

        {isError && (
          <div className="w-full p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center">
            Failed to load library catalog. Ensure the backend endpoint is running.
          </div>
        )}

        {filteredBooks && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          !isLoading && !isError && (
            <div className="w-full p-12 rounded-2xl glass-panel border border-border text-center flex flex-col items-center">
              <Library className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No resources found in the {activeLibrary} catalog.</p>
            </div>
          )
        )}
      </section>
    </div>
  );
}
