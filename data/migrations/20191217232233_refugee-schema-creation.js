
exports.up = function(knex) {
  return knex.schema
    .createTable('admins', tbl => {
      tbl.increments();

      tbl.string('firstName').notNullable();
      tbl.string('lastName').notNullable();
      tbl.string('username').notNullable().unique();
      tbl.string('password').notNullable();
    })
    .createTable('pendingStories', tbl => {
      tbl.increments();

      tbl.string('storyName').notNullable().unique();
      tbl.string('storyImg').notNullable();
      tbl.text('storyContent').notNullable();
      tbl.string('author')
    })
    .createTable('acceptedStories', tbl => {
      tbl.increments();

      tbl.string('storyName').notNullable().unique();
      tbl.string('storyImg').notNullable();
      tbl.text('storyContent').notNullable();
      tbl.string('author')
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('pendingStories').dropTableIfExists('acceptedStories').dropTableIfExists('admins')
};
