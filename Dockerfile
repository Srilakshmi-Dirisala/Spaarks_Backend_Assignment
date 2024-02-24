# Use the official Node.js image with the desired version
FROM node:16


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 4500

# Command to run your application
CMD ["node", "server.js"]
ENV npm_config_build_from_source=false

