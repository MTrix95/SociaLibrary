export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publisher: string;
  publishedDate: Date;
  latitude: number;
  longitude: number;
  status?: LoanStatus
}

export enum LoanStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
}
