# Usar a imagem oficial do Node.js como base
FROM node:22.11.0

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de dependência package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar a dependência específica do Babel manualmente
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Instalar as dependências
RUN npm install

# Copiar o restante do código-fonte para dentro do contêiner
COPY . .

# Expor a porta 3000, que é a porta padrão do React
EXPOSE 3000

# Definir o comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "start"]
