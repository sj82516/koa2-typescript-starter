import {expect} from "chai";
import axios from "axios";

import errorMsg from "../src/utils/errorMsg";
import config from "../src/config/local"
import { exec } from "child_process";
const host = "http://localhost:8081";

describe("User API: POST /create", function(){
    it("success create user", async function(){
        try{
            let response = await axios.post(host + "/api/user", {
                name: "123",
                age: 5
            })
            expect(response.data.data).to.have.property("age").to.equals(5);
            expect(response.data.data).to.have.property("isAdult").to.equals(false);
        }catch(error){
        }
    })

    it("missing age, should get 400 error", async function(){
        try{
            let response = await axios.post(host + "/api/user", {
                name: "123"
            })
        }catch(error){
            expect(error.response.status).to.equals(errorMsg.MissingParams.statusCode);
            expect(error.response.data).to.have.property("error").to.equals(errorMsg.MissingParams.message);
        }
    })
})