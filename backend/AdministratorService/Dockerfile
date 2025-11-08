#STAGE 2: START
FROM openjdk:21-rc-jdk-oracle
WORKDIR /app
COPY /target/AdministratorService.jar /app/AdministratorService.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "AdministratorService.jar"]