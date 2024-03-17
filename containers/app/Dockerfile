FROM node:18-bookworm
LABEL authors="M9M9Ra"

RUN apt-get -y update
RUN apt-get install -y sudo wget curl git-core nano apt-utils
RUN apt-get -y install nmap

WORKDIR /app

CMD ["sh", "-c", "ls"]
CMD ["sh", "-c", "npm install cross-env -g"]
CMD ["sh", "-c", "npm install"]
CMD ["sh", "-c", "npm install supervisor -g"]

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run dev"]
