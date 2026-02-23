package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;


public interface IBookService {
    Page<BookDto> searchBookOnFilter(FiltersBookDto filters, Pageable pageable);
    BookDto findById(UUID id);
    void save(BookDto bookDto);
    BookDto update(BookDto bookDto);
    void delete(UUID id);
}
