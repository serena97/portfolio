FROM node:10 AS build-stage
WORKDIR /build
COPY . .
RUN ls -la
RUN npm install
RUN npm run build

#multistage build
FROM nginx:latest
WORKDIR /serenachan-io
COPY --from=build-stage /build/dist/personal-portfolio .
COPY --from=build-stage /build/nginx.conf /etc/nginx/conf.d/default.conf
