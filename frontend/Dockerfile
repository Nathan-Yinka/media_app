# Dockerfile for React Frontend with Vite

# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (Vite uses port 5173 by default)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
