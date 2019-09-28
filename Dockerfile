FROM node:7.9.0-alpine

# Set a working directory
WORKDIR .

COPY ./package.json .

# Install Node.js dependencies
RUN npm install --production

# Copy application files
COPY . .
EXPOSE 3000

RUN cd src
CMD [ "node", "server/server.js" ]
