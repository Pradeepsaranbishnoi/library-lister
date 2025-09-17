import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksAPI, Book } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: booksAPI.getBooks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBook = (id: number) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => booksAPI.getBook(id),
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: booksAPI.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book created successfully!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create book. Please try again.",
        variant: "destructive",
      });
      console.error('Create book error:', error);
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Omit<Book, 'id'>> }) =>
      booksAPI.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book updated successfully!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update book. Please try again.",
        variant: "destructive",
      });
      console.error('Update book error:', error);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: booksAPI.deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book deleted successfully!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
      console.error('Delete book error:', error);
    },
  });
};