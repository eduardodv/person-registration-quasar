# Person Registration - Quasar

Project developed with Vue3 and [Quasar framework](https://quasar.dev/).

The purpose of the system is a crud for registering people and orders.

## Install the dependencies
```bash
yarn
# or
npm install
```


### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
# or
npm run dev
```


### Install and start the json-server
```bash
npm install -g json-server

#run server
json-server --watch src/data/data.json

#This will provide a REST api running at the addresses:
http://localhost:3000/pessoas
http://localhost:3000/produtos
http://localhost:3000/pedidos
```


### Run tests
```bash
npm run test:unit
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```


### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
