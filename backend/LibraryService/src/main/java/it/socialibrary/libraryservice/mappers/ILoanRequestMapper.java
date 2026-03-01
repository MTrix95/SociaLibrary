package it.socialibrary.libraryservice.mappers;

import it.socialibrary.libraryservice.entity.LoanRequest;
import it.socialibrary.libraryservice.web.dto.LoanRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ILoanRequestMapper extends IMapper<LoanRequest, LoanRequestDto> {
}
