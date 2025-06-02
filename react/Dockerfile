# Use specific Node version
FROM node:20.19.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Run dev server
CMD ["npm", "run", "dev"]
