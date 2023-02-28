FROM nginx:1.21-alpine

LABEL authors="zhanghaijun" email="zhanghaijun@bjtxra.com"

COPY dist/  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]