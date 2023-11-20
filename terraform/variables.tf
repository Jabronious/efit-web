variable "prefix" {
  description = "Descriptive name for your resources"
}

variable "location" {
  description = "Location the cluster will be located in"
  default     = "eastus"
  validation {
    condition     = !contains(["eastus2", "westus"], var.location)
    error_message = "Cannot use eastus2 or westus for location as they are fallbacks"
  }
}

variable "environment" {
  default = "dev"
}

variable "tags" {
  description = "Tags for your resources"
  default = {
    type = "webapp"
  }
}

variable "domain_name" {
  description = "domain name for app"
  default     = "efit"
}

variable "cert_manager_ns" {
  default = "cert-manager"
}

variable "namespace" {
  default = "efit-backend"
}