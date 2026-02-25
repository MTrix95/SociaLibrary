package it.socialibrary.libraryservice.web.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class BookImageController {

    private static final String PATH_FILE_IMAGES = System.getenv("SHARED_DATA");

    @GetMapping("/{idBook}/{filename:.+}")
    public ResponseEntity<Resource> getImage(
            @PathVariable("idBook") UUID idBook,
            @PathVariable("filename") String filename) throws MalformedURLException {

        if (PATH_FILE_IMAGES == null) {
            return ResponseEntity.internalServerError().build();
        }

        try {
            Path path = Paths.get(PATH_FILE_IMAGES).resolve(idBook.toString()).resolve(filename).normalize();
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header("Access-Control-Allow-Origin", "*")
                        .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
