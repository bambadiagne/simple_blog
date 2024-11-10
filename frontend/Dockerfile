ARG NODE_ENV=development
FROM node:18.20.3-alpine  as development
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV NG_CLI_ANALYTICS=false
COPY . .
EXPOSE 4200
CMD ["npm","run","dev"]

FROM development as builder
RUN npm run build


FROM nginx:alpine as production
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
EXPOSE 80