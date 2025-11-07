FROM openjdk:21-rc-jdk-oracle
WORKDIR ./app
COPY ./target/LibraryService.jar ./app/LibraryService.jar

ENTRYPOINT ["java", "-jar", "LibraryService.jar"]