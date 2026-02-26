package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.socialibrary.libraryservice.enums.LoanStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FiltersBookDto implements Serializable {
    private String title;
    private String author;
    private String genre;
    private String isbn;
    private String publisher;
    private LocalDate publishedDate;
    private LoanStatus status;
    private String userID;
    private Integer radius;
    private Double latitude;
    private Double longitude;
}
