let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
const {response} = require("express");

chai.should();

chai.use((chaiHttp));

describe('Cryptocurrencies API', () => {
    describe('GET /api/cryptocurrencies', () =>  {
        it('should GET cryptocurrencies', (done) => {
            chai.request('http://localhost:3000')
                .get('/api/cryptocurrencies')
                .auth(token, { type: 'bearer' })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
        });
    })
});