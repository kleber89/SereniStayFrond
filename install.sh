#!/bin/bash

echo "⚡ Configurando permisos..."
cp git/hooks/post-checkout .git/hooks/post-checkout
cp git/hooks/post-merge .git/hooks/post-merge
cp git/hooks/pre-commit .git/hooks/pre-commit

chmod +x .git/hooks/post-merge
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/post-checkout
chmod +x setup.sh

# Ejecutar setup.sh automáticamente
bash ./setup.sh

echo "✅ Instalación completa!"