# CAST_YOUR_VOTE

<h1 align="center">
🌐 MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>


 MERN is a fullstack implementation in MongoDB, Expressjs, React, Nodejs.

MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/Bharathmaradana/CAST_YOUR_VOTE.git
$ cd Frontend
      --> npm i
$ cd ../Backend
      --> npm i
```

## project structure
```terminal
LICENSE
package.json
backend/
   package.json
   .env (to create .env, check [prepare your secret session])
frontend/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd frontend          // go to client folder
$ npm i    // npm install packages
$ npm start    // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

### Start

```terminal
$ cd backend   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.15.3 | bcrypt-nodejs: ^0.0.3
babel-preset-stage-1: ^6.1.18|body-parser: ^1.15.2
lodash: ^3.10.1 | cors: ^2.8.1
react: ^16.2.0 | dotenv: ^2.0.0
react-dom: ^16.2.0 | express: ^4.14.0
react-router-dom: ^4.2.2 | mongoose: ^4.7.4


# Screenshots of this project
![1689488016150](https://github.com/Bharathmaradana/CAST_YOUR_VOTE/assets/95957169/a44a92aa-4e40-4637-b9ee-ad51d0a4792a)
![1689488016250](https://github.com/Bharathmaradana/CAST_YOUR_VOTE/assets/95957169/ad9bd0da-e9a3-498b-891d-c885d5afb044)
![1689488015640](https://github.com/Bharathmaradana/CAST_YOUR_VOTE/assets/95957169/cf637a8f-2878-4c96-bfe4-45b645e858d7)
![1689488015823](https://github.com/Bharathmaradana/CAST_YOUR_VOTE/assets/95957169/f2beaf0b-a530-4acb-bd07-c6db1b1e5d88)
![1689488017931](https://github.com/Bharathmaradana/CAST_YOUR_VOTE/assets/95957169/618959fb-6945-4d22-bfad-be57d151325f)

