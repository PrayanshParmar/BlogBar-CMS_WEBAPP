# Getting Started with Server

This Server uses express.js

## Installation 

1. Read and Remove package-json and package-lock.json.

2. npm init 

3. Install dependencies  npm packageName@version
```
   "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.6.3",
    "multer": "^1.4.5-lts.1"
  }
```
4. Install developer dependencies

```
   npm i -d nodemon@latest
```

## Setup

5. Add config.env in server and add credentials
```
   touch config.env
   cat > config.env

   PORT=
   SECRET_KEY=''
   DB_TEST=''
   SERVER_ADDRESS=''

```

## Start

6. Run nodemon to start server

```
   nodemon app.js
```