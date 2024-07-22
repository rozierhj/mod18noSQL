const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    first: String,
    last: String,
    age: Number,
});

const User = model('user', userSchema);

module.exports = User;