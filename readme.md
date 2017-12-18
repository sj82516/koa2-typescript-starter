Koa2 typescript starter project. 

Depend on:
 - mongoDB
 - redis
 - common middlewears. body-parser, session, and others
 - nodejs@8 up

Folder structure  

|folder|description|  
|------|-----------|  
|src| all ts source files|  
|src - controllers| all controllers|  
|src - models| all mongoose models. Export model type and mongoose model instance|  
|src - utils | support functions |  
|src - index.ts | main function. start koa app and middlewear|  
|src - server.ts | all decalrations of routers|  
|config| all confidential config files. suggest to add inside .gitingore in production.|  

### How to start 
run test, you need to start server first:  
$npm run test
in development:   
$ npm run watch-server  
in production: 
$ npm run build-server && pm2 start server.config.js

### Details 
1. config file:  
I usually declare config file inside config folder and name "local.(t|j)s". Comparing to run script and set env variables, it is much maintainable for me to declare config as object literal in javascript.  
In ES6 Module, I can only load module staticly so I use `cp` to replace config files corresponding to different env.  
For demo purpose, I put in the git trace. However in real project, you should not keep confidential files tracked by git.   
2. logger:  
Using bunyan as logger to log info of every incoming request(method, url, body, response time) and error. You can change settings inside src/index.js and src/utils/logger.js.  
3. testing:  
You have to start server by `$node run dist/index.js` instead of `$ npm run watch-server `.  
Because nodemon would restart server and cause api test ERRCONNECT.  
Noted there is not db mock. I prefer directly API unit test.


