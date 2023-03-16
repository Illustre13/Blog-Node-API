//import chai from "chai";
//import {expect} from "chai";
//import chaiHttp from "chai-http";
//import app from "../server";


const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
//const app = require('../server')



chai.expect();
chai.use(chaiHttp);
jest.setTimeout(50000);
chai.should();
describe("Testing routes", () =>{
    it("Registering the user.", async () =>{
        const res = await chai.post("/signup").send({
            username: "Username",
            email: "username@gmail.com",
            password: "username123",
            rePassword: "username123",
            role: "User",
        });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
    });
    it("Get all the user", async () => {
        const res = await
        chai
        .get("/user")
        expect(res.status).to.be.equal(200);
    });
    it("User Login.", async () => {
        const res = await
        chai.post("/signin").send({
            email: "admin@gmail.com",
            password: "admin123"
        });
        expect(res.status).to.be.equal(200);
    });
});