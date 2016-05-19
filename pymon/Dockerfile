FROM python
MAINTAINER Jeeva S. Chelladhurai

RUN pip install docker-py

ADD src /src/

ENTRYPOINT ["python", "/src/dockermon.py"]
