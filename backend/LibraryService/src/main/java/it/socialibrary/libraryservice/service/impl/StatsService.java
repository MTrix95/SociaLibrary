package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.repository.CategoryRepository;
import it.socialibrary.libraryservice.service.IStatsService;
import it.socialibrary.libraryservice.web.dto.CategoryStatsDto;
import it.socialibrary.libraryservice.web.dto.UserStatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService implements IStatsService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public StatsService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryStatsDto> statsCategoryBooks() {
        return categoryRepository.countBookByCategory();
    }

    @Override
    public List<UserStatsDto> statsUsers() {
        return List.of();
    }
}
