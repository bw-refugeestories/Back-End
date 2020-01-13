const helpers = require('./authHelperFunctions');
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('../api/server')

describe('auth model', () => {

  beforeEach(async () => {
    await db('admins').truncate();
  })
  
  describe('add()', () =>{
    it('should add an admin to the database', async () => {
      await helpers.add({firstName: 'Nick', lastName: 'Hansen', username: 'nick123', password: '12345'})

      const admins = await db('admins')

      expect(admins).toHaveLength(1)
    })
  });

  describe('delete()', () => {
    it('should delete user with given id', async () => {
      const user = await helpers.add({firstName: 'Nick', lastName: 'Hansen', username: 'nick1234', password: '12345'})
      await helpers.deleteByID(user[0].id)

      const admins = await db('admins')

      expect(admins).toHaveLength(0)
    })
  })
});
  describe('find()',  () => {
    it('should find all admins in database',async () => {
      await helpers.add({firstName: 'Nick', lastName: 'Hansen', username: 'nick1234', password: '12345'})
      await helpers.add({firstName: 'Nick12', lastName: 'Hansen', username: 'nick12345', password: '12345'})

      const admins = await helpers.find()

      expect(admins).toHaveLength(2)
    })

    describe('GET / ', () => {
      it('returns successfull status 200', () => {
        request(server).get('/auth/')
          .expect(200).expect('Content-Type', /json/)
      })
    })
  
    describe('POST /register', () => {
      it('should return status 201', () => {
       request(server).post('/auth/register').send({firstName: 'Nick', lastName: 'Hansen', username: 'nick123', password: '12345'}).expect(201)
      })
    })
  
    describe('POST /login', () => {
      it('should return status 200', async() => {
        await helpers.add({firstName: 'Nick', lastName: 'Hansen', username: 'nick123', password: '12345'});
        request(server).post('/auth/login').send({username: 'nick123', password: '12345'}).expect(200)
      })
    })
  })