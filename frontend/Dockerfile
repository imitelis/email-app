# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.13.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Install node modules
COPY package.json .
RUN npm install

# Copy application code
COPY . .

# Create application build
RUN npm run build

# Start the server by default, this can be overwritten at runtime
EXPOSE 8080
CMD [ "npm", "run", "preview" ]