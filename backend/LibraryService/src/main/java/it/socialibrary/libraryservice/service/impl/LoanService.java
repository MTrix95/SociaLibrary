package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.exceptions.LibraryException;
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

import java.util.Optional;
import java.util.UUID;

@Service
public class LoanService implements ILoanService {

    private final LoanRequestRepository loanRequestRepository;
    private final IBookService bookService;
    private final ILoanRequestMapper loanRequestMapper;

    @Autowired
    public LoanService(LoanRequestRepository loanRequestRepository, ILoanRequestMapper iLoanRequestMapper, IBookService bookService, ILoanRequestMapper loanRequestMapper) {
        this.loanRequestRepository = loanRequestRepository;
        this.bookService = bookService;
        this.loanRequestMapper = loanRequestMapper;
    }

    @Override
    public void saveLoanRequest(LoanRequestDto request, UUID userID) {
        BookDto book = this.bookService.findById(request.getId());
        if(book.getUserId().equals(userID)) throw new LibraryException("Il libro appartiene alla tua libreria personale");

        LoanRequest entity = loanRequestMapper.toEntity(request);
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
