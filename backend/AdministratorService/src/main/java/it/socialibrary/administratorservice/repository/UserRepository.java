package it.socialibrary.administratorservice.repository;

import it.socialibrary.administratorservice.entity.User;
import it.socialibrary.administratorservice.web.dto.UserStatsDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends ListCrudRepository<User, UUID>, PagingAndSortingRepository<User, UUID> {
    @Query(value = """
        SELECT CAST(created_at AS DATE) AS date, COUNT(*) AS count
        FROM users
        GROUP BY CAST(created_at AS DATE)
            ORDER BY date
    """, nativeQuery = true)
    List<UserStatsDto> getUserRegistrationStats();
}