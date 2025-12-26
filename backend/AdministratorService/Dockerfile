FROM maven:eclipse-temurin

WORKDIR /app

COPY pom.xml ./
COPY AdministratorService/ ./AdministratorService/

WORKDIR /app/AdministratorService
EXPOSE 8080 5005


ENTRYPOINT ["mvn", "spring-boot:run", "-DskipTests"]