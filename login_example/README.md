# login_example

## Running Locally 

### Booting up a MySQL instance

```sh
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=login_example mysql
```

### Starting the application

```sh
npm i
npm run start
```

PS: make sure to create a `.env` file with the enviroment variables needed (see [.env.example](.env.example)).