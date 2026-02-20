-- ENUM per lo stato dei prestiti
CREATE TYPE loan_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'EXPIRED', 'RETURNED');

-- Tabella dei prestiti
CREATE TABLE IF NOT EXISTS LOAN_REQUESTS
(
  id UUID NOT NULL,
  book_id UUID NOT NULL,
  user_id UUID NOT NULL,
  status loan_status NOT NULL DEFAULT 'PENDING',
  request_date timestamptz DEFAULT NOW() NOT NULL, -- Prendo il timestamp con il fuso orario essendo un evento utile per le statistiche

  CONSTRAINT pk_loan_request PRIMARY KEY (id),
  CONSTRAINT fk_book FOREIGN KEY (book_id) references books(id) ON DELETE CASCADE
);