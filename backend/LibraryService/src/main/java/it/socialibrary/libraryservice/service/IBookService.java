package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.exceptions.NotFoundException;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.UUID;


public interface IBookService {
    Page<BookDto> searchBookOnFilter(FiltersBookDto filters, Pageable pageable);
    BookDto findById(UUID id) throws NotFoundException;
    Page<BookDto> findByUser(UUID userId, Pageable pageable);
    void save(BookDto bookDto) throws IOException;
    BookDto update(BookDto bookDto);
    void delete(UUID id) throws NotFoundException;
}
