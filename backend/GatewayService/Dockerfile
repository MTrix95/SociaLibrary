#STAGE 2: START
FROM openjdk:21-rc-jdk-oracle
WORKDIR ./app
COPY ./target/GatewayService.jar ./app/GatewayService.jar

ENTRYPOINT ["java", "-jar", "GatewayService.jar"]