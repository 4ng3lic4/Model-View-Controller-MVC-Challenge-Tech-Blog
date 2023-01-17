//all the routes for log in and go to Dashboard
//render the handlebars page for the login
//have the info for the log in routes

const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username,']
                }
            },
            {
                model: User,
                attributes: [
                    'username'
                ]
            }
        ]
    })
        .then(dbPostData => {
            //data goes to dashboard
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
        });
});

//Get edit id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username,']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        //No post found
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Sorry, no post was found with that id' });
                return;
            }

            //Render data
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        //Catch  error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get with id from the session
router.get('/create', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: res.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                //
                include: {
                    model: User,
                    attributes: ['username,']
                }
            },
            {
                model: User,
                attributes: ['username']
                //

            }

        ]

    })
    //Then
    .then(dbPostData => {
//const post with map method
const posts = dbPostData.map(post => post.get({ plain: true }));
res.render('create-post', { posts, loggedIn: true });

    })

    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

//Export router
module.exports = router;