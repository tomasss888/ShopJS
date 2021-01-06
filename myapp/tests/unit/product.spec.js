const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET Product main page', () => {
    it('render all the products in the main page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('GET Product specific', () => {
    it('render specific product', (done) => {
        chai.request(app)
            .get('/product/1')
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('GET Product specific', () => {
    it('render product which is not in database', (done) => {
        chai.request(app)
            .get('/product/9999')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});
