FROM node:14.19-alpine

WORKDIR /app

# Install Ember
RUN yarn global add ember-cli

# Copy the minimum files for yarn install to work
COPY package.json ./
COPY yarn.lock ./

# Install deps
RUN yarn install

# Copy everything else
COPY ./ .

ENTRYPOINT ["yarn", "run", "ember", "serve"]
