FROM node:13.13.0

RUN npm i npm@7.6.1 -g

WORKDIR /usr/src/app

COPY ./apps/libs ./apps/libs

COPY ./package.json ./
RUN  npm install

COPY ./apps/users-service/package.json ./apps/users-service/package.json
RUN  npm install --prefix ./apps/users-service/ --only=production

COPY ./apps/users-service/ ./apps/users-service/

EXPOSE 9001

CMD ["node", "/usr/src/app/apps/users-service/index.js"]