# Stage 1: Build the Next.js app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps \
    && npm install axios

# Copy rest of the source code
COPY . .

# Build the Next.js app and export static files
RUN npm run build && npm run export

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy exported static files from previous stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose default port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
