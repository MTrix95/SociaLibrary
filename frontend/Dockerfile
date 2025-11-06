FROM nginx:stable-alpine
COPY target/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]