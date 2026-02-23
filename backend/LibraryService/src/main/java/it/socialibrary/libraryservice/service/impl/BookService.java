package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.exceptions.NotFoundException;
import it.socialibrary.libraryservice.mappers.IBookMapper;
import it.socialibrary.libraryservice.repository.BookRepository;
import it.socialibrary.libraryservice.repository.specifications.BookSpecification;
import it.socialibrary.libraryservice.service.IBookService;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookService implements IBookService {

    private final BookRepository bookRepository;
    private final IBookMapper bookMapper;

    @Autowired
    public BookService(BookRepository bookRepository, CategoryService categoryService, IBookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }

    @Override
    public Page<BookDto> searchBookOnFilter(FiltersBookDto filters, Pageable pageable) {
        Specification<Book> spec = BookSpecification.searchBook(filters);

        return bookRepository.findAll(spec, pageable).map(bookMapper::toDTO);
    }

    @Override
    public BookDto findById(UUID id) throws NotFoundException {
        Optional<Book> book = this.bookRepository.findById(id);
        // Se il libro non esiste, lancio un'eccezione'
        book.orElseThrow(() -> new NotFoundException("Record not found"));

        return this.bookMapper.toDTO(book.get());
    }

    @Override
    public void save(BookDto bookDto) {
        this.bookRepository.save(this.bookMapper.toEntity(bookDto));
    }

    @Override
    public BookDto update(BookDto bookDto) {
        return null;
    }

    @Override
    public void delete(UUID id) {
        this.bookRepository.deleteById(id);
    }
}
