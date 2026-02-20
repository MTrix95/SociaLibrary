package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.BookCategory;
import it.socialibrary.libraryservice.entity.BookCategoryId;
import org.springframework.data.repository.CrudRepository;

public interface BookCategoryRepository extends CrudRepository<BookCategory, BookCategoryId> {
}