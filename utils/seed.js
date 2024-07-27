const connection = require('../config/connection');
const {Thought, User} = require('../models');
const {usernames, emails, reactionData, thoughtData} = require('./data');
connection.on('error', (err) => err);

connection.once('open', async()=>{

    //dropping collections if they exist
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if(userCheck.length){
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({name:'thoughts'}).toArray();
    if(thoughtCheck.length){
        await connection.dropCollection('thoughts');
    }

    const users = [];

    for(let i = 0; i < usernames.length; i++){
        const username = usernames[i];
        const email = emails[i];

        users.push({
            username:username,
            email:email,
        });
    }
    
    await User.insertMany(users);

    //loop through users to add friends
    for(let usr = 0; usr < 40; usr++){

    //user we are adding frineds to
    const oneUser = await User.findOne().skip(usr).exec();

    //number of friends to add to user
    const numFriends = setRandomNum(1, 4);

    for(let fnd = 0; fnd <= numFriends; fnd++){

        //get a new friend
        const randomFriend = setRandomNum(0,39);
        const newFriend = await User.findOne().skip(randomFriend).exec();

        //get the ID from the friend
        const newFriendID = newFriend._id;
        console.log(newFriendID);

        //add the ID to the users friend count
        oneUser.friends.addToSet(newFriendID);

        const updatedUSer = await oneUser.save();

    }


    }

    
    //make 50 thoughts
    for(let i = 0; i<50; i++){

        //get user for thought
        const thoughtUser = await User.findOne().skip(setRandomNum(0,39)).exec();
        //id of the random user
        
        //create reactions
        const reactions = []
        for(let rct =0; rct < setRandomNum(1,4); rct++){

            //get random user to add to reaction
            const reactionUser = await User.findOne().skip(setRandomNum(0,39)).exec();
            //create reaction values
            reactions.push({
                reactionBody:`to reaction #${rct} from user#${reactionUser.username}`,
                username: `${reactionUser.username}`,
            })

        }

        const userID = thoughtUser._id;

        //populate thought fields
        const thoughts = {
            thoughtText: `to thought #${i} for our user ${thoughtUser.username}`,
            username: thoughtUser.username,
            reactions: reactions,
        };
        
        //create th thought
        const newthought = new Thought(thoughts);
        console.log(newthought._id, 'thought');

        //add the thoughts id to the users thought collection
        thoughtUser.thoughts.addToSet(newthought._id);

        //save edits to the thought and user docs
        await newthought.save();
        await thoughtUser.save();

    }


    console.log(users);
    process.exit(0);

});

function setRandomNum(min, max){

    return Math.floor(Math.random()*(max - min + 1)) + min;

}

  