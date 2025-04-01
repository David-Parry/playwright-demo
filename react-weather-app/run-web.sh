#!/bin/bash

docker build -t weather-example .


#docker run --name weather-example -d -p 8040:4000 -v /Users/davidparry/code/github/react-weather-app:/app weather-example

docker run --name weather-example -d -p 8040:4000 weather-example


#docker run --name weather-example -d -p 8040:4000 -v /Users/davidparry/code/github/react-weather-app:/app node:18-alpine sh -c "npm install && npm run start"