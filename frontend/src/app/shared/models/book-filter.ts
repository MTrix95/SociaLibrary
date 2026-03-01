import {LoanStatus} from './book';

export interface BookFilter {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  publisher?: string;
  datePublished?: Date;
  status?: LoanStatus;
  userID?: string;
  radius?: number;
  latitude?: number;
  longitude?: number;
}
