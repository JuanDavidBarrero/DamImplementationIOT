# Usa una imagen base de Node.js con Debian para mayor compatibilidad
FROM node:20-bullseye

# Configuración de la zona horaria (opcional, dependiendo de tu aplicación)
ENV TZ=America/Bogota

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar Ionic CLI globalmente
RUN npm install -g @ionic/cli@7.2.0

# Instalar dependencias del proyecto
RUN npm ci

# Copiar el resto del código fuente al contenedor
COPY . .

# Exponer el puerto que usa Ionic
EXPOSE 8100

# Comando para ejecutar la aplicación Ionic
CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--disableHostCheck"]
