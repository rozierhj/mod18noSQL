const Thought = require('../models/Thought');
const User = require('../models/User');
const {format} = require('date-fns');
//return all thoughts
//return single thought
//post thought
//put thought
//delete thought

module.exports = {

async getAllThoughts(req, res){
    try{
        const thoughts = await Thought.find().select('-__v');
        res.json(thoughts);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async getOneThought(req, res){
    try{
        const thought = await Thought.findById(req.params.thoughtID).select('-__v');
        res.json(thought);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async addThought(req, res){
    try{
        const dbNewThought = await Thought.create(req.body);
        res.json(dbNewThought);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async editThought(req, res){
    try{
        const updateThought = await Thought.findByIdAndUpdate(req.params.thoughtID, req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.json(updateThought);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async deleteThought(req, res){
    try{

        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtID);

        if(!deletedThought){
            res.status(404).send('deleted thought');
        }

        const user = await User.findOne({thoughts: req.params.thoughtID});

        if (user){
            user.thoughts.pull(req.params.thoughtID);
            await user.save();
        }

        res.json(deletedThought);

    }
    catch(err){
        res.status(500).json(err);
    }
},

async addReaction(req, res){

    try{

        const thought = await Thought.findById(req.params.thoughtID);

        if(!thought){
            return res.status(404).send('Thought not found');
        }

        thought.reactions.push(req.body);

        await thought.save();

        res.json(thought);

    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }

},

async deleteReaction(req, res){

    try{

        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtID,
            {$pull:{reactions:{reactionID : req.params.reactionID}}},
        );

        if(!thought){
            return res.status(404).send('Thought no found');
        }

        res.json(thought);

    }
    catch(err){
        res.status(500).json(err);
    }

}


};