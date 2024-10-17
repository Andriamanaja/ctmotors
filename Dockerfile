# Dockerfile
FROM node:17

# Créer le répertoire de l'application
WORKDIR /usr/src/app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'application
EXPOSE 2010

# Commande pour démarrer l'application
CMD [ "node", "app.js" ]
