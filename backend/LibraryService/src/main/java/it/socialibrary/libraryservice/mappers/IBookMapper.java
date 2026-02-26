package it.socialibrary.libraryservice.mappers;


import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.enums.LoanStatus;
import it.socialibrary.libraryservice.web.dto.BookDto;
import jakarta.validation.constraints.NotNull;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface IBookMapper extends IGeometryMapper<Book, BookDto>{
    @Mapping(target = "longitude", expression = "java(lon(book.getLocation()))")
    @Mapping(target = "latitude", expression = "java(lat(book.getLocation()))")
    @Mapping(source = "loanRequests", target = "status")
    @Mapping(source = "loanRequests", target = "lastDateStatus")
    BookDto toDTO(Book book);

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
