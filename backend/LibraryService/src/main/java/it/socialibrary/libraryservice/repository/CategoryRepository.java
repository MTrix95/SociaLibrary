package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Category;
import it.socialibrary.libraryservice.web.dto.CategoryStatsDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends ListCrudRepository<Category, UUID> {

    @Query(value = """
            SELECT c.name, COUNT(bc.book_id) as total
            FROM categories c JOIN book_categories bc ON c.id = bc.category_id
            GROUP BY c.name
            """, nativeQuery = true)
    List<CategoryStatsDto> countBookByCategory();
}