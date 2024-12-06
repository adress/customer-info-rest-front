# Etapa 1: Construir la aplicación Angular
FROM node:20 as build
WORKDIR /app

# Aceptar un argumento de construcción llamado BUILD_ENV
ARG BUILD_ENV=build:prod

COPY package*.json /app/
RUN npm install
COPY . /app

# Usar el argumento de construcción en el comando RUN
RUN npm run $BUILD_ENV

# Etapa 2: Preparar el servidor Nginx para servir la aplicación construida
FROM nginx:alpine
COPY --from=build /app/dist/customer-info-rest-front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
