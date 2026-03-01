import {LoanStatus} from './book';

export interface LoanRequest {
  id?: string,
  bookID?: string,
  status?: LoanStatus,
  message?: string
}
