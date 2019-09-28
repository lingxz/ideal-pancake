FROM node:10.16.3-alpine

# Set a working directory
WORKDIR .

COPY ./package.json .

# Install Node.js dependencies
RUN npm install --production

# Copy application files
COPY . .
EXPOSE 8080

CMD [ "node", "src/server/server.js" ]
