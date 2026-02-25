package it.socialibrary.libraryservice.mappers;

import org.springframework.data.domain.Page;

import java.util.List;

public interface IMapper<E, D> {
    /**
     * Converte una entity in un Data Trasfer Object (DTO).
     *
     * @param entity l'entity da convertire
     * @return il DTO convertito
     */
    D toDTO(E entity);

    /**
     * Converti un Data Transfer Object (DTO) in un entity.
     *
     * @param dto Il DTO da convertire
     * @return l'entity convertita
     */
    E toEntity(D dto);

    /**
     * Converte una lista di di DTO in una lista di Entity
     *
     * @param entities la lista di DTO da convertire
     * @return la lista di Entity convertita
     */
    List<D> toDTOs(List<E> entities);

    /**
     * Converte una lista di Entity in una lista di DTO
     *
     * @param dtos La lista di DTO da convertire
     * @return La lista di Enitity convertita
     */
    List<E> toEntities(List<D> dtos);
}
