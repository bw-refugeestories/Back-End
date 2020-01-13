const server = require('./server');
const request = require('supertest');

describe('get /', () => {
  it('has proper environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
  });

  it('should return res status 200', async () => {
    const expectedResponse = 200;

    response = await request(server).get('/');

    expect(response.status).toBe(expectedResponse)
  })

  it('should return json', async () => {
    const expectedJSON = {api: 'Welcome to the refugee stories back end!'};

    response = await request(server).get('/')

    expect(response.body).toEqual(expectedJSON)
  })
})