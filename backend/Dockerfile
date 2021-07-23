# Pull official base image
FROM python:latest

EXPOSE 5000

# Set work directory
WORKDIR /app

ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Define environment variables
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN apt-get update
RUN apt-get install libssl1.1 libasound2

COPY . .

CMD ["flask", "run", "--host=0.0.0.0"]