FROM python:3.10.7-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV DIST_DIR /backend
WORKDIR $DIST_DIR

ENV SOURCE_DIR ./backend

COPY $SOURCE_DIR $DIST_DIR

RUN pip install -r requirements.txt

CMD ["/bin/bash", "-c", "python manage.py migrate;python manage.py runserver_plus 0.0.0.0:8000 --cert-file ./certs/localhost.crt"]
