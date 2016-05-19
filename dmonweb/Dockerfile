FROM node

COPY src /src/
VOLUME /data

RUN npm install node-json2html

ENTRYPOINT [ "node", "/src/dmonweb.js" ]
