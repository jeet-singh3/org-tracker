FROM node:14

WORKDIR /app

COPY bootstrap.sh package.json yarn.lock dist/server.js /app/

ENTRYPOINT [ "/app/bootstrap.sh" ]