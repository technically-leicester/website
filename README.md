# Technically Leicester website

Website and feedback form for Technically Leicester

## Structure

- `/web`: Create React App that builds the publicly hosted front-end
- `/server`: Koa app that serves the API for fetching content and submitting feedback
- `/dev`: Tools for development with support for Docker Compose for a MariaDB instance and a SQL dump for the database structure

## Prerequisites

- Node (14.9.0)
- NPM (6.14.8)
- Yarn (1.22.5)
- Docker (for development, 19.03.12)
- Docker Compose (for development, 1.26.2)
- MariaDB (or similar MySQL instance, 10.5.5)
- Nginx (or similar static hosting)

## Development

Prepare a database instance. From the `/dev` folder, copy `.env.example` to `.env` and include a password as below:

```.env
DOCKER_MYSQL_ROOT_PASSWORD=ThisIsYourPassword
```

Bring up the container, which will also mount a virtual volume and map a MySQL connection port to the host:

```bash
docker-compose up
```

From the `/server` directory, similarly create an `.env`. `SMTP_*` and `EMAIL_*` values can be left out for development. If a SMTP connection can't be made it will output the email to the console instead. Make sure the database values match up against your Docker values (in this case, user is `root`). The port should be `3001` as is expected by the web client further down. The front-end server will proxy to this.

Install the dependencies and run the server:

```bash
yarn install
yarn run start
```

From the `/web` directory, install the dependencies, build the images and start the server for the front-end.

```bash
yarn install
yarn run build-images
yarn run start
```

You will be able to see the website on `http://localhost:3000/`

## Deployment

There is an example deployment configuration for Nginx in `/deploy`. The server block should allow for all calls to `/api/` to be forwarded to the API server (in this example, port 3002):

```nginx
server {
  root /var/www/technicallyleicester.uk/public;
  server_name www.technicallyleicester.uk;
  location / {
          try_files $uri $uri/ =404;
  }
  location /api/ {
          proxy_pass "http://127.0.0.1:3002";
  }
  ...
```

The `/public` directory in this example contains the contents of the `/web/build` directory, which can be created as follows:

```bash
yarn install
yarn run build-images
yarn run build
```

## Contact

  Please reach out for any questions, suggestions, or just to say hi!

### Jack Gutteridge

- Email <jack@kingbrick.co.uk>
- Twitter [@jngutterdge](https://twitter.com/jngutteridge)

### Technically Leicester

- Email <contact@technicallyleicester.uk>
- Twitter [@technicallyleic](https://twitter.com/technicallyleic)
