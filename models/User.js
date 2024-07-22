const {Schema, model} = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    username: {type: String, 
        required: true, 
        unique: true,
        trim: true,
    },
    email: {type: String, 
        required: true, 
        unique: true},
        validate:{
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
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