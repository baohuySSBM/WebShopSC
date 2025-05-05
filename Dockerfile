# Define base image
FROM node:21
# Create a directory for app files
WORKDIR /usr/src/app
# Copy package information files
COPY . .
# Copy app file to the container

# Expose port 80
EXPOSE 83
# Install all NodeJS dependencies
RUN npm install
# After container start, run app
CMD ["node", "server.js"]
