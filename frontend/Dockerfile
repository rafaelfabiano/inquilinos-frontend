# Etapa 1: Usando Node.js para construir o aplicativo
FROM node:22.11.0 AS build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Adicionar a dependência necessária explicitamente
RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código-fonte da aplicação para o contêiner
COPY . .

# Construir a aplicação React
RUN npm run build

# Etapa 2: Usando Nginx para servir a aplicação construída
FROM nginx:alpine

# Copiar os arquivos de build da etapa anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 para que o Nginx possa servir a aplicação
EXPOSE 80

# Iniciar o Nginx no contêiner
CMD ["nginx", "-g", "daemon off;"]
