FROM openjdk:21-rc-jdk-oracle
WORKDIR /app
COPY /target/GatewayService.jar /app/GatewayService.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "GatewayService.jar"]