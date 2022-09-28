# Stage 1: build dist
FROM node:lts-alpine as builder

# make the 'frontend' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# ENV VUE_APP_API_URL=server:3000

# build app for production with minification
RUN npm run build 

# Stage 2: deploy with NGINX
FROM nginx:1.23.1-alpine

COPY --from=builder /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]