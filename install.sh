#!/bin/bash

echo "⚡ Configurando permisos..."
chmod +x .git/hooks/post-checkout
chmod +x setup.sh

# Ejecutar setup.sh automáticamente
bash ./setup.sh

echo "✅ Instalación completa!"
