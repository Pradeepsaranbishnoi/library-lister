import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { Book } from '@/lib/api';
import { useDeleteBook } from '@/hooks/useBooks';
import BookModal from './BookModal';

interface BookTableProps {
  books: Book[];
  isLoading?: boolean;
}

const BookTable = ({ books, isLoading }: BookTableProps) => {
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteBook = useDeleteBook();

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBook(undefined);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook.mutateAsync(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!books.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">No books found. Add your first book to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Author</TableHead>
                <TableHead className="font-semibold">Genre</TableHead>
                <TableHead className="font-semibold">Year</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.genre}</Badge>
                  </TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={book.status === 'Available' ? 'default' : 'outline'}
                      className={book.status === 'Available' 
                        ? 'bg-success text-success-foreground' 
                        : 'border-warning text-warning'
                      }
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(book)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Book</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{book.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(book.id)}
                              className="bg-destructive hover:bg-destructive/90"
                              disabled={deleteBook.isPending}
                            >
                              {deleteBook.isPending ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BookModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={editingBook}
      />
    </>
  );
};

export default BookTable;