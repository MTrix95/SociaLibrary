package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.LoanRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.UUID;

public interface LoanRequestRepository extends ListCrudRepository<LoanRequest, UUID> {
    Page<LoanRequest> findByUserId(UUID userId, Pageable pageable);
}
