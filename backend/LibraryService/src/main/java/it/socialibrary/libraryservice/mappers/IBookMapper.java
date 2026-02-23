package it.socialibrary.libraryservice.mappers;


import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.web.dto.BookDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface IBookMapper extends IGeometryMapper<Book, BookDto>{
    @Mapping(target = "longitude", expression = "java(lon(book.getLocation()))")
    @Mapping(target = "latitude", expression = "java(lat(book.getLocation()))")
    BookDto toDTO(Book book);
}
