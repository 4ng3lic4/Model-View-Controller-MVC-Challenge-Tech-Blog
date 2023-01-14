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
const posts = dbPostData.map(post => post.get ({ plain: true}));
res.render('dashboard', { posts, loggedIn : true});
    })
    .catch(err => {
        console.log(err);
    });
});

//Get edit id
router.get('/edit/:id', withAuth, (req, res)=> {
    Post.findOne ({
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
            
        ]
    })
})