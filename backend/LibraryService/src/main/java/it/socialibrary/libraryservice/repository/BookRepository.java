package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.repository.specifications.BookSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BookRepository extends ListCrudRepository<Book, UUID>, JpaSpecificationExecutor<Book> {

}