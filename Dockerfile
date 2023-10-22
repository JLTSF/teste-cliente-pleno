FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma/schema.prisma ./

RUN npm ci

RUN npm run test

COPY . .  
RUN npm run build

EXPOSE 8000
ENTRYPOINT [ "npm", "start" ]