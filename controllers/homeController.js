const allPosts = require('../models/Posts');

var getPosts = async (req, res)=>{
   await allPosts.find({}, async (err, posts)=>{
       if(err){console.log(err)}
       else{
           
           res.render(`home`,{ aposts: posts });
           
       }
   })
}

var aipy = (req, res)=>{
    var spawn = require("child_process").spawn; 
    var process = spawn('python',["test.py"]);
    process.stdout.on('data', (data)=>{
        console.log("python function is working");
        res.send("python function is working");
    })
}

module.exports = {getPosts, aipy}
