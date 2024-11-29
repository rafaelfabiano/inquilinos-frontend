# Etapa 1: Construir a aplicação (build)
FROM node:18 AS build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json da pasta 'frontend' para o contêiner
COPY frontend/package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todos os arquivos da pasta 'frontend' para o contêiner
COPY frontend/ ./

# Rodar o build da aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação com um servidor estático
FROM nginx:alpine

# Copiar os arquivos do build da aplicação React para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 para acesso à aplicação
EXPOSE 80

# Iniciar o servidor Nginx para servir a aplicação
CMD ["nginx", "-g", "daemon off;"]
