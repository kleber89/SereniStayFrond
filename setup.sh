#!/bin/bash

# Actualizar paquetes
apt update && apt upgrade -y

# intalar curl y make
apt install curl -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

# Instalar Nginx y UFW (Firewall)
apt install nginx ufw -y

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

apt install --reinstall python3-certbot-nginx python3-urllib3 python3-requests-toolbelt

apt install --reinstall python3-urllib3=1.26.5-1~exp1 python3-requests-toolbelt=0.9.1-1

apt install --reinstall python3-requests-toolbelt -y

certbot --nginx -d web-443-45-171.cod-us-east-1.hbtn.io --non-interactive --agree-tos --email smsalazar0319@gmail.com

echo "✔️ Todo está listo! ✅"
