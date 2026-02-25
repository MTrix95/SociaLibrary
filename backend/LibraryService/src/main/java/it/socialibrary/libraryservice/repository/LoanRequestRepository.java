package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LoanRequestRepository extends ListCrudRepository<LoanRequest, UUID> {
    Page<LoanRequest> findByUserId(UUID userId, Pageable pageable);
    List<LoanRequest> findByBookId(UUID bookId);
}
