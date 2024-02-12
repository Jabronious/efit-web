terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.82.0, < 4.0.0"
    }

    # namecheap = {
    #   source  = "namecheap/namecheap"
    #   version = ">= 2.0.0"
    # }
  }

  required_version = ">= 1.6.4"
}

