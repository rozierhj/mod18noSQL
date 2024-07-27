const {Schema, model} = require('mongoose');
const validator = require('validator');

const userSchema = new Schema(
    {
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
    username: {type: String, 
        required: true, 
        unique: true,
        trim: true,
    },
    email: {type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

        },

},
{
    toJSON: {
        virtuals: true,
        transform:(doc, ret, options) =>{
            const id = ret._id;
            delete ret._id;
            ret._id = id;
            return {
                thoughts: ret.thoughts,
                friends: ret.friends,
                _id: id,
                username: ret.username,
                email: ret.email,
                friendCount: ret.friendCount,
            };
        }
    },
    id:false,
});

userSchema
.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;