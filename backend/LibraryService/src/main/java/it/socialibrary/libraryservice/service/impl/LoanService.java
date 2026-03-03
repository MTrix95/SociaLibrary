package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.exceptions.LibraryException;
import it.socialibrary.libraryservice.mappers.IBookMapper;
import it.socialibrary.libraryservice.mappers.ILoanRequestMapper;
import it.socialibrary.libraryservice.repository.LoanRequestRepository;
import it.socialibrary.libraryservice.service.IBookService;
import it.socialibrary.libraryservice.service.ILoanService;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.LoanRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoanService implements ILoanService {

    private final LoanRequestRepository loanRequestRepository;
    private final IBookService bookService;
    private final ILoanRequestMapper loanRequestMapper;
    private final IBookMapper bookMapper;

    @Autowired
    public LoanService(LoanRequestRepository loanRequestRepository, ILoanRequestMapper iLoanRequestMapper, IBookService bookService, ILoanRequestMapper loanRequestMapper, IBookMapper bookMapper) {
        this.loanRequestRepository = loanRequestRepository;
        this.bookService = bookService;
        this.loanRequestMapper = loanRequestMapper;
        this.bookMapper = bookMapper;
    }

    /**
     * Saves loan request for book after ownership validation
     */
    @Override
    public void saveLoanRequest(LoanRequestDto request, UUID userID) {
        BookDto book = this.bookService.findById(request.getBookID());
        if(book.getUserId().equals(userID)) throw new LibraryException("Il libro appartiene alla tua libreria personale");

        boolean hasPendingRequest = loanRequestRepository.findByBook_IdAndStatus(book.getId(), LoanStatus.PENDING).isPresent();
        boolean hasAcceptedRequest = loanRequestRepository.findByBook_IdAndStatus(book.getId(), LoanStatus.ACCEPTED).isPresent();

        if (hasPendingRequest || hasAcceptedRequest)
            throw new LibraryException("Impossibile effettuare il prestito: esistono richieste di prestito in corso (PENDING o ACCEPTED).");

        LoanRequest entity = new LoanRequest();
        entity.setBook(bookMapper.toEntity(book));
        entity.setUserId(userID);
        entity.setStatusDate(OffsetDateTime.now());
        this.loanRequestRepository.save(entity);
    }

    @Override
    public Page<LoanRequestDto> findByBook_UserIdAndStatus(UUID userID, LoanStatus status, Pageable pageable) {
        Page<LoanRequest> loanRequest = this.loanRequestRepository.findByBook_UserIdAndStatus(userID, status, pageable);
        return loanRequest.map(loanRequestMapper::toDTO);
    }

    @Override
    public Optional<LoanRequestDto> findByBook_IdAndStatus(UUID bookID, LoanStatus status) {
        return loanRequestRepository.findByBook_IdAndStatus(bookID, status)
                .map(loanRequestMapper::toDTO);
    }
}
