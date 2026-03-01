package it.socialibrary.libraryservice.mappers;

import it.socialibrary.libraryservice.entity.Category;
import it.socialibrary.libraryservice.web.dto.CategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ICategoryMapper extends IMapper<Category, CategoryDto> {
}
