package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.socialibrary.libraryservice.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link Category}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoryDto implements Serializable {

    private UUID id;

    private String name;
}