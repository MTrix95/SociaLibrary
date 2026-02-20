package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CategoryRepository extends CrudRepository<Category, UUID> {
}