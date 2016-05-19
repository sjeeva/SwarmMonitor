FROM ubuntu:14.04

RUN apt-get update && \
    apt-get install -y curl jq && \
    apt-get clean

COPY script /script/
WORKDIR /script/
VOLUME /data

CMD ["sh", "loop.sh"]

