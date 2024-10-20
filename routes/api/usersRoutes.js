const express = require("express")
const router = express.Router()
const {registerUser, loginUser, currentUser, authStatus, logout} = require('../../controllers/usersControllers')
const validationToken = require('../../middleware/validateTokenHandlers');
const passport = require('passport');
router.post('/register', registerUser)

/*
router.post('/login',passport.authenticate('local'), loginUser)
*/

router.post('/login', 
    passport.authenticate('local', { 
      successRedirect: '/form', 
      failureRedirect: '/login', // Optional: redirect back to login if authentication fails
      failureFlash: true // Optional: enable flash messages on failure
    })
  );
router.post('/logout', logout)

router.get('/current', validationToken,currentUser)

router.get('/status', validationToken, authStatus)

module.exports = router