FROM arm32v7/nginx
#alpine:3.7

#LABEL maintainer="NGINX Docker Maintainers <docker-maint@nginx.com>"

#ENV NGINX_VERSION 1.13.10

COPY nginx.conf /etc/nginx/nginx.conf

RUN sudo apt-get install certbot python-certbot-nginx -y
RUN sudo certbot --nginx -y

#EXPOSE 80

#STOPSIGNAL SIGTERM

#CMD ["nginx", "-g", "daemon off;"]