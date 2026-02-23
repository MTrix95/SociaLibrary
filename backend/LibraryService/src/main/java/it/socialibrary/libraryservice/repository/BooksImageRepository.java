package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.BooksImage;
import org.springframework.data.repository.ListCrudRepository;

import java.util.UUID;

public interface BooksImageRepository extends ListCrudRepository<BooksImage, UUID> {
}