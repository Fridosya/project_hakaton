# FROM node:lts-alpine

# RUN npm install -g http-server

# ENV DIST_DIR /app
# ENV SOURCE_DIR /frontend

# WORKDIR $DIST_DIR

# COPY ${SOURCE_DIR}/package*.json ${DIST_DIR}/

# RUN npm install

# COPY ${SOURCE_DIR}/ ${DIST_DIR}/

# RUN npm run build

# EXPOSE 8080
# CMD [ "http-server", "dist" ]

FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf