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
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookService implements IBookService {

    private final BookRepository bookRepository;

    private final BookImageService bookImageService;
    private final IBookMapper bookMapper;

    @Autowired
    public BookService(BookRepository bookRepository, BookImageService bookImageService, IBookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookImageService = bookImageService;
        this.bookMapper = bookMapper;
    }

    /**
     * Ricerca di libri in base ai filtri forniti.
     * @param filters Filtri
     * @param pageable Paginazione
     * @return Lista di libri filtrati
     */
    @Override
    public Page<BookDto> searchBookOnFilter(FiltersBookDto filters, Pageable pageable) {
        Specification<Book> spec = BookSpecification.searchBook(filters);

        if(filters.getLongitude() != null && filters.getLatitude() != null && filters.getRadius() != null) {
            try {
                int radiusInMeters = filters.getRadius() * 1000;

                // Ricerco gli ID dei libri che si trovano all'interno di un certo raggio in base alle coordinate fornite
                List<UUID> findIdsForDistance = this.bookRepository.findDistance(
                        filters.getLongitude(), filters.getLatitude(), radiusInMeters);

                if(findIdsForDistance.isEmpty()) return Page.empty(pageable);

                // Aggiungo la condizione di ricerca dei libri trovati all'interno del raggio'
                spec = spec.and(((root, cq, cb) ->
                        root.get("id").in(findIdsForDistance))
                );
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid coordinates or radius");
            }
        }

        return bookRepository.findAll(spec, pageable).map(bookMapper::toDTO);
    }

    @Override
    public BookDto findById(UUID id) throws NotFoundException {
        Optional<Book> book = this.bookRepository.findById(id);
        if(book.isEmpty()) throw new NotFoundException("Record not found");

        return this.bookMapper.toDTO(book.get());
    }

    @Override
    public Page<BookDto> findByUser(UUID userId, Pageable pageable) {
        Page<Book> book = this.bookRepository.findByUserId(userId, pageable);
        return book.map(this.bookMapper::toDTO);
    }


    @Override
    @Transactional
    public void save(BookDto bookDto) throws IOException {
        Book book = this.bookMapper.toEntity(bookDto);
        this.bookRepository.save(book);

        // TODO: GESTIONE DELLE IMMAGINI
        this.bookImageService.createThumbnail(book, null);
        this.bookImageService.createPreview(book, null);
    }

    @Override
    @Transactional
    public BookDto update(BookDto bookDto) {
        Book book = this.bookMapper.toEntity(bookDto);
        this.bookRepository.save(book);

        return findById(bookDto.getId());
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        if(!this.bookRepository.existsById(id)) throw new NotFoundException("Record not found");

        this.bookRepository.deleteById(id);
    }
}
