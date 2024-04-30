
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
    key                  = "efit-backend-${var.environment}.tfstate"
  }
}

resource "azurerm_resource_group" "default" {
  name     = "${var.prefix}-${var.environment}-rg"
  location = var.location

  tags = var.tags
}

data "azurerm_kubernetes_cluster" "aks" {
  name                = "efit-aks"
  resource_group_name = "efit-aks-rg"
}

resource "azurerm_public_ip" "lb-pip" {
  name                = "${var.prefix}-${var.environment}-pip"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_dns_zone" "default" {
  name                = var.domain_label
  resource_group_name = azurerm_resource_group.default.name
}

resource "azurerm_dns_a_record" "default" {
  name                = var.subdomain_list[var.environment]
  zone_name           = azurerm_dns_zone.default.name
  resource_group_name = azurerm_resource_group.default.name
  ttl                 = 3600
  target_resource_id  = azurerm_public_ip.lb-pip.id
}

resource "azurerm_role_assignment" "aks_network_contributor" {
  principal_id         = data.azurerm_kubernetes_cluster.aks.identity[0].principal_id
  role_definition_name = "Contributor"
  scope                = azurerm_resource_group.default.id
}

resource "azurerm_role_assignment" "dns_contributor" {
  scope                = azurerm_dns_zone.default.id
  role_definition_name = "DNS Zone Contributor"
  principal_id         = data.azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}

output "fqdn" {
  value = azurerm_dns_a_record.default.fqdn
}
output "ip_address" {
  value = azurerm_public_ip.lb-pip.ip_address
}

output "aks_network_contributor_map" {
  value = tomap({
    name         = azurerm_role_assignment.aks_network_contributor.name
    principal_id = azurerm_role_assignment.aks_network_contributor.principal_id
    scope        = azurerm_role_assignment.aks_network_contributor.scope
  })
}

output "dns_contributor_map" {
  value = tomap({
    name         = azurerm_role_assignment.dns_contributor.name
    principal_id = azurerm_role_assignment.dns_contributor.principal_id
    scope        = azurerm_role_assignment.dns_contributor.scope
  })
}

output "ns_servers" {
  value = azurerm_dns_zone.default.name_servers
}
