## Description

Base repo to initialize new project using NestJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with minikube

```bash
$ eval $(minikube docker-env)

$ docker build -t <image-name>:<tag> .

$ minikube service nestjs-app -n nestjs-app-develop
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
