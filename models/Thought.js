const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema({
    text: String,
    username: String,
})

const Thought = model('thought', thoughtSchema);

Thought.create({text:'first text', username:'frodo'})
.then(data => console.log(data))
.catch(err => console.error(err));

module.exports = Thought;