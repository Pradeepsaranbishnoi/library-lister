import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BookForm from './BookForm';
import { Book } from '@/lib/api';
import { useCreateBook, useUpdateBook } from '@/hooks/useBooks';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
}

const BookModal = ({ isOpen, onClose, book }: BookModalProps) => {
  const createBook = useCreateBook();
  const updateBook = useUpdateBook();

  const isLoading = createBook.isPending || updateBook.isPending;

  const handleSubmit = async (data: any) => {
    try {
      if (book) {
        await updateBook.mutateAsync({ id: book.id, data });
      } else {
        await createBook.mutateAsync(data);
      }
      onClose();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Form submission error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl glass-effect border-border/50 shadow-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg"></div>
        <div className="relative">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold gradient-text">
              {book ? 'Edit Book' : 'Add New Book'}
            </DialogTitle>
          </DialogHeader>
          <BookForm book={book} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookModal;