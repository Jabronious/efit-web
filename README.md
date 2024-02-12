## Description

Base repo to initialize new project using NestJS

## Installation

```bash
yarn install
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

## Deploying service from local to AKS

Requires:

- k8s cluster is running (specifically AKS) and it needs cert-manager and 1pass helm charts installed

# Install

```bash
$ helm upgrade -f ../helm/environments/develop.values.yaml \
  --set azureSubId=<AZURE_SUB> \
  --install efit-web-release-$(uuidgen) \
  ../helm
```

# Uninstall

```bash
$  helm uninstall efit-web-release-<UUID_FROM_WHEN_RELEASE_WAS_MADE>
# release "efit-web-release" uninstalled
```

## Running the app with minikube

```bash
eval $(minikube -p minikube docker-env)

docker build -t <image-name>:<tag> .

sh helm/scripts/install.sh

minikube service efit-web -n efit-web-develop
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
