# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación en el contenedor
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto 3000 para acceder a la API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
