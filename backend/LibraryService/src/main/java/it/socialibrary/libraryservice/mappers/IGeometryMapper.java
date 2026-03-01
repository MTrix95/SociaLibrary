package it.socialibrary.libraryservice.mappers;

import org.locationtech.jts.geom.Point;
import org.mapstruct.Named;

public interface IGeometryMapper<E, DTO> extends IMapper<E, DTO> {
    default Double lon(Point point) {
        return (point != null) ? point.getX() : null;
    }
    default Double lat(Point point) {
        return (point != null) ? point.getY() : null;
    }
}
