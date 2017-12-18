import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as KoaBodyParser from "koa-bodyparser";
import * as KoaCors from "koa2-cors";
import * as KoaSession from "koa-session";
import * as KoaHelmet from "koa-helmet";

import * as moment from "moment";
import router from "./server";

import config from "./config/local";
import errorMsg from "./utils/errorMsg";
import logger from "./utils/logger";

const env: string = process.env.NODE_ENV || "development";

const app = new Koa();
// for loggin request and response time. like morgan but integrate with logger.
app.use(async(ctx, next)=>{
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
app.use(KoaCors());
app.use(KoaSession(config.session, app));

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

app.use(router.routes());

app.listen(config.port);

process.on("exit", () => {
    console.log("process exit");
}).on("uncaughtException", (error) => {
    console.log("process uncaughtException", error);
}).on("unhandledRejection", (error) => {
    console.log("process rejectionHandled", error);
})