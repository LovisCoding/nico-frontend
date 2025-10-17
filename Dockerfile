FROM ubuntu:latest
LABEL authors="arthur"

ENTRYPOINT ["top", "-b"]