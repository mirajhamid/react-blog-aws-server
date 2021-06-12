# React Blog AWS Server

This is a basic blog site backEnd which use basic react features and AWS to up and running.

### Phase01

- Node.js backEnd using express server (react-blog-aws-server)
- > npm init -y
- > npm install --save express
- Intsalled babel to use ES6 in Node.js
- > npm install --save-dev @babel/core @babel/node @babel/preset-env
- Implement get and post in server we use body-parser to read post data
- > npm install --save body-parser
- Install nodemon for restart app when change taken place
- > npm install --save-dev nodemon

### Phase02

- MongoDB via mongose
  > npm install --save-dev mongodb

## Available Scripts

In the project directory, you can run:

### `npx nodemon --exec npx babel-node src/server.js`

To run this lenghty command to start server using nodemon you can simply use

> npm start

which is configured in package.json

### `npx babel-node src/server.js`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
