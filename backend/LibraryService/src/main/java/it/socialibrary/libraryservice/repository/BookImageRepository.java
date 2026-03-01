package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.BookImage;
import it.socialibrary.libraryservice.enums.ImageType;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.lang.Nullable;

import java.util.UUID;

public interface BookImageRepository extends ListCrudRepository<BookImage, UUID> {
    BookImage findByBook_IdAndType(UUID id, @Nullable ImageType type);
    void deleteByBookAndType(Book book, ImageType type);
}