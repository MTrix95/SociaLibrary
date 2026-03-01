package it.socialibrary.libraryservice.service.impl;

import it.socialibrary.libraryservice.entity.Book;
import it.socialibrary.libraryservice.entity.BookImage;
import it.socialibrary.libraryservice.enums.ImageType;
import it.socialibrary.libraryservice.repository.BookImageRepository;
import it.socialibrary.libraryservice.service.IBookImageService;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BookImageService implements IBookImageService {

    private static final String PATH_FILE_IMAGES = System.getenv("SHARED_DATA");

    private final BookImageRepository bookImageRepository;

    @Value("${server.servlet.context-path}")
    private String urlPrexix;

    @Autowired
    public BookImageService(BookImageRepository bookImageRepository) {
        this.bookImageRepository = bookImageRepository;
    }

    @Override
    @Transactional
    public void createThumbnail(Book book, MultipartFile file) throws IOException {
        if(PATH_FILE_IMAGES == null) throw new IOException("Path file images not found");
        if(file == null || file.isEmpty()) return;

        String bookId = book.getId().toString();
        Path thumbnailDir = Paths.get(PATH_FILE_IMAGES, bookId, "thumbnail");

        // 1. PULISCO I VECCHI RECORD DI TIPO COVER
        bookImageRepository.deleteByBookAndType(book, ImageType.COVER);

        // 2. Se esistono le cartelle elimino in modo ricorsivo il file presenti nel FS
        if(Files.exists(thumbnailDir)) {
            FileSystemUtils.deleteRecursively(thumbnailDir);
        }
        // Ricreo l'alberatura delle cartelel
        Files.createDirectories(thumbnailDir);

        String fileName = "thumbnail.jpg";
        File destination = new File(thumbnailDir.toFile(), fileName);
        try(InputStream inputStream = file.getInputStream()) {
            // Genera la miniatura
            Thumbnails.of(inputStream).size(200, 200).toFile(destination);
        }

        String publicUrl = urlPrexix + "/images/" + bookId + "/thumbnail/" + fileName;

        BookImage bookImage = new BookImage();
        bookImage.setBook(book);
        bookImage.setUrlImage(publicUrl);
        bookImage.setType(ImageType.COVER);

        bookImageRepository.save(bookImage);
    }

    @Override
    @Transactional
    public void createPreview(Book book, List<MultipartFile> files) throws IOException {
        if (PATH_FILE_IMAGES == null) throw new IOException("Path file images not found");
        if (files == null || files.isEmpty()) return;

        String bookId = book.getId().toString();
        Path directory = Paths.get(PATH_FILE_IMAGES, bookId, "previews");

        // 1. PULISCO I VECCHI RECORD DI TIPO COVER
        bookImageRepository.deleteByBookAndType(book, ImageType.PREVIEW);

        // 2. Se esistono le cartelle elimino in modo ricorsivo il file presenti nel FS
        if(Files.exists(directory)) {
            FileSystemUtils.deleteRecursively(directory);
        }

        Files.createDirectories(directory);

        List<BookImage> bookImageList = new ArrayList<>(files.size());
        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            String fileName = UUID.randomUUID() + ".jpg";
            File destination = new File(directory.toFile(), fileName);

            try (InputStream is = file.getInputStream()) {
                Thumbnails.of(is)
                        .size(800, 800)
                        .keepAspectRatio(true)
                        .outputFormat("jpg")
                        .toFile(destination);
            }

            String publicUrl = urlPrexix + "/images/" + bookId + "/previews/" + fileName;

            BookImage bookImage = new BookImage();
            bookImage.setBook(book);
            bookImage.setUrlImage(publicUrl);
            bookImage.setType(ImageType.PREVIEW);

            bookImageList.add(bookImage);
        }
        bookImageRepository.saveAll(bookImageList);
    }
}
