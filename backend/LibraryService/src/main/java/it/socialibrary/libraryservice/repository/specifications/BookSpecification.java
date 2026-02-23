package it.socialibrary.libraryservice.repository.specifications;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.Category;
import it.socialibrary.libraryservice.web.dto.FiltersBookDto;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@UtilityClass
@Slf4j
public class BookSpecification {

    public static Specification<Book> searchBook(FiltersBookDto filters) {
        return (from, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Titolo
            if(StringUtils.hasText(filters.getTitle()))
                predicates.add(builder.like(builder.lower(from.get("title")), "%" + filters.getTitle().toLowerCase() + "%"));

            // Autore
            if (StringUtils.hasText(filters.getAuthor()))
                predicates.add(builder.like(builder.lower(from.get("author")), "%" + filters.getAuthor().toLowerCase() + "%"));

            // Categorie
            if (filters.getGenre() != null && !filters.getGenre().isEmpty()) {
                // Join con l'insieme dellecategorie
                Join<Book, Category> categoryJoin = from.join("categories");
                predicates.add(categoryJoin.get("name").in(filters.getGenre()));

                // Evita duplicati se un libro ha più categorie corrispondenti
                query.distinct(true);
            }

            // ISBN
            if (StringUtils.hasText(filters.getIsbn()))
                predicates.add(builder.equal(from.get("isbn"), filters.getIsbn()));


            // Data Pubblicazione
            if (filters.getPublishedDate() != null)
                predicates.add(builder.equal(from.get("datePublished"), filters.getPublishedDate()));

            // Editore
            if (StringUtils.hasText(filters.getPublisher()))
                predicates.add(builder.like(builder.lower(from.get("publisher")), "%" + filters.getPublisher().toLowerCase() + "%"));

            if(filters.getLatitude() != null && filters.getLongitude() != null && filters.getRadius() != null) {
                GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
                Point searchPoint = geometryFactory.createPoint(new Coordinate(filters.getLongitude(), filters.getLatitude()));

                int radiusInMeters = filters.getRadius() * 1000;

                // Creo la funzione per sapere la distanza tra due punti
                predicates.add(builder.isTrue(
                        builder.function("ST_DWithin",
                                Boolean.class,
                                from.get("location"),
                                builder.literal(searchPoint),
                                builder.literal(radiusInMeters)
                        )
                ));
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
