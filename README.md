# task-manager-api
Technologies : Node.js 
App is deployed on Heroku : https://ak96-task-manager.herokuapp.com/

## INSTALLING PREREQUISITES AND THE APP

#### 1. install Nodejs it also contains npm, follow [this instructions](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)

#### 2. download MongoDB
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
  OR
  Go to https://www.mongodb.com/cloud/atlas and create your Database in Mongo's Online server.

#### 3. clone the project
        git clone git@github.com:arisk1/task-manager-api.git	
        OR
	    git clone https://github.com/arisk1/task-manager-api.git

#### 4. Install node packages used in our project
      cd task-manager-api
      npm i
  
#### 5. Define your own environmental variables by creating a .env file.

#### 6. Download Postman API Dev Enviroment to test your work

#### 7. Downdload a MongoDB Compass GUI to interact with your database whether your created a local one or not.

## DEVELOPMENT
   npm run dev (starts your app locally.You need to have set your environmental variables before you try to run your app.)

## DEPLOYING ON HEROKU

### 0.Go to https://www.heroku.com/ and sign up 
      -Go to Get started Tab 
      -Select Node.js 
      -Click I'm ready to start
      -And follow the instructions in the website to get Heroku running on your machine

### 1.create heroku app
	heroku create app-name #your app name
### 2.config env variables in heroku
	heroku config:set key=value
### 3.remove an env variable from heroku(if needed)
	heroku config:unset key
### 4.watch heroku env variables
	heroku config
### 5.deploy app to heroku from git
	git push heroku main #or whatever your main/master-branch name is


