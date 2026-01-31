import {Coordinate} from './coordinate';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publisher: string;
  publishedDate: Date;
  location?: Coordinate;
}
