import * as mongoose from "mongoose";

import config from "../config/local";
import {UserModel} from "./user";

mongoose.connect(config.db.url, {
    useMongoClient: true,
  }, (err) => {
    console.error("mongoose connection error: ", err);
});

export const User = UserModel.getInstance();
