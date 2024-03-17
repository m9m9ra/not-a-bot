FROM node:18-bookworm

RUN apt-get -y update
RUN apt-get install -y sudo wget curl git-core nano apt-utils
RUN apt-get -y install nmap

WORKDIR /app
CMD ["sh", "-c", "ls"]
CMD ["sh", "-c", "npm install cross-env -g"]
CMD ["sh", "-c", "npm install supervisor -g"]
CMD ["sh", "-c", "npm install"]
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run stage"]
