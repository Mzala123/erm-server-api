FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install --production
CMD ["node", "./server/bin/www"]
EXPOSE 3000
