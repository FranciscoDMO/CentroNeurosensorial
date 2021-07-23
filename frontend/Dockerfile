# pull official base image
FROM node:13.12.0-alpine

EXPOSE 3000

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 

# add app
COPY . /app

# start app
CMD ["npm", "start"]