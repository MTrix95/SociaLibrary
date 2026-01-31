-- PREPARAZIONE DB LIBRARY
CREATE DATABASE library;
CREATE USER library WITH ENCRYPTED PASSWORD 'library';

-- Connettiti a library
\c library

-- Proprietà e permessi sul DB
GRANT ALL PRIVILEGES ON DATABASE library TO library;
GRANT CREATE ON DATABASE library TO library;

-- Schema public
GRANT USAGE, CREATE ON SCHEMA public TO library;
ALTER SCHEMA public OWNER TO library;

-- Permessi di default su nuovi oggetti
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO library;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO library;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO library;