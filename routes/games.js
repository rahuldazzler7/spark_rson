const express = require('express');
const router = express.Router();

const {ensureAuthenticated} = require('../config/auth')


router.use('/flappybird',ensureAuthenticated,express.static('public/fb.html'))



module.exports = router;