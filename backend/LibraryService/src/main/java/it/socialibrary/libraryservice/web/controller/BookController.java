package it.socialibrary.libraryservice.web.controller;

import it.socialibrary.libraryservice.service.impl.BookService;
import it.socialibrary.libraryservice.web.dto.BookDto;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/books")
class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<BookDto>> searchOnFilter(
            @PageableDefault(size = 5) Pageable pageable,
            @RequestBody FiltersBookDto filters) {
        Page<BookDto> result = this.bookService.searchBookOnFilter(filters, pageable);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<BookDto>> findById(@PathVariable("id") final UUID id) {
        return ResponseEntity.ok(null);
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> create(@RequestBody BookDto value) {
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    @PutMapping("/")
    public ResponseEntity<BookDto> update(@RequestBody BookDto value) {
        return ResponseEntity.ok(null);
    }

    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") final UUID id) {
        return ResponseEntity.noContent().build();
    }
}
