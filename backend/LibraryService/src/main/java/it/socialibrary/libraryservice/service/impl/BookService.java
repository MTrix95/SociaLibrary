package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.Category;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.exceptions.LibraryException;
import it.socialibrary.libraryservice.exceptions.NotFoundException;
import it.socialibrary.libraryservice.mappers.IBookMapper;
import it.socialibrary.libraryservice.mappers.ICategoryMapper;
import it.socialibrary.libraryservice.repository.BookRepository;
import it.socialibrary.libraryservice.repository.CategoryRepository;
import it.socialibrary.libraryservice.repository.LoanRequestRepository;
import it.socialibrary.libraryservice.repository.specifications.BookSpecification;
import it.socialibrary.libraryservice.service.IBookImageService;
import it.socialibrary.libraryservice.service.IBookService;
import it.socialibrary.libraryservice.service.ICategoryService;
import it.socialibrary.libraryservice.service.ILoanService;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService implements IBookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final LoanRequestRepository loanRepository;

    private final IBookImageService bookImageService;
    private final IBookMapper bookMapper;

    @Autowired
    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository, IBookImageService bookImageService, LoanRequestRepository loanRepository, IBookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.bookImageService = bookImageService;
        this.loanRepository = loanRepository;
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
    public void save(BookDto bookDto, MultipartFile cover, List<MultipartFile> previews) throws IOException {
        Book book = this.bookMapper.toEntity(bookDto);

        // 1: Creo le coordinate
        if(bookDto.getLatitude() != null && bookDto.getLongitude() != null) {
            GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

            // Creo il punto da inviare al DB
            Point point = geometryFactory.createPoint(new Coordinate(bookDto.getLongitude(), bookDto.getLatitude()));
            book.setLocation(point);
        }

        // 2: Creo l'associazione N:N tra book e categories
        if(bookDto.getCategories() != null && !bookDto.getCategories().isEmpty()) {
            Set<Category> categories = bookDto.getCategories().stream()
                    .map(id ->
                            categoryRepository.findById(id).orElseThrow()
                    )
                    .collect(Collectors.toSet());

            book.setCategories(categories);
        }

        // 3: Salvo il libro
        this.bookRepository.save(book);

        // 4: Salvo la copertina
        this.bookImageService.createThumbnail(book, cover);

        // 5: Savlo le anteprime
        this.bookImageService.createPreview(book, previews);
    }

    @Override
    @Transactional
    public void delete(UUID id) throws NotFoundException {
        if(!this.bookRepository.existsById(id)) throw new NotFoundException("Record not found");

        if (this.loanRepository.findByBook_IdAndStatus(id, LoanStatus.PENDING).isPresent()
                || this.loanRepository.findByBook_IdAndStatus(id, LoanStatus.ACCEPTED).isPresent()) {
            throw new LibraryException("Impossibile eliminare il libro: esistono richieste di prestito in corso (PENDING o ACCEPTED).");
        }

        this.bookRepository.deleteById(id);
    }
}
