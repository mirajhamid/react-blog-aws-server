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

- MongoDB via mongodbclient
  > npm install --save-dev mongodb
- Server.js //----------make use of frond end build
  -import path from "path";
  -app.use(express.static(path.join(\_\_dirname, "/build")));

### Phase03

- create ec2 instance
- generate .perm file
- add it into .ssh folder
- try to ssh and install below by local connection via ssh or direct console
- > sudo yum install git
- install node version manager normally look into aws tutorial for nvm install https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
  make sure you install same node -v in your machine when you execute
- > nvm install 14.17.0
- then install npm (already there)
- > nvm install-latest-npm
- > git clone https://github.com/mirajhamid/react-blog-aws-server.git
- move to correct branch
- > npm install
- we can just type 'npm start' but to keep run our server forever
- > npm install -g forever
- > forever start -c "npm start" .
- test by typing
- > forever list
- now map port 80 to 8000
- > sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000
- now done
- go back to aws ec2 >instance > select ur instance> and security groups
  check the secruity group in this case mine wizard-1
  then go to security groups in left side
  then click on wizard-1 security group
  then add HTTP rule > make it source from anywhere
  now use public dns and access

  --in EC2 fe_and_be_same
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 14.17.0 OR nvm install node
  sudo yum install git -y
  git clone https://github.com/mirajhamid/react-blog-aws-server.git
  cd react-blog-aws-server
  git checkout phase02
  npm install
  if error occured npm i -g npm@next-7

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
