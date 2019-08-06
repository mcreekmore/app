FROM arm32v7/nginx
#alpine:3.7

#LABEL maintainer="NGINX Docker Maintainers <docker-maint@nginx.com>"

#ENV NGINX_VERSION 1.13.10

COPY nginx.conf /etc/nginx/nginx.conf
COPY backports.list /etc/apt/sources.list.d/

RUN apt-get update
RUN apt-get install certbot python-certbot-nginx -t stretch-backports -y
RUN certbot --nginx -y

#EXPOSE 80

#STOPSIGNAL SIGTERM

#CMD ["nginx", "-g", "daemon off;"]