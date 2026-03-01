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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/books")
class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<BookDto>> searchOnFilter(
            @PageableDefault(size = 5) Pageable pageable,
            @RequestBody FiltersBookDto filters) {
        Page<BookDto> result = this.bookService.searchBookOnFilter(filters, pageable);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookDto> findById(@PathVariable("id") final UUID id) {
        BookDto result = this.bookService.findById(id);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<BookDto>> findByUser(
            @PathVariable("id") final UUID id,
            @PageableDefault Pageable pageable) {
        Page<BookDto> result = this.bookService.findByUser(id, pageable);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> create(
            @AuthenticationPrincipal Jwt jwt,
            @RequestPart("book") BookDto value,
            @RequestPart(value = "cover", required = false) MultipartFile cover,
            @RequestPart(value = "previews", required = false) List<MultipartFile> previews) throws IOException {
        // Aggiungo l'ID utente
        String userId = jwt.getSubject();
        value.setUserId(UUID.fromString(userId));

        this.bookService.save(value, cover, previews);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> delete(@PathVariable("id") final UUID id) {
        this.bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
