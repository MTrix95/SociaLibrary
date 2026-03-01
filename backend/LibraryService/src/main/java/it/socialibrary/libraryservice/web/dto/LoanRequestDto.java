package it.socialibrary.libraryservice.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import it.socialibrary.libraryservice.enums.LoanStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * DTO for {@link it.socialibrary.libraryservice.entity.LoanRequest}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoanRequestDto implements Serializable {
    private UUID id;
    private LoanStatus status;
    private OffsetDateTime requestDate;
}