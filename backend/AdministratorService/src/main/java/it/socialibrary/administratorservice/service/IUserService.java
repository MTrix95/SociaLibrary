package it.socialibrary.administratorservice.service;

import it.socialibrary.administratorservice.entity.User;
import it.socialibrary.administratorservice.exceptions.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

public interface IUserService {
    void saveFromJwt(Jwt jwt) throws NotFoundException;

    Page<User> findAll(Pageable pageable);

    User findById(UUID idUser) throws NotFoundException;
}
