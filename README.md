## Description

Base repo to initialize new project using NestJS

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running the app with helm

# Install

```bash
$ sh helm/scripts/install.sh
# NAME: efit-backend-release
# LAST DEPLOYED: Mon Mar 13 23:32:08 2023
# NAMESPACE: default
# STATUS: deployed
# REVISION: 1
# TEST SUITE: None
```

# Uninstall

```bash
$  helm uninstall efit-backend-release
# release "efit-backend-release" uninstalled
$  helm uninstall efit-backend-release
# release "connect" uninstalled
```

## Running the app with minikube

```bash
$ eval $(minikube docker-env)

$ docker build -t <image-name>:<tag> .

$ sh helm/scripts/install.sh

$ minikube service efit-backend -n efit-backend-develop
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
