const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server.js');
const Concert = require('../models/concert.model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
  
  it('/concerts should return all concerts', async () => {
    const res = await request(server).get('/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).not.to.be.null;
  });

  it('/concerts/performer/:performer should return concerts filtered by performer', async () => {
    const res = await request(server).get('/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).not.to.be.null;
  });

  it('/concerts/genre/:genre should return concerts filtered by genre', async () => {
    const res = await request(server).get('/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).not.to.be.null;
  });

  it('/concerts/price/:price_min/:price_max should return concerts filtered by range of price', async () => {
    const res = await request(server).get('/concerts/price/15/20');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).not.to.be.null;
  });

  it('/concerts/day/:day should return concerts filtered by day', async () => {
    const res = await request(server).get('/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).not.to.be.null;
  });
  
}); 