package it.socialibrary.libraryservice.service;

import it.socialibrary.libraryservice.entity.Book;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IBookImageService {
    void createThumbnail(Book book, MultipartFile file) throws IOException;
    void createPreview(Book book, List<MultipartFile> file) throws IOException;
}
