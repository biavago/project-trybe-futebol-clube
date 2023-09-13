import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches, oneMatch } from './mock/matchesMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes das rotas /matches', () => {
  beforeEach(function () { sinon.restore(); });

  it('Teste da getAllMatches', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return a match by id', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves(oneMatch as any);
    const { status, body } = await chai.request(app).get('/matches/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(oneMatch);
  });

  it('should return not found if the team does not exists', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/matches/666');
    expect(status).to.equal(404);
    expect(body.message).to.equal('match 666 not found');
  });
});
