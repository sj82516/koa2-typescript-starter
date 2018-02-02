declare global {
    namespace NodeJS {
        interface Global {
            io: any
        }
    }
}

import * as http from "http";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as KoaBodyParser from "koa-bodyparser";
import * as KoaCors from "koa2-cors";
import * as KoaSession from "koa-session";
import * as KoaHelmet from "koa-helmet";
import * as RedisStore from "koa-redis";
import * as socket from 'socket.io';
import * as moment from "moment";

import config from "./config/local";
import errorMsg from "./utils/errorMsg";
import logger from "./utils/logger";

const render = require('koa-ejs');
const serve = require('koa-static-server')

const env: string = process.env.NODE_ENV || "development";

const redisStore = RedisStore(config.memoryStore)

const app = new Koa();

const server = http.createServer(app.callback())
global.io = socket(server)

app.keys = ['secret', 'wqekkpsakdlkwmkdsmkijeowq']

import router from "./server";

// for loggin request and response time. like morgan but integrate with logger.
app.use(async (ctx, next) => {
    let start = moment();
    await next();
    logger.info({
        url: ctx.request.originalUrl,
        method: ctx.request.method,
        body: ctx.request.body,
        responseTime: moment().diff(start),
    })
})

app.use(KoaBodyParser());
app.use(async (ctx, next) => {
    ctx.body = ctx.request.body
    await next()
})

app.use(KoaCors({
    origin: "*",
    credentials: true,
}));

app.use(KoaSession(
    Object.assign({}, config.session, { store: redisStore }),
    app));

app.use(KoaHelmet());

// for error handling in centralized 
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.error(err)
        ctx.status = errorMsg.InternalServerError.statusCode;
        return ctx.body = errorMsg.InternalServerError.message;
    }
});

render(app, {
    root: "view",
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})

app.use(serve({
    rootDir: 'static',
    rootPath: '/static'
}))

app.use(router.routes());

console.log("app listen on:", config.port);

server.listen(config.port);

process.on("exit", () => {
    console.log("process exit");
}).on("uncaughtException", (error) => {
    console.log("process uncaughtException", error);
}).on("unhandledRejection", (error) => {
    console.log("process rejectionHandled", error);
})