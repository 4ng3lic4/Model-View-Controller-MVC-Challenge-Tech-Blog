//Import modules
const router = require ('express').Router();
const sequelize = require ('../config/connection');
const { Post, User, Comment} = require ('../models');

router.get('/', (req,res)=> {
    console.log(req.session);

    Post.findAll ({
        attributes : [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include : [
            {
                model: Comment,
                attributes: [
                    'id,',
                'comment_text',
            'post_id',
            'user_id',
            'created_at'
        ],
        include: {
            model: User,
            attributes: [ 'username']
        }
            },
            {
                model: User,
                attributes: [ 'username']

            }
        ]
    })
//then render homepage
.then(dbPostData => {
    //const post with map method
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepge', { posts, loggedIn: req.session.loggedIn });
    
        })
        //catch error
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//router get login

router.get('/login', withAuth, (req, res) => {
//If user the session is logged in, redirect to homepage
if(req.session.loggedIn) {
    req.redirect('/');
    return;
}
//show login
res.render('login');
});

//Sign up
router.get('/signup',  (req, res) => {
    //If user the session is logged in, redirect to homepage
    if(req.session.loggedIn) {
        req.redirect('/');
        return;
    }
    //show login
    res.render('signup');
    });

    //id Variable route
    router.get('/post/:id',  (req, res) => {
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
        attributes: ['username,']
    }
]
       })
       //then here
       
        
       .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Sorry, no post was found with that id' });
            return;
        }

        //Render data
        const post = dbPostData.get({ plain: true });
        res.render('sigle-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    //Catch  error
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
        });
    
        module.esports= router;