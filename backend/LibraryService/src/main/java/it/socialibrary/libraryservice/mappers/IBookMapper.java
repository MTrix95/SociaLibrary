package it.socialibrary.libraryservice.mappers;


import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.Category;
import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.web.dto.BookDto;
import jakarta.validation.constraints.NotNull;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface IBookMapper extends IGeometryMapper<Book, BookDto>{
    @Mapping(target = "longitude", expression = "java(lon(book.getLocation()))")
    @Mapping(target = "latitude", expression = "java(lat(book.getLocation()))")
    @Mapping(source = "loanRequests", target = "status")
    @Mapping(source = "loanRequests", target = "lastDateStatus")
    @Mapping(source = "categories", target = "categories")
    BookDto toDTO(Book book);

    default Set<UUID> categoriesID(Set<Category> categories) {
        if(categories == null || categories.isEmpty()) return new HashSet<>();
        return categories.stream().map(Category::getId).collect(Collectors.toSet());
    }

    default Set<Category> toCategory(Set<UUID> idsCategorie) {
        if(idsCategorie == null || idsCategorie.isEmpty()) return new HashSet<>();
        return idsCategorie.stream().map(id -> {
            Category cat = new Category();
            cat.setId(id);

            return cat;
        }).collect(Collectors.toSet());
    }

    default LoanStatus lastRequest(Set<LoanRequest> requests) {
        if(requests == null || requests.isEmpty()) return null; // Nessuna richiesta


        return requests.stream()
                .max(Comparator.comparing(LoanRequest::getStatusDate))
                .map(LoanRequest::getStatus)
                .orElse(null);
    }

    default OffsetDateTime lastDateRequest(Set<LoanRequest> requests) {
        if(requests == null || requests.isEmpty()) return null; // Nessuna richiesta


        return requests.stream()
                .max(Comparator.comparing(LoanRequest::getStatusDate))
                .map(LoanRequest::getStatusDate)
                .orElse(null);
    }
}
