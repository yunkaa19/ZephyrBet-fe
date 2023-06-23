FROM node

WORKDIR /usr/src/app

COPY package*.json ./

# Install all dependencies
RUN npm install

COPY . ./

# Expose Vite's default port (5000)
EXPOSE 5000

# Run the application in development mode
CMD ["npm", "run", "dev:vite"]
