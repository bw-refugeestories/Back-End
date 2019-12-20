const story = require('../../storyContentTxt')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('acceptedStories').del()
    .then(function () {
      // Inserts seed entries
      return knex('acceptedStories').insert([
        {id: 1, storyName: 'Life of a Refugee', storyImg: 'https://imgur.com/gallery/Z1kXqmd', storyContent: story()},
        {id: 2, storyName: 'My Story', storyImg: 'https://imgur.com/gallery/jVcCDIa', storyContent: story()},
        {id: 3, storyName: 'Common misconceptions', storyImg: 'https://imgur.com/gallery/lzbS2aK', storyContent: story()},
        {id: 4, storyName: 'Striving for Greatness', storyImg: 'https://imgur.com/gallery/gG7zP4p', storyContent: story()}
      ]);
    });
};
