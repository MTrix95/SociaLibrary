package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.web.dto.CategoryStatsDto;
import it.socialibrary.libraryservice.web.dto.UserStatsDto;

import java.util.List;

public interface IStatsService {
    List<CategoryStatsDto> statsCategoryBooks();
    List<UserStatsDto> statsUsers();
}
