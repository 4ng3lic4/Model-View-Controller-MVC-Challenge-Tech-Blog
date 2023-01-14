//M13 activity 20

//get, create POSTS, etc
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');





// GET all users for homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username'],
            },
        ]
    })


        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET 
// Use the custom middleware before allowing the user to access 
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'created_at', 'post_content'],
        //include
        include: [
            {
                model: User,
                attributes: ['username']
            },
            { //model Comment
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })

        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Sorry, there is no post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post.post_content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
        //where
        {
            where: {
                id: req.params.id
            }
        })
        //then
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Sorry, no post found with that id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        //where
        where: {
            id: req.params.id
        }
    })
        //.then
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Sorry, no post was found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        //Catch error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;
