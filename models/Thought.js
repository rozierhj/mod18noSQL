const { ObjectId } = require('bson');
const {Schema, model} = require('mongoose');

const reactionSchema = new Schema({

    reactionID: {type: Schema.Types.ObjectID, default: () => new ObjectId},
    reactionBody: {type: String, required: true, maxlength:280},
    username:{type: String, required: true},
    createdAt:{type:Date, default: Date.now },
},
{
    toJSON:{
        virtuals: true
    },
    id:false,
}
);

reactionSchema.virtual('reactionCreatedAt').get(function(){
    return this.createdAt.toLocaleString();
});

const thoughtSchema = new Schema({
    thoughtText: {type:String, required: true, minlength: 1, maxlength: 280},
    createdAt: {type: Date, default: Date.now, },
    username: {type: String, required:true},
    reactions: [reactionSchema],
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

thoughtSchema.virtual('thoughtCreatdAt').get(function(){
    return this.createdAt.toLocaleString();
});

const Thought = model('thought', thoughtSchema);


module.exports = Thought;