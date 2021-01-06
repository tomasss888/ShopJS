const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('GET Login', () => {
    it('should render login window', (done) => {
        chai.request(app)
            .get('/login')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Login', () => {
    it('should give "401 Unauthorized" status code for bad login info', (done) => {
        let data = {
            username: "wrongusername",
            password: "wrongpassword"
            };
        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Login', () => {
    it('should return "400 Bad Request" status code for bad login info', (done) => {
        let data = {
            username: "wrongusername",
            password: ""
            };
        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});

describe('POST Login', () => {
    it('should return 200 status code, because of correct login info', (done) => {
        let data = {
            username: "tomas",
            password: "tomas"
            };
        chai.request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
                done();
            });
    });
});