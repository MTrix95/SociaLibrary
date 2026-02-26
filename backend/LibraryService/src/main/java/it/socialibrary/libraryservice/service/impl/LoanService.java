package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.mappers.ILoanRequestMapper;
import it.socialibrary.libraryservice.repository.LoanRequestRepository;
import it.socialibrary.libraryservice.service.ILoanService;
import it.socialibrary.libraryservice.web.dto.LoanRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LoanService implements ILoanService {

    private final LoanRequestRepository loanRequestRepository;
    private final ILoanRequestMapper loanRequestMapper;

    @Autowired
    public LoanService(LoanRequestRepository loanRequestRepository, ILoanRequestMapper iLoanRequestMapper, ILoanRequestMapper loanRequestMapper) {
        this.loanRequestRepository = loanRequestRepository;
        this.loanRequestMapper = loanRequestMapper;
    }

    @Override
    public Page<LoanRequestDto> findByBook_UserIdAndStatus(UUID userID, LoanStatus status, Pageable pageable) {
        Page<LoanRequest> loanRequest = this.loanRequestRepository.findByBook_UserIdAndStatus(userID, status, pageable);

        return loanRequest.map(loanRequestMapper::toDto);
    }
}
