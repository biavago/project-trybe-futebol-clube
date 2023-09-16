import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches, inProgressFalse, InProgressTrue } from './mock/matchesMock';
import TokenGenerator from '../utils/TokenGenerator';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes das rotas /matches', () => {
  beforeEach(function () { sinon.restore(); });

  it('Teste da getAllMatches', async () => {
    const { status, body } = await chai.request(app).get('/matches');
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Teste de retornar partidas em andamento', async () => {
    const pogressStatus = true;
    const matches = pogressStatus ? InProgressTrue : inProgressFalse;
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const { body, status } = await chai.request(app).get(`/matches?inProgress=${pogressStatus}`);

    expect(body).to.deep.equal(InProgressTrue);
    expect(status).to.equal(200);
  });

  it('Teste da update', async () => {
    const matchID = 1;
    sinon.stub(TokenGenerator, 'verifyToken').resolves('token');
    const { body, status } = await chai.request(app).patch(`/matches/${matchID}`).set('authorization', 'token');

    expect(body).to.deep.equal({ message: 'Updated' });
    expect(status).to.equal(200);
  });

  it('Teste da finish', async () => {
    const matchID = 41;
    sinon.stub(TokenGenerator, 'verifyToken').resolves('token');
    const { body, status }  = await chai.request(app).patch(`/matches/${matchID}/finish`).set('authorization', 'token');

    expect(body).to.deep.equal({ message: 'Finished' });
    expect(status).to.equal(200);
  });
});
