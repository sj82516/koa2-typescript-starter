import * as Koa from "koa";
import * as KoaRouter from "koa-router";

const local = require("./config/local")

import * as userController from "./controllers/user"

export const router = new KoaRouter();
const user = new KoaRouter();

user.post("/", userController.create);

router.use("/api/user", user.routes());

router.get("/:page", indexView)
    .all("*", notFound)

async function notFound(ctx: Koa.Context) {
    ctx.status = 404
    console.log("not found")
    return ctx.body = "NotFound"
}

async function indexView(ctx: Koa.Context) {
    "use strict";
    try {
        return ctx.render(ctx.params["page"], {
            domain: local.domain,
            fbId: ""
        })
    } catch (error) {
        console.error(error)
    }
}

export default router;