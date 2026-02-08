package it.socialibrary.administratorservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan( basePackages =
        { "it.socialibrary.administratorservice.entity" }
)
@EnableJpaRepositories( basePackages =
        { "it.socialibrary.administratorservice.repository" }
)
public class AdministratorServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministratorServiceApplication.class, args);
    }

}
