import {Coordinate} from './coordinate';

export interface BookSearchFilter {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: Date;
  radius?: number;
  location?: Coordinate;
}
