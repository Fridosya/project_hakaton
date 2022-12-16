### Запуск проекта

Сначала нужно в корневой папке проекта сгенерировать сертификаты с помощью команды утилиты:
```shell
mkcert --cert-file .certs/localhost.crt --key-file .certs/localhost.key localhost
```

Далее собираем образы и запускаем контейнеры

```shell
docker-compose up -d --build
```
В дальнейшем без `--build`.

В адресной строке `https://localhost:8080` чтобы перейти к приложению Vue и `https://localhost:8000/` чтобы перейти к API бэкенда