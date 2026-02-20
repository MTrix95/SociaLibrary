package it.socialibrary.libraryservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class BookCategoryId implements Serializable {
    @Serial
    private static final long serialVersionUID = -9220531742056801289L;

    @NotNull
    @Column(name = "book_id", nullable = false)
    private UUID bookId;

    @NotNull
    @Column(name = "category_id", nullable = false)
    private UUID categoryId;
}