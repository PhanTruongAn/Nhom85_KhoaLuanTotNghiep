FROM node:20-alpine
WORKDIR /nhom85/front-end
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
