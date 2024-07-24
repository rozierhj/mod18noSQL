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
    let thought = [];
    let reactions = [];

    reactions = [
        {reactionBody:reactionData[0],
        username:usernames[0],
        },
        {
        reactionBody:reactionData[1],
        username:usernames[1],
        }
    ];
    thought = [
        {
            thoughtText:thoughtData[0],
            username:usernames[0],
            reactions:reactions,
        },
        {
            thoughtText:thoughtData[1],
            username:usernames[1],
            reactions:reactions,
        }
    ]

    await Thought.insertMany(thought);
    console.log(thought)
    
    for(let i = 0; i < usernames.length; i++){
        const username = usernames[i];
        const email = emails[i];

        users.push({
            username:username,
            email:email,
        });
    }
    
    await User.insertMany(users);
    console.log(users);
    process.exit(0);

});