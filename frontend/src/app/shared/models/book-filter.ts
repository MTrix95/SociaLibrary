import {LoanStatus} from './book';

export interface BookFilter {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: Date;
  status?: LoanStatus;
  userID?: string;
  radius?: number;
  latitude?: number;
  longitude?: number;
}
