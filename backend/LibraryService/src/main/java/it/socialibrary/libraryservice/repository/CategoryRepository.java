package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;

import java.util.UUID;

public interface CategoryRepository extends ListCrudRepository<Category, UUID> {
}