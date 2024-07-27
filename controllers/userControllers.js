const User = require('../models/User');
//get all users
//get a single user
//post user
//put user
//delete user
//delete user friend
//post user friend

module.exports = {

//get all users
async getAllUsers(req, res){
    try{
        const users = await User.find().select('-__v');
        res.json(users);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async getOneUser(req, res){

try{
    const user = await User.findOne({_id: req.params.userID}).select('-__v');
        res.json(user);
}
catch(err){
    res.status(500).json(err);
}

},

async addUser(req, res){
    try{

        const dbNewUser = await User.create(req.body);
        res.json(dbNewUser);

    }
    catch(err){
        res.status(500).json(err);
    }
},

async editUser(req, res){
    try{

    }
    catch(err){
        res.status(500).json(err);
    }
},

async deleteUser(req, res){
    try{

    }
    catch(err){

    }
},

async addUserFriend(req, res){
    try{

    }
    catch(err){
        res.status(500).json(err);
    }
},

async deleteUserFriend(req, res){
    try{

    }
    catch(err){
        res.status(err).json(err);
    }
}

};