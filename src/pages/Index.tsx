import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import BookTable from '@/components/BookTable';
import BookFilters from '@/components/BookFilters';
import BookPagination from '@/components/BookPagination';
import BookModal from '@/components/BookModal';
import { useBooks } from '@/hooks/useBooks';

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all-genres');
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: books = [], isLoading, error } = useBooks();

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = genreFilter === 'all-genres' || !genreFilter || book.genre === genreFilter;
      const matchesStatus = statusFilter === 'all-status' || !statusFilter || book.status === statusFilter;
      
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, searchTerm, genreFilter, statusFilter]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiltersChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleFiltersChange();
  };

  const handleGenreChange = (value: string) => {
    setGenreFilter(value);
    handleFiltersChange();
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    handleFiltersChange();
  };

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-destructive">Error loading books. Please try again later.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full"></div>
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold gradient-text">Library Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Manage your digital book collection with style
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span>{books.length} books in your collection</span>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="relative bg-gradient-primary hover:scale-105 text-primary-foreground px-8 py-3 rounded-xl neon-glow transition-all duration-300 font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Book
            </Button>
          </div>
        </div>

        <BookFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          genreFilter={genreFilter}
          onGenreChange={handleGenreChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />

        <BookTable books={paginatedBooks} isLoading={isLoading} />

        {filteredBooks.length > ITEMS_PER_PAGE && (
          <BookPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredBooks.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}

        <BookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default Index;
