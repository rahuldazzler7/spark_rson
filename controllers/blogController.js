const multer = require("multer");
const path = require("path");
const blogpost = require("../models/Posts");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const storage = multer.diskStorage({
  //destination:"./public/createpost",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkfiletype(file, cb);
  },
}).single("postimg");

//check file type
function checkfiletype(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

let createPost = (req, res) => {
  const { title, description, type } = req.body;
  let errors = [];
  if (!title || !description || !type) {
    errors.push({ msg: `Please fill all the required fields` });
  }
  if (errors.length > 0) {
    res.render(`addblog`, {
      errors,
      title,
      description,
      type,
    });
  } else {
    console.log("path >>" + req.file.path);
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "sparkpost/posts" },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          var postimgurl = result.secure_url;
          var postimg = postimgurl;
          console.log(result);
          User.find(req.params.id).then((postr) => {
            if (postr) {
              const newPost = new blogpost({
                title,
                description,
                type,
                postimg: postimg,
                author: req.user.username,
                _UserId: req.user.id,
              });

              newPost
                .save()
                .then((newpost) => {
                  // req.flash(`success_msg`,`Your post will be in feed within 1 miniute`);
                  res.redirect("/home");
                })
                .catch((err) => console.log(err));
            }
          });
        }
      }
    );
  }
};

let getAll = (req, res) => {
  blogpost.findById(req.params.id, (err, ptos) => {
    if (err) {
      console.log(err);
    }
    if (ptos.author == req.user.username || req.user.isadmin) {
      res.render("editpost", { rposts: ptos });
    } else {
      res.json({ status: false, msg: "You are unauthorized" });
      res.redirect("/home");
    }
  });
};

let editPost = (req, res) => {
  if (req.file != undefined) {
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "sparkpost/posts" },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          var postimgurl = result.secure_url;
          var postimgu = postimgurl;
          //console.log(result);

          const updateddata = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            postimg: postimgu,
            updated_on: req.body.updated_on,
          };

          blogpost.findByIdAndUpdate(req.params.id, updateddata, (err) => {
            if (err) {
              console.log(err);
              res.redirect("/home/edit/" + req.params.id);
            } else {
              res.redirect("/home");
            }
          });
        }
      }
    );
  } else {
    const updateddata = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      updated_on: req.body.updated_on,
    };
    console.log;

    blogpost.findByIdAndUpdate(req.params.id, updateddata, (err) => {
      if (err) {
        console.log(err);
        res.redirect("/home/edit/" + req.params.id);
      } else {
        res.redirect("/home");
      }
    });
  }
};

let deletePost = (req, res) => {
  blogpost.findByIdAndDelete(req.params.id, (err, users) => {
    if (err) {
      console.log(err);
      res.json({ status: false, msg: "Something went wrong" });
    } else {
      res.redirect("/home");
    }
  });
};

module.exports = { createPost, upload, editPost, getAll, deletePost };
