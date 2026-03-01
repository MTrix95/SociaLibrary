package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.mappers.ICategoryMapper;
import it.socialibrary.libraryservice.repository.CategoryRepository;
import it.socialibrary.libraryservice.service.ICategoryService;
import it.socialibrary.libraryservice.web.dto.CategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final ICategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ICategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDTO).toList();
    }

    @Override
    public Optional<CategoryDto> findById(UUID id) {
        return this.categoryRepository.findById(id).map(categoryMapper::toDTO);
    }
}
