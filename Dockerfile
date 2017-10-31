# Base image
FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html
