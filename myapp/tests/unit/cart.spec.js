const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


describe('GET cart page', () => {
    it('should print ', (done) => {
        let data = {
            'currentID': '6'
            };
        chai.request(app)
            .get('/cart/add/1')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('GET cart page', () => {
    it('should print ', (done) => {
        chai.request(app)
            .get('/cart/delete/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

