FROM node:alpine
LABEL authors="Empire"

WORKDIR /usr/src/app

# Copying package and package-lock files in
COPY package*.json .

ENV NODE_ENV=production

# Run exact dependencies from the package lock json. This excludes dev dependencies.
RUN npm config list \
    && npm ci \
    && npm ls \
    && npm cache clean --force

# Copy every files into our current directory. Whatever is in docker ignore it wouldn't copy here.
COPY . .

EXPOSE 8080

# when running the container it will kick off script start
CMD [ "npm", "start" ]