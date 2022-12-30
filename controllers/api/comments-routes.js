//create or delete comments, have the routes here
//if a route breaks its going to be here

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//1
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
});

  //2

  router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
id: req.params.id
        }
    })
    .then(commentData => res.json(commentData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
});

//3

router.post('/', async (req, res) => {
    try{
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);

    }catch (err) {
        res.status(500).json(err);
    }
});

//4

router.delete('/id', withAuth, async(req, res)=> {
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!commentData){
            res.status(404).json({message: '404 Blog IS not found' });
            return;
        }
        res.status(200).json(commentData);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;