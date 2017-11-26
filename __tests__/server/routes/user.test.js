const chai = require('chai')
const chaiHttp= require('chai-http')
const faker = require('faker')
const mongoose = require('mongoose')
const { expect } = chai

const server = require('../../../server/app')

chai.use(chaiHttp)

let token

describe('Users route', () => {
  const signup = '/users/signup'
  const signin = '/users/signin'
  const secret = '/users/secret'
  const user = { email: faker.internet.email(), password: faker.internet.password() }
  const preSave = { email: '602316022@qq.com', password: faker.internet.password() }

  before(done => {
    chai
      .request(server)
      .post(signup)
      .send(preSave)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        token = res.body.token
        done()
      })
  })

  after('droping test db', done => {
    mongoose.connection.dropDatabase(() => {
      console.log('\n Test database dropped')
    })
    mongoose.connection.close(() => {
      done()
    })
  })
})