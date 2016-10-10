FROM node:6.6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
#COPY node_modules /usr/src/app/node_modules
#use run npm install to install npm dependencies from previously copied package.json
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Bundle app source
#COPY ./api /usr/src/app/api
#COPY ./static /usr/src/app/static
#COPY ./config /usr/src/app/config
#COPY ./app.js /usr/src/app/
#COPY ./server.js /usr/src/app/

EXPOSE 8080

#CMD [ "npm", "start" ]
CMD [ "node", "mybot.js" ]