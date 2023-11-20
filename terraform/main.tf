
provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    storage_account_name = "tfstate13041"
    container_name       = "tfstate"
    key                  = "efit-backend.tfstate"
  }
}

locals {
  namespace    = "${var.namespace}-${var.environment}"
  domain_label = "${var.prefix}${var.environment == "prod" ? "" : "-${var.environment}"}"
}

//SHOULD BE GOOD
resource "azurerm_resource_group" "default" {
  name     = "${var.prefix}-webapp-rg"
  location = var.location

  tags = var.tags
}

# resource "azurerm_dns_zone" "default" {
#   name                = "${var.prefix}-dnz-zone"
#   resource_group_name = azurerm_resource_group.default.name
# }

# resource "azurerm_dns_a_record" "example" {
#   name                = "*"
#   zone_name           = azurerm_dns_zone.default.name
#   resource_group_name = azurerm_dns_zone.default.resource_group_name
#   ttl                 = 3600 # Replace with your desired TTL (time-to-live) value
#   records             = [local.domain_label]
# }

data "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.prefix}-aks"
  resource_group_name = "${var.prefix}-aks-rg"
}

resource "azurerm_public_ip" "ingress" {
  name                = "${var.prefix}-pip"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  domain_name_label   = local.domain_label
  allocation_method   = "Static"
  sku                 = "Standard"
}

provider "helm" {
  kubernetes {
    host                   = data.azurerm_kubernetes_cluster.aks.kube_config.0.host
    username               = data.azurerm_kubernetes_cluster.aks.kube_config.0.username
    password               = data.azurerm_kubernetes_cluster.aks.kube_config.0.password
    client_certificate     = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_certificate)
    client_key             = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.client_key)
    cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.aks.kube_config.0.cluster_ca_certificate)
  }
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  namespace  = local.namespace
  version    = "v1.13.0"

  set {
    name  = "installCRDs"
    value = true
  }

  set {
    name  = "nodeSelector.kubernetes.io/os"
    value = "linux"
  }
}

resource "helm_release" "ingress" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  namespace        = local.namespace
  create_namespace = true

  set {
    name  = "controller.service.loadBalancerIP"
    value = azurerm_public_ip.ingress.ip_address
  }

  set {
    name  = "controller.service.annotations.service.beta.kubernetes.io/azure-dns-label-name"
    value = azurerm_public_ip.ingress.domain_name_label
  }


  set {
    name  = "controller.service.annotations.service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path"
    value = "/healthz"
  }
}


helm install test-release ingress-nginx/ingress-nginx \
	