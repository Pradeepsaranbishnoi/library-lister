import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, BookOpen } from 'lucide-react';
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
      <Card className="glass-effect border-border/50 shadow-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex-1"></div>
                <div className="h-12 w-24 bg-gradient-to-r from-secondary/50 to-muted/50 rounded-lg"></div>
                <div className="h-12 w-16 bg-gradient-to-r from-success/30 to-warning/30 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!books.length) {
    return (
      <Card className="glass-effect border-border/50 shadow-card">
        <CardContent className="p-16 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center opacity-50">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold gradient-text">No Books Found</h3>
            <p className="text-muted-foreground">Add your first book to get started on your digital library journey!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass-effect card-hover border-border/50 shadow-card overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50 bg-gradient-to-r from-secondary/20 to-transparent">
                <TableHead className="font-bold text-foreground py-4 px-6">Title</TableHead>
                <TableHead className="font-bold text-foreground py-4">Author</TableHead>
                <TableHead className="font-bold text-foreground py-4">Genre</TableHead>
                <TableHead className="font-bold text-foreground py-4">Year</TableHead>
                <TableHead className="font-bold text-foreground py-4">Status</TableHead>
                <TableHead className="font-bold text-foreground py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book, index) => (
                <TableRow 
                  key={book.id} 
                  className="hover:bg-primary/5 border-border/30 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-semibold py-4 px-6 text-foreground group-hover:text-primary transition-colors">
                    {book.title}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground">{book.author}</TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 text-foreground font-medium"
                    >
                      {book.genre}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground font-medium">{book.publishedYear}</TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      variant={book.status === 'Available' ? 'default' : 'outline'}
                      className={book.status === 'Available' 
                        ? 'bg-gradient-to-r from-success to-success/80 text-success-foreground font-semibold shadow-lg' 
                        : 'border-warning text-warning bg-warning/10 font-semibold'
                      }
                    >
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(book)}
                        className="hover:bg-primary/20 hover:text-primary rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-destructive/20 hover:text-destructive rounded-lg transition-all duration-200 hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass-effect">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="gradient-text">Delete Book</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Are you sure you want to delete "{book.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:bg-secondary/50">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(book.id)}
                              className="bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 shadow-lg"
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