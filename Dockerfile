# Étape 1 : Build de l'application Frontend React (Vite)
FROM node:20-alpine AS build

WORKDIR /app

# Arguments de build (ex: URL du backend pour Vite)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copie des fichiers de dépendances et installation
COPY package*.json ./
RUN npm ci

# Copie des fichiers source et build
COPY . .
RUN npm run build

# Étape 2 : Image NGINX de production
FROM nginx:alpine AS production

# Copie de la configuration NGINX personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers statiques générés par le build Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
