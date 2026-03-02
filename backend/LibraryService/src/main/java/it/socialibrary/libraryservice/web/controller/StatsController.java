package it.socialibrary.libraryservice.web.controller;

import it.socialibrary.libraryservice.service.IStatsService;
import it.socialibrary.libraryservice.service.impl.StatsService;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.CategoryStatsDto;
import it.socialibrary.libraryservice.web.dto.UserStatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stats")
public class StatsController {

    private final IStatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(value = "/categories-distribution", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CategoryStatsDto>> getDistribution() {
        List<CategoryStatsDto> result = this.statsService.statsCategoryBooks();
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/user-distribution", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserStatsDto>> getUserDistribution() {
        return  ResponseEntity.ok(null);
    }
}
