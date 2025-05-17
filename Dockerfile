# ----------- Build Stage ------------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the source files
COPY . .

# Build the app
RUN npm run build

# ----------- Serve Stage ------------
FROM nginx:alpine

# Clean default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy custom nginx config if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
