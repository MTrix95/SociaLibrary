package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.web.dto.LoanRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface ILoanService {
    Page<LoanRequestDto> findByBook_UserIdAndStatus(UUID userID, LoanStatus status, Pageable pageable);
    Optional<LoanRequestDto> findByBook_IdAndStatus(UUID bookID, LoanStatus status);
}
