const { ObjectId } = require('bson');
const {Schema, model} = require('mongoose');
const {format} = require('date-fns');

const reactionSchema = new Schema({

    reactionID: {type: Schema.Types.ObjectID, default: () => new ObjectId},
    reactionBody: {type: String, required: true, maxlength:280},
    username:{type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
       get: function(value){
           return format(value,"MMM do, yyyy 'at' hh:mm a");
       } },
},
{
    toJSON:{
        virtuals: true,
        getters: true,
        transform:(doc, ret, options) =>{
            const id = ret._id;
            delete ret._id;
            ret._id = id;
            // ret.reactionCount = doc.reactionCount;
            return {
                reactionID: ret.reactionID,
                createdAt: ret.createdAt,
                _id: id,
                reactionBody : ret.reactionBody,
                username: ret.username,
            }
        }
    },
    toObject:{
        virtuals: true,
        getters: true,
    },
    id:false,
}
);

const thoughtSchema = new Schema({
    thoughtText: {type:String, required: true, minlength: 1, maxlength: 280},
    username: {type: String, required:true},
    createdAt: {
        type: Date,
        default: Date.now,
        get: function(value){
            return format(value,"MMM do, yyyy 'at' hh:mm a");
        } 
    },
    reactions: [reactionSchema],
},
{
    toJSON:{
        virtuals: true,
        getters:true,
        transform:(doc, ret, options) =>{
            const id = ret._id;
            delete ret._id;
            ret._id = id;
            ret.reactionCount = doc.reactionCount;
            return {
                _id: id,
                thoughtText: ret.thoughtText,
                username: ret.username,
                createdAt: ret.createdAt,
                reactions: ret.reactions,
                reactionCount: ret.reactionCount
            }
        }
    },
    toObject:{
        virtuals: true,
        getters: true,
    },
}
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);


module.exports = Thought;