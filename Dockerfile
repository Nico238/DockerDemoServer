# baseimage to build from
# all images: https://hub.docker.com/
FROM node:latest

# set working directory for the following commands
WORKDIR /usr/src/demoserver

# install node modules
COPY package*.json ./
RUN npm install

# copy sourcecode
COPY . .

# expose required ports
EXPOSE 3000

# start server
CMD ["node", "server.js"]

# build image from dockerfile: 
# docker build .

# create and run container from image:
# docker run --publish [HOSTPORT]:[IMAGEPORT] --detach --name [CONTAINERNAME] [IMAGENAME / IMAGE_ID]

# stop docker container:
# docker stop [CONTAINER_ID]
