#####################
# Development stage #
#####################
FROM node:14.17.3-alpine3.14 as development

# Set working directory to ui
WORKDIR /opt/mockDraft/ui

# Copy project into working directory
COPY . .

# Start developmental webpack server
CMD ["yarn", "start"]

###############
# Build stage #
###############
FROM node:14.17.3-alpine3.14 as build

# Set files to tmp directory because this stage is intermediate
WORKDIR /tmp/mockDraft/ui

# Create layer to copy package.json into image for building
COPY . .

# Install app dependencies
RUN yarn

# Create production build
RUN yarn build

###############
# Final stage #
###############
FROM nginx:1.21.1-alpine

# copy files into nginx serving directory
COPY --from=build /tmp/mockDraft/ui/build/ /usr/share/nginx/html