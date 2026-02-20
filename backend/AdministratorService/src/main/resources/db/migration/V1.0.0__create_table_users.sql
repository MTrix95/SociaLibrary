CREATE TABLE IF NOT EXISTS USERS
(
    id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at timestamptz DEFAULT NOW() NOT NULL, -- Prendo il timestamp con il fuso orario
    updated_at timestamptz, -- Aggiorna il timestamp quando viene effettuata una modifica

    CONSTRAINT pk_user PRIMARY KEY (id)
);