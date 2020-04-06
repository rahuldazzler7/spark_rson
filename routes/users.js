const express = require('express');
const router = express.Router();

const usercontroll = require('../controllers/userController');
const postcontroll = require('../controllers/blogController');

const {ensureAuthenticated} = require('../config/auth');

router.post('/signup', usercontroll.postSignup);
router.post('/signin',usercontroll.postSignin);
router.post('/createpost', ensureAuthenticated, postcontroll.upload, postcontroll.createPost)
router.post('/edit/:id', ensureAuthenticated,postcontroll.upload, postcontroll.editPost)


module.exports = router;