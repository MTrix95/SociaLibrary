FROM maven:eclipse-temurin

WORKDIR /app

COPY pom.xml ./
COPY LibraryService/ ./LibraryService/

WORKDIR /app/LibraryService
EXPOSE 8080 5005


ENTRYPOINT ["mvn", "spring-boot:run", "-DskipTests"]