package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.LoanRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface LoanRequestRepository extends CrudRepository<LoanRequest, UUID> {

}