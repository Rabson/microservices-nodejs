FROM node:13.13.0

RUN npm i npm@7.6.1 -g

WORKDIR /usr/src/app

COPY ./apps/libs ./apps/libs

COPY ./package.json ./
RUN  npm install

COPY ./apps/file-upload-service/package.json ./apps/file-upload-service/package.json
RUN  npm install --prefix ./apps/file-upload-service/ --only=production

COPY ./apps/file-upload-service/ ./apps/file-upload-service/

EXPOSE 9001

CMD ["node", "/usr/src/app/apps/file-upload-service/index.js"]