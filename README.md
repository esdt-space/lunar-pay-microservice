# Lunar Pay API

## Project setup

Before running the project, there are a couple of steps that you have to follow for properly setting it up:

1. Install **yarn** if you don't have it already: https://yarnpkg.com/getting-started/install
2. Install node packages: `yarn`
3. Do the required additional setup by running `yarn setup`. This step configures **husky** and installs **typeorm** and **ts-node** globally.


**Shorthand commands for setup:**
- Linux / Mac / Windows PowerShell 7+:

`yarn && yarn setup`

- Windows cmd / PowerShell <7.0:

`yarn & yarn setup` in **cmd** or

`yarn; yarn setup` in **PowerShell <7.0**


## .env configuration

A `.env` file with the below described variables needs to be added in order to run the project:

```
# MongoDB variables needed for Docker
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password

MONGO_DB_NAME=lunar-pay
MONGO_DB_HOST="mongodb://admin:password@mongo:27017"

REDIS_PORT=6379
REDIS_HOST=redis
REDIS_USERNAME=default
REDIS_PASSWORD=redis-password

EVENTS_NOTIFIER_CONNECTION_STRING=string
```

## Running

- With Node/Nest live-reload server (http://localhost:3000)

`yarn start:devnet`

- With docker-compose (http://localhost:3001)

`docker-compose up -d`
