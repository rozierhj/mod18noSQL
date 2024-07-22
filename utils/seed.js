const connection = require('../config/connection');
const {Thought, User} = require('../models');

connection.once('open', async()=>{

    //dropping collections if they exist
    let userCheck = await connection.db.listCollections({name: 'user'}).toArray();
    if(userCheck.length){
        await connection.dropCollection('user');
    }

    let thoughtCheck = await connection.db.listCollections({name:'thought'}).toArray();
    if(thoughtCheck.length){
        await connection.dropCollection('thought');
    }


    

});