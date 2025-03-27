#!/bin/bash

#RESPONDER AUTOMATICO
echo "tzdata tzdata/Areas select America" | debconf-set-selections
echo "tzdata tzdata/Zones/America select Bogota" | debconf-set-selections

# Actualizar paquetes
apt update && apt upgrade -y

# intalar curl y make
apt install curl -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

echo "America/Bogota" > /etc/timezone
ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime

# Instalar Nginx y UFW (Firewall)
apt install nginx ufw tzdata -y

# Permitir tráfico HTTP en Nginx
ufw allow 'Nginx HTTP'

# Instalar dependencias del proyecto
npm install

# Instalar React Router DOM
npm install react-router-dom

# Construir la aplicación React
npm run build

# Copiar la configuración de Nginx
cp nginx.conf /etc/nginx/sites-available/react-app

# Copiar archivos build al directorio de Nginx
cp -r build/* /usr/share/nginx/html/

# Cambiar permisos al directorio
chown -R $USER:$USER /usr/share/nginx/html/

# Descomentar la línea server_names_hash_bucket_size
sed -i 's/#\s*server_names_hash_bucket_size/server_names_hash_bucket_size/' /etc/nginx/nginx.conf

# Crear enlace simbólico
ln -s /etc/nginx/sites-available/react-app /etc/nginx/sites-enabled/

#inicio el servidor
service nginx start

echo "✔️ Todo está listo! ✅"
