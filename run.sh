#!/bin/bash

# Eliminar archivos de assets previos
rails assets:clobber

# Compilar nuevos assets
rails assets:precompile

# Iniciar el servidor Rails
rails server
