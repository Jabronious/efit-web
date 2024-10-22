
provider "azurerm" {
  features {}
}

# provider "namecheap" {
#   user_name   = "user"
#   api_user    = "user"
#   api_key     = "key"
# }

terraform {
  backend "azurerm" {
    storage_account_name = "tfstate13041"
    container_name       = "tfstate"
    key                  = "efit-backend.tfstate"
  }
}

resource "azurerm_resource_group" "default" {
  name     = "${var.prefix}-${terraform.workspace}-rg"
  location = var.location

  tags = var.tags
}

data "azurerm_kubernetes_cluster" "aks" {
  name                = "efit-aks"
  resource_group_name = "efit-aks-rg"
}

data "azurerm_dns_zone" "default" {
  name                = var.domain_label
  resource_group_name = "efit-dns-zone-rg"
}

resource "azurerm_public_ip" "lb-pip" {
  name                = "${var.prefix}-${terraform.workspace}-pip"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_dns_a_record" "default" {
  name                = var.subdomain_list[terraform.workspace]
  zone_name           = data.azurerm_dns_zone.default.name
  resource_group_name = data.azurerm_dns_zone.default.resource_group_name
  ttl                 = 3600
  target_resource_id  = azurerm_public_ip.lb-pip.id
}

resource "azurerm_role_assignment" "aks_network_contributor" {
  principal_id         = data.azurerm_kubernetes_cluster.aks.identity[0].principal_id
  role_definition_name = "Contributor"
  scope                = azurerm_resource_group.default.id
}

