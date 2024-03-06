FROM node:lts-alpine as pre-build

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run prebuild && npm run build && npm prune --production

FROM node:lts-alpine

WORKDIR /src
ARG node_env='local'
ENV NODE_ENV $node_env
COPY --from=pre-build /src/dist /src/dist
COPY --from=pre-build /src/views /src/views
COPY --from=pre-build /src/client /src/client
COPY --from=pre-build /src/node_modules /src/node_modules
EXPOSE 3000

CMD ["node", "dist/main.js"]