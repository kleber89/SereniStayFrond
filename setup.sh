#!/bin/bash

# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar Git
sudo apt install git -y

# Instalar Node.js y npm
sudo apt install nodejs npm -y

# Instalar React Router DOM (si usas React)
npm install react-router-dom

# instalar nginx
apt install nginx -y

#install ufw
apt install ufw -y

ufw allow 'Nginx HTTP'

echo "✔️ Todo está listo! ✅"
