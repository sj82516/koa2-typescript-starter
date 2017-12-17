import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as KoaBodyParser from "koa-bodyparser";
import * as KoaCors from "koa2-cors";
import * as KoaSession from "koa-session";
import * as KoaMogan from "koa-morgan";
import * as KoaHelmet from "koa-helmet";

import * as monment from "moment";
import router from "./server";

import config from "./config/local";
import errorMsg from "./utils/errorMsg";

const env: string = process.env.NODE_ENV || "development";

const app = new Koa();
app.use(KoaBodyParser());
app.use(async (ctx, next) => {
    ctx.body = ctx.request.body
    await next()
})
app.use(KoaCors());
app.use(KoaSession(config.session, app));

if (env == "development") {
    app.use(KoaMogan("combined"));
}

app.use(KoaHelmet());

// for error handling in centralized 
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
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