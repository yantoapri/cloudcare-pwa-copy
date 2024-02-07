# cloudcare fe pwa

## Description
Node v16.18.0
NPM 8.19.2
Angular CLI: 13.3.11

## Installation
yarn install
npm install -g @angular/cli@13.3.11

## Build
npm run build-staging:ssr

## RUN
dist/angularlight/server/main.js

## Support
PWA & SSR


Docker Images
D:\container\gamaintegra\cloudcare\cloudcare-fe-pwa = "$PWD"

Perintah Membuat container:
docker run -itd --restart unless-stopped -p 1015:3000 -v D:\container\gamaintegra\cloudcare\cloudcare-fe-pwa:/home/node/ --name 1015-cloudcare-fe-pwa totorajo/node:16