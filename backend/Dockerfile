
ARG NODE_VERSION=18.20.3
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

FROM base as development

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]


FROM base as production
COPY package*.json ./
RUN npm install 
COPY . .
RUN npx prisma generate && npm run build  
CMD ["npm", "run", "start:prod"]