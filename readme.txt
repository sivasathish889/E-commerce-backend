user create pannathuku munnadi role create pannanum
product create pannathuku munnadi category create pannanum


docker-compose --env-file .env up -d --build
docker tag e_commerce_backend shiva889/e_commerce_backend
docker push shiva889/e_commerce_backend