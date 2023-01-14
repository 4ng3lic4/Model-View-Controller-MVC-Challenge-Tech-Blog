//Create user, login logout, get all users, 
//get, create POSTS, etc
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');


// GET api Users, exclude password
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] },

    })

        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



// GET api user find one, Post and Comment Models
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attribures: ['title']
                }
            },
        ]
    })


        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Sorry, no user was foind with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST
router.post('/', (req, res) => {
    Use.create({
        username: req.body.username,
        email: req.body.email,
        password: req.session.password

    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        });
});

//POST login

router.post('/login', (req, res) => {
    User.findOne({
     
        where: {
         email: req.body.email
        },
    }) .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Sorry, no user was foind with that email' });
                return;
            }
           const validPassword = dbUserData.checkPassword(req.body.password);
           if (!validPassword){
            res.status(400).json ( { message: 'Password does not mach our records'});
            return;
           }

//Save session
req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json( {user: dbUserData, message: 'You are succesfully logged in!'});
});

        });
});

//After logging in router post with conditional to destroy session and show 204 status

router.posr('/logout,(req,res' => {
    if (req.session.loggedIn) {
        res.status.destroy(( => {
            res.status(204).end();
        }))
    } else {
        res.status(404).end();
    }
});