package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.exceptions.NotFoundException;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;


public interface IBookService {
    Page<BookDto> searchBookOnFilter(FiltersBookDto filters, Pageable pageable);
    BookDto findById(UUID id) throws NotFoundException;
    Page<BookDto> findByUser(UUID userId, Pageable pageable);
    void save(BookDto bookDto, MultipartFile cover, List<MultipartFile> previews) throws IOException;
    void delete(UUID id) throws NotFoundException;
}
