import {Location} from './location';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publisher: string;
  publishedDate: Date;
  lat: number;
  lon: number;
}
