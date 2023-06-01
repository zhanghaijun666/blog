FROM node:18-alpine as builder
WORKDIR /code
ADD package.json pnpm-lock.yaml docs scripts/env_node.sh ./
RUN sh env_node.sh && npm install && npm run build

FROM nginx:1.21-alpine
LABEL authors="zhanghaijun" email="zhanghaijun_java@163.com"
COPY --from=builder /code/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
