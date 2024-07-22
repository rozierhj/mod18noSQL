const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    first: String,
    last: String,
    age: Number,
});

const User = model('user', userSchema);

User.create({first: 'Hunter', last:'Rozier', age:54})
.then(data => console.log(data))
.catch(err => console.error(err));

module.exports = User;