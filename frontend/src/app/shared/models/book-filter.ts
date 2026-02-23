import {Location} from './location';

export interface BookFilter {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: Date;
  radius?: number;
  latitude?: number;
  longitude?: number;
}
