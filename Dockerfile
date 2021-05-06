FROM node:14

WORKDIR /app

COPY bootstrap.sh test.sh package.json test.sh yarn.lock dist/server.js /app/

ENTRYPOINT [ "/app/bootstrap.sh" ]