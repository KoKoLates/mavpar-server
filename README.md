# mavpar server

A restful server with actix backend and react frontend for several embedded parameters configuration.

```
mavpar-server
├── client
│   ├── src/
│   ├── public/
│   ├── ...
│   ├── tsconfig.json
│   └── package.json
├── src
|   ├── ...
|   └── main.rs
├── ...   
├── Cargo.toml
└── README.md
```

## Frontend
```
cd client
npm install && npm start
```
and the default address will be [`http://localhost:3000`](http://localhost:3000/)

## Backend
```
cargo build && cargo run
```
note all needed dependences are installed. the default backend address will be [`http://localhost:8080`](http://localhost:8080/)
