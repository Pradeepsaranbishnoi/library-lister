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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Management</h2>
            <p className="text-muted-foreground mt-1">
              Manage your library collection
            </p>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
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
