package it.socialibrary.administratorservice.web.controller;

import it.socialibrary.administratorservice.entity.User;
import it.socialibrary.administratorservice.service.impl.UserService;
import it.socialibrary.administratorservice.web.dto.UserStatsDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/users")
class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<User>> findAll(final Pageable pageable) {
        log.debug("Request to get all users {}", pageable);

        Page<User> pages = userService.findAll(pageable);
        return ResponseEntity.ok(pages);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> findById(@PathVariable("id") final UUID id) {
        log.debug("Request to get users by ID {}", id);

        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping(value = "/stats", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserStatsDto>> findUserStats() {
        List<UserStatsDto> userStats = userService.findUserStats();
        return ResponseEntity.ok(userStats);
    }
}
