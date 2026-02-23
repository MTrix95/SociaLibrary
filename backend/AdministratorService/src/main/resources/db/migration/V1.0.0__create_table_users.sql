CREATE TABLE IF NOT EXISTS USERS
(
    id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL, -- Prendo il timestamp
    updated_at TIMESTAMP, -- Aggiorna il timestamp quando viene effettuata una modifica

    CONSTRAINT pk_user PRIMARY KEY (id)
);