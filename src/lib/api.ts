import axios from 'axios';

// CrudCrud base URL (temporary, expires after some time)
const API_BASE_URL = 'https://crudcrud.com/api/41c86d7725ad4e51858616dc86c4a1e5';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Issued';
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const booksAPI = {
  getBooks: async (): Promise<Book[]> => {
    const { data } = await api.get<Book[]>('/books');
    return data;
  },

  getBook: async (id: string): Promise<Book> => {
    const { data } = await api.get<Book>(`/books/${id}`);
    return data;
  },

  createBook: async (bookData: Omit<Book, '_id'>): Promise<Book> => {
    const { data } = await api.post<Book>('/books', bookData);
    return data;
  },

  // CrudCrud PUT replaces the entire document; do not send _id in payload
  updateBook: async (id: string, bookData: Omit<Book, '_id'>): Promise<Book> => {
    await api.put(`/books/${id}`, bookData);
    // CrudCrud PUT does not return the updated document; fetch it back
    const { data } = await api.get<Book>(`/books/${id}`);
    return data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};

export default api;