-- ENUM per indicare il tipo di immagine
CREATE TYPE image_type AS ENUM ('COVER', 'PREVIEW');

-- Tabella delle immagini
CREATE TABLE IF NOT EXISTS BOOKS_IMAGES
(
  id UUID NOT NULL,
  book_id UUID NOT NULL,
  url_image UUID NULL,
  type image_type NOT NULL,

  CONSTRAINT fk_book FOREIGN KEY (book_id) references books(id) ON DELETE CASCADE
);