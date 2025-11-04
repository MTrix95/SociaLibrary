-- Creo i database
CREATE DATABASE library;
CREATE DATABASE keycloak;

-- Creo gli utenti
CREATE USER library WITH ENCRYPTED PASSWORD 'library';
CREATE USER keycloak WITH ENCRYPTED PASSWORD 'keycloak';

-- Mi connetto al database keycloak per il grant sullo schema
\c keycloak
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT ALL PRIVILEGES ON SCHEMA public TO keycloak;

-- Mi connetto al database library per il grant sullo schema
\c library
GRANT ALL PRIVILEGES ON DATABASE library TO library;
GRANT ALL PRIVILEGES ON SCHEMA public TO library;
