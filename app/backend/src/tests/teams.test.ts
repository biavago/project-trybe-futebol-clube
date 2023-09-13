import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { oneTeam, teams } from './mock/teamsMock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes das rotas /teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });;

  it('should return a team by id', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(oneTeam as any);
    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(oneTeam);
  });


  it('should return not found if the team does not exists', async function() {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/666');
    expect(status).to.equal(404);
    expect(body.message).to.equal('team 666 not found');
  });
});
