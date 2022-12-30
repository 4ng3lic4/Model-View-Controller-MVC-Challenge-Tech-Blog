//connect all of the routes from this api folder
const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comments-routes');



router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
