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
router.route('/').get(getAllUsers).post(addUser);

// /api/users/userID
router.route('/:userID').get(getOneUser).put(editUser).delete(deleteUser);


module.exports = router;