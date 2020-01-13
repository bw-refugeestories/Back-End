const request = require('supertest');
const db = require('../data/dbConfig');
const acceptedHelpers = require('./acceptedStoryHelpers');
const pendingHelpers = require('./pendingStoryHelpers')
const server = require('../api/server');

describe('pending Stories route', () => {
  
  beforeEach( async () => {
    await db('acceptedStories').truncate()
    await db('pendingStories').truncate()
  })

  describe('add()', () => {
    it('should add story to pending stories database', async () => {
      await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'})

      const stories = await db('pendingStories')

      expect(stories).toHaveLength(1)
    }) 
  })
  

  describe('delete()', () => {
    it('should delete story from database', async () => {
      await db('pendingStories').truncate()
      await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'})
      await pendingHelpers.deleteByID(1)

      const stories = await db('pendingStories')

      expect(stories).toHaveLength(0)
    })
  })

  describe('endpoints', () => {
    beforeEach( async () => {
      await db('acceptedStories').truncate()
      await db('pendingStories').truncate()
    })
    describe('GET /', () => {
      it('returns success code 200', () => {
        request(server).get('/pendingStories').expect(200)
      })
    })
    describe('POST /add', () => {
      it('returns 200 code after adding to database', () => {
        request(server).post('/pendingstories/add').send({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'}).expect(200)
      })
    })
    describe('POST /approve/:id', () => {
      it('should return 200 code after approving story', async() => {
        await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'})
        request(server).post('/pendingstories/approve/1').expect(200)
      })
    })
  })
})