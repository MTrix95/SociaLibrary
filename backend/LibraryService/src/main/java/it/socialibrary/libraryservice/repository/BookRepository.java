package it.socialibrary.libraryservice.repository;

import it.socialibrary.libraryservice.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository extends ListCrudRepository<Book, UUID>, JpaSpecificationExecutor<Book> {

    @Query(value = """
                SELECT b.*
                FROM books b 
                WHERE public.ST_DWithin(
                  b.location::public.geography,
                  public.ST_Transform(
                    public.ST_SetSRID(public.ST_MakePoint(:lon, :lat), 3857),
                              4326
                  )::public.geography,
                  :distance
                )
            """, nativeQuery = true)
    List<UUID> findDistance(@Param("lon") Double longitude, @Param("lat") Double latitude, @Param("distance") Integer distance);

    Page<Book> findByUserId(UUID userId, Pageable pageable);
}