package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.web.dto.CategoryDto;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ICategoryService {
    List<CategoryDto> findAll();
    Optional<CategoryDto> findById(UUID id);
}
