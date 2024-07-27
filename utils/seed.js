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

    //user to add friends to

//     oneUser.friends.addToSet()

//     const numFrnd = setRandomNum(1,4);
//     for (let frnd = 0; frnd < numFrnd; frnd++){

       

//     }


// //go through all users
//     for(let i = 0; i < 40; i++){

//         const oneUser = await User.findOne().skip(i).exec();
//         const numThought = setRandomNum(1,4);

// //create random number of thoughts
//         for(let tht = 0; tht < numThought; tht++){

// //create random number of reactions to a thought
//         numReaction = setRandomNum(1,4);
//         for(let k =0; k < 1; k++){



//             }
//         }
//     }


    console.log(users);
    process.exit(0);

});

function setRandomNum(min, max){

    return Math.floor(Math.random()*(max - min + 1)) + min;

}

  