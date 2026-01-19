#!/bin/bash

# Portfolio Starter Script
# Inicia un servidor local para visualizar el portfolio

echo "🚀 Iniciando Portfolio de Daniel Benito..."
echo ""

# Detectar qué servidor usar
if command -v python3 &> /dev/null; then
    echo "✅ Usando Python3"
    echo "📱 Abriendo http://localhost:8000"
    echo ""
    python3 -m http.server 8000
elif command -v php &> /dev/null; then
    echo "✅ Usando PHP"
    echo "📱 Abriendo http://localhost:8000"
    echo ""
    php -S localhost:8000
elif command -v npx &> /dev/null; then
    echo "✅ Usando Node.js"
    echo "📱 Abriendo http://localhost:8080"
    echo ""
    npx http-server
else
    echo "❌ No se encontró Python3, PHP o Node.js"
    echo "Por favor instala uno de ellos:"
    echo ""
    echo "  brew install python3"
    echo "  o simplemente abre index.html en tu navegador"
    echo ""
    open index.html
fi
