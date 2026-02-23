package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.entity.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> findAll();
}
