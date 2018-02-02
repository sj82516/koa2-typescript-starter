import * as KoaRouter from "koa-router";

import * as userController from "./controllers/user"
import socket from "./controllers/socket"
socket()

export const router = new KoaRouter();
const user = new KoaRouter();

user.post("/", userController.create);

router.use("/api/user", user.routes());

export default router;