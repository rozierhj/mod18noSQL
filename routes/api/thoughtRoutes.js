const router = require('express').Router();

const {getAllThoughts, 
    getOneThought, 
    addThought, 
    editThought,
    deleteThought} = require('../../controllers/thoughtControllers');

    // /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);

// /api/thoughts/thoughtID
router.route('/:thoughtID').get(getOneThought);


module.exports = router;