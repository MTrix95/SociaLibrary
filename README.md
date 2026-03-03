# SociaLibrary

Progetto di tesi triennale università telematica "Pegaso".

Candidato: Luca Tricarico
Matricola: 0312301465
---

## Prerequisiti

- **Docker Desktop** (Windows o macOS)

---

## Come avviare il progetto

### 1. Clonare il repository
```bash
git clone <url-repository>
cd SociaLibrary
```

### 2. Avviare i container Docker
```bash
docker-compose up -d
```

### 3. Attendere l'avvio completo
L'avvio di tutti i servizi può richiedere alcuni minuti. Puoi verificare lo stato con:
```bash
docker-compose ps
```

### 4. Accedere all'applicazione
Una volta avviato, l'applicazione sarà disponibile all'indirizzo:
```
http://localhost
```

---

## Account di test

Il sistema viene fornito con due account predefiniti per testare le diverse funzionalità:

| Email | Password | Ruolo | Descrizione |
|-------|----------|-------|-------------|
| admin@admin.it | admin | Amministratore | Accesso completo alle funzionalità di amministrazione |
| user@user.it | user | Utente | Accesso alle funzionalità utente standard |

---

## Arrestare il progetto

Per fermare tutti i container:
```bash
docker-compose down
```

Per fermare e rimuovere anche i volumi (database, configurazioni):
```bash
docker-compose down -v
```

---

