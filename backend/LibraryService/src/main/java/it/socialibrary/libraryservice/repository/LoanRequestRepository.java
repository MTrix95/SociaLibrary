package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface LoanRequestRepository extends ListCrudRepository<LoanRequest, UUID> {
    Page<LoanRequest> findByBook_UserIdAndStatus(UUID userId, @Nullable LoanStatus status, Pageable pageable);

    Optional<LoanRequest> findByBook_IdAndStatus(UUID id, LoanStatus status);
}
