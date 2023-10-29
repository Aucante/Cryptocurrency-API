let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
const {response} = require("express");

chai.should();

chai.use((chaiHttp));

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5ODE3NjY0NCwiZXhwIjoxNjk4MjYzMDQ0fQ.LrKMXCbCo9AjtzDHy3HmRJkw8ZQl15w8agKefEf4GSo';
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