const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, 
        required: true, 
        unique: true,
    },
    email: {type: String, 
        required: true, 
        unique: true},
    thoughts:[
        {
        type: Schema.Types.ObjectId,
        ref: 'thought',
        },
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
});

const User = model('user', userSchema);

User.create({
username:'chickens',
email: 'chicken@email.com',
});

module.exports = User;