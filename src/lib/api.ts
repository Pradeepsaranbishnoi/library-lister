import axios from 'axios';

// Using JSONPlaceholder for demo purposes - in real app would use crudcrud.com
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Mock data structure since JSONPlaceholder doesn't have books
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Issued';
}

// Mock books data
const mockBooks: Book[] = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publishedYear: 1960, status: "Available" },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", publishedYear: 1949, status: "Issued" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", publishedYear: 1813, status: "Available" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publishedYear: 1925, status: "Available" },
  { id: 5, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", genre: "Fantasy", publishedYear: 1997, status: "Issued" },
  { id: 6, title: "Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", publishedYear: 1954, status: "Available" },
  { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", publishedYear: 1951, status: "Available" },
  { id: 8, title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", publishedYear: 1932, status: "Issued" },
  { id: 9, title: "Jane Eyre", author: "Charlotte Brontë", genre: "Romance", publishedYear: 1847, status: "Available" },
  { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", publishedYear: 1937, status: "Available" },
  { id: 11, title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Dystopian", publishedYear: 1953, status: "Available" },
  { id: 12, title: "Moby Dick", author: "Herman Melville", genre: "Adventure", publishedYear: 1851, status: "Issued" },
];

let booksData = [...mockBooks];
let nextId = Math.max(...mockBooks.map(book => book.id)) + 1;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const booksAPI = {
  getBooks: async (): Promise<Book[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return booksData;
  },

  getBook: async (id: number): Promise<Book> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const book = booksData.find(book => book.id === id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  },

  createBook: async (bookData: Omit<Book, 'id'>): Promise<Book> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newBook = { ...bookData, id: nextId++ };
    booksData.push(newBook);
    return newBook;
  },

  updateBook: async (id: number, bookData: Partial<Omit<Book, 'id'>>): Promise<Book> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = booksData.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    booksData[index] = { ...booksData[index], ...bookData };
    return booksData[index];
  },

  deleteBook: async (id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = booksData.findIndex(book => book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    booksData.splice(index, 1);
  },
};

export default api;