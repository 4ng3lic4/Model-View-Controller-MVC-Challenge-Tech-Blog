//link all the models together
//we put the associations
//user can can make a post but two users cannot have the same post

const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

//Build the associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });

  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
  });

  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });


module.exports = { User, Comment, Post };
