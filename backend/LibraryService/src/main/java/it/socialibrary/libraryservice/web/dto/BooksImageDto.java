package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.socialibrary.libraryservice.entity.BooksImage;
import it.socialibrary.libraryservice.enums.ImageType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link BooksImage}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BooksImageDto implements Serializable {
    @NotNull
    private UUID id;
    @NotNull
    private BookDto book;
    private UUID urlImage;
    private ImageType type;
}