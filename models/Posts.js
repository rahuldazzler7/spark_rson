const mongoose =require('mongoose');
const PostSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    postimg:{
        type: String,
    },
    timest:{
        type: Date,
        default: Date.now
    },
    author:{
        type: String,
        required: true
    },
    _UserId:[{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    updated_on : {
        type: Date,
        default: Date.now
    }
});
const post = mongoose.model('post',PostSchema);
module.exports = post;