# baseimage to build from
# all images: https://hub.docker.com/
FROM node:alpine

# set working directory for the following commands
WORKDIR /usr/src/demoserver

# add node binaries to path
ENV PATH ./node_modules/.bin:$PATH

# install node modules
COPY package*.json ./
RUN npm install

# copy sourcecode
COPY . .

# start server
CMD nodemon server.js
