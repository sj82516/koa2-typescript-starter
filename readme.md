Koa2 typescript starter project. 

Depend on:
 - mongoose
 - redis
 - common middlewears. body-parser, session, others

Folder structure  
| | |  
|------|------|  
|src| all ts source files|  
|src - controllers| all controllers|  
|src - models| all mongoose models. Export model type and mongoose model instance|  
|src - utils | support functions |  
|src - index.ts | main function. start koa app and middlewear|  
|src - server.ts | all decalrations of routers|  
|config| all confidential config files. suggest to add inside .gitingore in production.|  

### How to start 
in development: $ npm run dev.  
in production: $ npm run build-server && pm2 start server.config.js