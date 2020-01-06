const story = require('../../storyContentTxt')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('acceptedStories').del()
    .then(function () {
      // Inserts seed entries
      return knex('acceptedStories').insert([
        {id: 1, storyName: 'Life of a Refugee', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337142/eritrea-105081_1920_a0ircd.jpg', storyContent: story()},
        {id: 2, storyName: 'My Story', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337489/shinkiari-81770_1920_bmj6eo.jpg', storyContent: story()},
        {id: 3, storyName: 'Common misconceptions', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337495/war-1911176_1920_gbjmjv.jpg', storyContent: story()},
        {id: 4, storyName: 'Striving for Greatness', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337504/migration-3129299_1920_ul2pcc.jpg', storyContent: story()}
      ]);
    });
};
