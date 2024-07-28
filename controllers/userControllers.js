const User = require('../models/User');
const Thought = require('../models/Thought');
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
    const user = await User.findById(req.params.userID)
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    .exec();


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
        const updateUser = await User.findByIdAndUpdate(req.params.userID, req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        }).populate('thoughts friends');

        res.json(updateUser);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async deleteUser(req, res){
    try{

        const deletedUser = await User.findByIdAndDelete(req.params.userID);

        if(!deletedUser){
            return res.status(404).send('user not found');
        }

       const deletedThoughts =  await Thought.deleteMany({username: deletedUser.username});

       await Thought.updateMany(
        {"reactions.username":deletedUser.username},
        {$pull:{reactions:{username:deletedUser.username}}}
       )

        res.json({message: 'user deleted'});

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