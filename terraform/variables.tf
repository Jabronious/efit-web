variable "prefix" {
  description = "Descriptive name for your resources"
  default     = "efit-web"
}

variable "location" {
  description = "Location the cluster will be located in"
  default     = "eastus"
  validation {
    condition     = !contains(["eastus2", "westus"], var.location)
    error_message = "Cannot use eastus2 or westus for location as they are fallbacks"
  }
}

variable "tags" {
  description = "Tags for your resources"
  default = {
    type = "webapp"
  }
}

variable "domain_label" {
  default = "efit-web.site"
}

variable "subdomain_list" {
  type = map(string)

  default = {
    prod    = "www"
    develop = "www.develop"
    staging = "www.staging"
  }
}
