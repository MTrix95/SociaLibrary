import {Coordinate} from './coordinate';

export interface BookFilter {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: Date;
  radius?: number;
  location?: Coordinate;
}
