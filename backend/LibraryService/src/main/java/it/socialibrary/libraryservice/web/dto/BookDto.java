package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO del libro
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookDto implements Serializable {

    private UUID id;

    @NotNull(message = "Il campo titolo è obbligatorio")
    @Size(message = "Hai superato il limite per il campo titolo", min = 1, max = 255)
    private String title;

    @NotNull(message = "Il campo autore è obbligatorio")
    @Size(message = "Hai superato il limite per il campo autore", min = 1, max = 255)
    private String author;

    @NotNull(message = "Il campo ISBN è obbligatorio")
    private BigDecimal isbn;

    @Size(max = 255)
    private String description;

    private LocalDate datePublished;

    @Size(max = 255)
    private String publisher;

    private Point location;

    private UUID userId;
}