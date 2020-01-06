const story = require('../../storyContentTxt')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pendingStories').del()
    .then(function () {
      // Inserts seed entries
      return knex('pendingStories').insert([
        {id: 1, storyName: 'Refugee Life', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578338912/integration-2489607_1920_rqo4s1.jpg', storyContent: story()},
        {id: 2, storyName: 'Refugee Integration', storyImg: 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337489/shinkiari-81770_1920_bmj6eo.jpg', storyContent: story()},
      ]);
    });
};
