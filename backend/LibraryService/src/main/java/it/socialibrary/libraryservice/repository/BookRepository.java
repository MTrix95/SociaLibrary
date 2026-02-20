package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface BookRepository extends CrudRepository<Book, UUID> {
}