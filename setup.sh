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

# --- CONFIGURAR DUCKDNS ---
mkdir -p ~/duckdns && cd ~/duckdns

# Crear el script de actualización de DuckDNS (REEMPLAZA TU TOKEN)
echo 'echo url="https://www.duckdns.org/update?domains=serenistay&token=61f02490-1b1e-4b49-b0d3-f270e09f1d84&ip=" | curl -k -o ~/duckdns/duck.log -K -' > duck.sh

chmod +x duck.sh

# Agregar DuckDNS a crontab para actualizar la IP cada 5 minutos
(crontab -l ; echo "*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1") | crontab -

# --- INSTALAR CERTIFICADO SSL ---
apt-add-repository -r ppa:certbot/certbot
apt-get update
apt-get install python3-certbot-nginx -y

# Generar certificado SSL automáticamente
certbot --nginx --non-interactive --agree-tos -m smsalazar0319@gmail.com -d serenistay.duckdns.org

# Iniciar Nginx
service nginx start

echo "✔️ Todo está listo! ✅"