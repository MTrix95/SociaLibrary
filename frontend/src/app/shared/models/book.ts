import {BookImage} from './book-image';

export interface Book {
  id: string,
  title: string,
  author: string,
  isbn: string,
  genre: string,
  publisher: string,
  datePublished: Date,
  description?: string,
  latitude?: number,
  longitude?: number,
  status?: LoanStatus
  bookImages?: BookImage[]
}

export enum LoanStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}
