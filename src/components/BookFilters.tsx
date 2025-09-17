import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface BookFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  genreFilter: string;
  onGenreChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

const GENRES = [
  'All Genres',
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

const BookFilters = ({
  searchTerm,
  onSearchChange,
  genreFilter,
  onGenreChange,
  statusFilter,
  onStatusChange,
}: BookFiltersProps) => {
  return (
    <Card className="glass-effect card-hover border-border/50 shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 group-focus-within:scale-110 transition-transform" />
            <Input
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={genreFilter} onValueChange={onGenreChange}>
              <SelectTrigger className="w-48 h-12 bg-secondary/50 border-border/50 rounded-xl hover:bg-secondary/70 transition-colors">
                <Filter className="w-4 h-4 mr-2 text-primary" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="glass-effect">
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre === 'All Genres' ? 'all-genres' : genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger className="w-48 h-12 bg-secondary/50 border-border/50 rounded-xl hover:bg-secondary/70 transition-colors">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-effect">
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Issued">Issued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookFilters;