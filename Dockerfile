FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose && npm cache clean --force
COPY . .
COPY ./src ./src
RUN npm run build
RUN find . -mindepth 1 -maxdepth 1 ! -name 'dist' -exec rm -rf {} +

FROM node:22-alpine
#RUN npm install -g pm2 --verbose 
WORKDIR /app
COPY --from=builder /app/dist ./
#COPY --from=builder /app/ecosystem.config.cjs ./
RUN npm install --verbose && npm cache clean --force
EXPOSE 5100
#CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
CMD ["node", "."]