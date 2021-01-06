const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET Register', () => {
    it('should render main index window', (done) => {
        chai.request(app)
            .get('/register')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Register', () => {
    it('should not allow to register with empty fields', (done) => {
        let data = {
            username: "",
            email: "",
            password: ""
            };
        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Register', () => {
    it('should not allow to register with email that has been used before', (done) => {
        let data = {
            username: "tomas",
            email: "123@aaa.com",
            password: "123tomas"
            };
        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Register', () => {
    it('should allow to register correct account', (done) => {
        let data = {
            username: "tomas123",
            email: "123123@aaa.com",
            password: "123123tomas"
            };
        chai.request(app)
            .post('/register')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

