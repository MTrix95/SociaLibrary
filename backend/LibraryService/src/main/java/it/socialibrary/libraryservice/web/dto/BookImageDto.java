package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.socialibrary.libraryservice.entity.BookImage;
import it.socialibrary.libraryservice.enums.ImageType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link BookImage}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookImageDto implements Serializable {
    private UUID id;
    private String urlImage;
    private ImageType type;
}