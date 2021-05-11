FROM node:14

WORKDIR /app

COPY bootstrap.sh src/utils/migrate.js package.json yarn.lock dist/server.js /app/

RUN apt-get update && apt-get install -y vim

ENTRYPOINT [ "/app/bootstrap.sh" ]