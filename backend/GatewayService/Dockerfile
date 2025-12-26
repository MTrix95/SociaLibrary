# Stage 1: Compilazione
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copio il pom padre i file del GatewayService
COPY pom.xml ./
COPY GatewayService/ ./GatewayService/

# Compilo con maven e genero il JAR
WORKDIR /app/GatewayService/
RUN mvn clean package

# Stage 2: Esecuzione
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copio il file generato dallo stage 1
COPY --from=build /app/GatewayService/target/*.jar GatewayService.jar

EXPOSE 8083
ENTRYPOINT ["java", "-jar", "GatewayService.jar"]