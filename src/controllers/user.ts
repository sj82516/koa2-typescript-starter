import * as Koa from "koa";
import errorMsg from "../utils/errorMsg";
import { User } from "../models";
import { IUser } from "../models/user";

export async function create(ctx: Koa.Context) {
    let name: string = ctx.body.name;
    let age: number = Number(ctx.body.age);
    if (!name || !age) {
        ctx.status = errorMsg.MissingParams.statusCode;
        return ctx.body = {
            error: errorMsg.MissingParams.message
        }
    }

    let user: IUser = {
        name: name,
        age: age
    }

    let data = await User.create(user);
    console.log("WTF", data);

    return ctx.body = {
        data: data
    }
}