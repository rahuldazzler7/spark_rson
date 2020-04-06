const express = require('express');
const router = express.Router();

const usercontroll = require('../controllers/userController');
const homecontroll = require('../controllers/homeController');
const postcontroll = require('../controllers/blogController');

const {ensureAuthenticated} = require('../config/auth')



router.get('/', (req,res)=> res.render('index'));
router.get('/home', ensureAuthenticated, homecontroll.getPosts );
router.get('/signout', ensureAuthenticated, usercontroll.signOut);
router.get('/edit/:id', ensureAuthenticated, postcontroll.getAll)
router.get('/stark', (req,res)=> res.render('stark'));
router.get('/delete/:id', ensureAuthenticated, postcontroll.deletePost)



module.exports = router;