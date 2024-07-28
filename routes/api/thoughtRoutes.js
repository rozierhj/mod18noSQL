const router = require('express').Router();

const {getAllThoughts, 
    getOneThought, 
    addThought, 
    editThought,
    deleteThought,
    addReaction,
    deleteReaction} = require('../../controllers/thoughtControllers');

    // /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);

// /api/thoughts/thoughtID
router.route('/:thoughtID').get(getOneThought).put(editThought).delete(deleteThought);

// /api/thoughts/thoughtID/reactions
router.route('/:thoughtID/reactions').put(addReaction);

router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;