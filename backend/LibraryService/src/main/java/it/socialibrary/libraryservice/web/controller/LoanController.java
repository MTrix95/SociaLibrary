package it.socialibrary.libraryservice.web.controller;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.service.ILoanService;
import it.socialibrary.libraryservice.service.impl.LoanService;
import it.socialibrary.libraryservice.web.dto.LoanRequestDto;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/loans")
class LoanController {

    private final ILoanService loanService;

    @Autowired
    LoanController(ILoanService loanService) {
        this.loanService = loanService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/books")
    public ResponseEntity<Page<LoanRequestDto>> find(
            @RequestParam("idUser") UUID idUser, @RequestParam(value = "status", required = false) LoanStatus status, Pageable pageable) {
        Page<LoanRequestDto> result = this.loanService.findByBook_UserIdAndStatus(idUser, status, pageable);
        return ResponseEntity.ok(result);
    }
}
