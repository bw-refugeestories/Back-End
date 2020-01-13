const request = require('supertest');
const db = require('../data/dbConfig');
const acceptedHelpers = require('./acceptedStoryHelpers');
const pendingHelpers = require('./pendingStoryHelpers')
const server = require('../api/server');

describe('accepted Stories route', () => {
  
  beforeEach( async () => {
    await db('acceptedStories').truncate()
    await db('pendingStories').truncate()
  })

  describe('find()', () => {
    it('finds all accepted stories', async () => {
      await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'});
      await pendingHelpers.approve(1)

      const stories = await db('acceptedStories')
  
      expect(stories).toHaveLength(1)
    })
  })

  describe('delete()', () => {
    it('deletes story', async() => {
      await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'});
      await pendingHelpers.approve(1)
      await acceptedHelpers.deleteByID(1)
  
      const stories = await db('acceptedStories')
  
      expect(stories).toHaveLength(0)
    })
  })
  describe('endpoints', () => {
    describe('GET /', () => {
      it('returns correct status 200', async () => {
        await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'});
        request(server).get('/').expect(200)
      })
    })

    describe('DELETE /:id', () => {
      it('should delete story with given id', async () => {
        await pendingHelpers.add({storyName: 'name', storyContent: 'content', storyImg: 'storyImgURL'});
        request(server).delete('/1').expect(200)
      })
    })
  })
})