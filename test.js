const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { PhotoModel } = require('./mongodb')

const app = require("./index");
const { photo, differentPayment } = require("./constants");

const paymentKeys = Object.keys(photo);

chai.use(chaiHttp);
const expect = chai.expect;

  describe("Post", () => {
    it("Should create a new photo", async () => {
      new PhotoModel(photo)
      console.log(await PhotoModel.find());
  
      const res = await chai
        .request(app)
        .post("/photo")
        .send(photo);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, paymentKeys)).to.deep.equal(photo);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/photo")
        .send(photo)
  
      createdPayment = response.body;
    });
  
    it("Should get all photoes", async () => {
      const res = await chai
        .request(app)
        .get("/photo");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(photo => photo._id === createdPayment._id)).to.be.true;
    });
  
    it("Should get one photo by id", async () => {
      const res = await chai
        .request(app)
        .get(`/photo/${createdPayment._id}`);
  
      expect(res.body).to.deep.equal(createdPayment);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/photo")
        .send(photo)
  
        createdPayment = response.body;
    });
  
    it("Should update(put) photo by id", async () => {
      const res = await chai
        .request(app)
        .put(`/photo/${createdPayment._id}`)
        .send(differentPayment);
  
      expect(res.body).to.deep.equal({ ...createdPayment, ...differentPayment });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/photo")
        .send(photo)
  
        createdPayment = response.body;
    });
  
    it("Should delete photo by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/photo/${createdPayment._id}`);
  
      expect(res.body).to.deep.equal(createdPayment);
    });
  })