const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    addUser,
    editUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getAllUsers);

// /api/users/userID
router.route('/:userID').get(getOneUser);


module.exports = router;