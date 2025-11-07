#STAGE 1: Builder
FROM maven:3.9-eclipse-temurin-21 AS builder
#CREO LA CARTELLA APP
WORKDIR /app
COPY ${HOME}/.m2/. /app

RUN mvn clean package -DskipTests

#STAGE 2: START
FROM openjdk:21-rc-jdk-oracle
WORKDIR /app
# Copio il jar una volta che è stato compilato
COPY --from=builder /app/target/GatewayService.jar GatewayService.jar

ENTRYPOINT ["java", "-jar", "GatewayService.jar"]