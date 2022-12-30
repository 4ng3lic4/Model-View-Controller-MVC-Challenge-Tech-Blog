//14-MVC-20_Stu_Middleware>seeds>galleryData.js

const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    comment_text: 'Awesome!',
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
