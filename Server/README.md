# Getting Started with Server

This Server uses express.js

## Installation 

1. npm init 

2. Install developer dependencies

```
   npm i -D nodemon@latest
```

## Setup

3. Add config.env in server and add credentials
```
   touch config.env
   cat > config.env

   PORT=
   SECRET_KEY=''
   DB_TEST=''
   SERVER_ADDRESS=''

```

## Start

4. Run nodemon to start server

```
   nodemon app.js
```