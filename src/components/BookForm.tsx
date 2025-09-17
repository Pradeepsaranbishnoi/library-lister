import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Book } from '@/lib/api';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  author: z.string().min(1, 'Author is required').max(50, 'Author must be less than 50 characters'),
  genre: z.string().min(1, 'Genre is required'),
  publishedYear: z.number().min(1000, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
  status: z.enum(['Available', 'Issued']),
});

type BookFormData = z.infer<typeof bookSchema>;

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => void;
  isLoading?: boolean;
}

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Thriller',
  'Science Fiction',
  'Historical Fiction',
  'Biography',
  'Adventure',
  'Dystopian',
  'Other'
];

const BookForm = ({ book, onSubmit, isLoading = false }: BookFormProps) => {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || '',
      author: book?.author || '',
      genre: book?.genre || '',
      publishedYear: book?.publishedYear || new Date().getFullYear(),
      status: book?.status || 'Available',
    },
  });

  const handleSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Published Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1000"
                  max={new Date().getFullYear()}
                  placeholder="Enter published year"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Issued">Issued</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary-hover">
            {isLoading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookForm;