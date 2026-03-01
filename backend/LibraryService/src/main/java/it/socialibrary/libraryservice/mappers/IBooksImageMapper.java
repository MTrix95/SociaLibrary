package it.socialibrary.libraryservice.mappers;

import it.socialibrary.libraryservice.entity.BookImage;
import it.socialibrary.libraryservice.web.dto.BookImageDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface IBooksImageMapper extends IMapper<BookImage, BookImageDto> {
}
