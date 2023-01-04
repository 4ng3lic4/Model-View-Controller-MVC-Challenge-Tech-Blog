//create or delete comments, have the routes here
//if a route breaks its going to be here

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbcommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//check session and use de id from the session
router.post('/', withAuth, (req, res) => {

    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});
// Delete

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
            //  user_id: req.session.user_id,
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {

                res.status(404).json({ message: 'error 404, comment id not found' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;