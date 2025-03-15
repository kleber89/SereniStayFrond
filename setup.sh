#!/bin/bash

# Actualizar paquetes
apt update && apt upgrade -y

# intalar curl y make
apt install curl make -y

#llamada a la pagina de node 
curl -sL https://deb.nodesource.com/setup_20.x — Node.js 20 "Iron" | bash -

# Instalar Node.js y npm
apt-get install nodejs -y

# instalar nginx
apt install nginx -y

#install ufw
apt install ufw -y

ufw allow 'Nginx HTTP'

# Instalar React Router DOM (si usas React)
npm install react-router-dom

echo "✔️ Todo está listo! ✅"