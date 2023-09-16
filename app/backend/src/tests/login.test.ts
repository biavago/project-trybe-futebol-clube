import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { userInDB, validInfo, invalidEmail, invalidPassword } from './mock/usersMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes da /login', () => {
  beforeEach(function () { sinon.restore(); });

  it('Erro de e-mail inválido', async function () {
    const httpResponse = await chai.request(app).post('/login').send(invalidEmail);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message:  'Invalid email or password' });
  });

  it('Erro de senha inválida', async function () {
    const httpResponse = await chai.request(app).post('/login').send(invalidPassword);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message:  'Invalid email or password' });
  });

  it('Login válido', async function () {
    const httpResponse = await chai.request(app).post('/login').send(validInfo);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });
});

describe('Testes da /login/role', () => {
  beforeEach(function () { sinon.restore(); });

  it('Erro de token inválido', async function () {
    const httpResponse = await chai.request(app).get('/login/role').set('authorization', 'invalid_token');

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  });
});
