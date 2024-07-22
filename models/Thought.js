const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    text: String,
    username: String,
})

const Thought = model('thought', thoughtSchema);

Thought.create({
    text:'my first thought',
    username:'todo',
})

module.exports = Thought;