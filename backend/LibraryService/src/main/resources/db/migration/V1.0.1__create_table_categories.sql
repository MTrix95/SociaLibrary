-- TABELLA CATEGORIE
CREATE TABLE IF NOT EXISTS CATEGORIES
(
  id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,

  CONSTRAINT pk_category PRIMARY KEY (id)
);

-- TABELLA N:N TRA LIBRI E CATEGORIE
CREATE TABLE IF NOT EXISTS BOOK_CATEGORIES
(
  book_id UUID NOT NULL,
  category_id UUID NOT NULL,

  CONSTRAINT pk_book_category PRIMARY KEY (book_id, category_id),
  CONSTRAINT fk_book FOREIGN KEY (book_id) references books(id) ON DELETE CASCADE, -- Se elimino un libro, elimino anche le categorie associate
  CONSTRAINT fk_category FOREIGN KEY (category_id) references categories(id) ON DELETE CASCADE -- Se elimino una categoria, elimino anche i libri associati
);