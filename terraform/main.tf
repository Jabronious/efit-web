
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

resource "azurerm_resource_group" "default" {
  name     = "${var.prefix}-webapp-rg"
  location = var.location

  tags = var.tags
}

resource "azurerm_public_ip" "ingress" {
  name                = "${var.prefix}-pip"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_dns_zone" "default" {
  name                = "${local.domain_label}.com"
  resource_group_name = azurerm_resource_group.default.name
}

resource "azurerm_dns_a_record" "default" {
  name                = "*"
  zone_name           = azurerm_dns_zone.default.name
  resource_group_name = azurerm_resource_group.default.name
  ttl                 = 3600
  target_resource_id  = azurerm_public_ip.ingress.id
}

output "fqdn" {
  value = azurerm_dns_a_record.default.fqdn
}
output "ip_address" {
  value = azurerm_public_ip.ingress.ip_address
}

# helm install ingress-nginx ingress-nginx/ingress-nginx \
# 	--namespace "efit-backend-develop" \
# 	--set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"="efit-backend-dev.com" \
# 	--set controller.service.loadBalancerIP="20.106.163.209" \
# 	--set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz

# helm install cert-manager jetstack/cert-manager \
#   --namespace "efit-backend-develop" \
#   --version=v1.8.0 \
#   --set installCRDs=true
