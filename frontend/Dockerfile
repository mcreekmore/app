FROM node:lts-alpine

# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'frontend' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

ENV VUE_APP_API_URL=server:3000

# build app for production with minification
RUN npm run build 

#EXPOSE 80
EXPOSE 3000
#CMD [ "http-server", "dist", "-p", "80" ]