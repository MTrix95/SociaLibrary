CREATE TABLE IF NOT EXISTS BOOKS
(
    id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    description VARCHAR(255),
    date_published DATE,
    publisher VARCHAR(255),
    location public.geometry(Point, 4326), -- Geometria
    user_id UUID NOT NULL, -- ID UTENTE NON VIENE UTILIZZATA COME FK PERCHE' ID UTENTE E' COLLEGATO CON KEYCLOAK E POTREI PERDERE LO STORICO
    created_at timestamptz DEFAULT NOW() NOT NULL, -- Prendo il timestamp con il fuso orario
    updated_at timestamptz DEFAULT NOW() NOT NULL, -- Aggiorna il timestamp quando viene effettuata una modifica

    CONSTRAINT pk_book PRIMARY KEY (id)
);