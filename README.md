# EFIT-WEB

## Description

`efit-web` is a web application created to support the ESPN Discord Bot. Its purpose is to link the discord and espn accounts of users to allow the ESPN Discord Bot to make requests on their behalf. It utilizes an OAuth 2.0 client to authenticate with Discord which only provides the user account id claim. It accepts some cookies from ESPN and enrypts then stores them in an Azure Cosmos DB.

## Deployment

The app deploys to the `efit-aks` k8s cluster and is triggered to deploy to `develop`, `staging`, and `prod` when PR's are merged into the respective branches (`main` = `prod`).

## Local Installation

```bash
yarn install
```

## Running the app locally

In order to start the application locally there are some necessary ENV vars.

```bash
COSMOS_CONNECTION_STRING: cosmos-db-string
FBB_BOT_CLIENT_ID: discord bot client id
FBB_BOT_SECRET: discord bot client secret
```

NOTE: If NODE_ENV is not set it will cause an issue where you need some further ENV vars, I suggest running `export NODE_ENV="test"` (assuming macOS)

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
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

**This may not work currently since cert manager has been added to the kube manifests**

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
