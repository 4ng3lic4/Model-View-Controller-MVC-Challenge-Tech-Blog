//Import  packages
const router = require('express').Router();
 const userRoutes = require('./userRoutes');
 const postRoutes = require('./post-routes');


//the variable doesn't allow me to use a dash in the name, so I did CamelCase instead
const commentRoutes = require('/comments-routes');
const postRoutes= require('/post-routes');
const UserRoutes = require('/User-routes');

  
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/connebts', commentRoutes);

module.exports = router;