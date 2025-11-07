#STAGE 2: START
FROM openjdk:21-rc-jdk-oracle
WORKDIR ./app
COPY ./target/AdministratorService.jar ./app/AdministratorService.jar

ENTRYPOINT ["java", "-jar", "AdministratorService.jar"]