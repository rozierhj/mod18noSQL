const Thought = require('../models/Thought');
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
        const thought = await Thought.findOne({_id: req.params.thoughtID}).select('-__v');
        res.json(thought);
    }
    catch(err){
        res.status(500).json(err);
    }
},

async addThought(req, res){
    try{

    }
    catch(err){
        res.status(500).json(err);
    }
},

async editThought(req, res){
    try{

    }
    catch(err){
        res.status(500).json(err);
    }
},

async deleteThought(req, res){
    try{

    }
    catch(err){
        res.status(500).json(err);
    }
}


};