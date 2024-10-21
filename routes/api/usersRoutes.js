const express = require("express")
const router = express.Router()
const {registerUser, loginUser, currentUser, authStatus, logout} = require('../../controllers/usersControllers')
const validationToken = require('../../middleware/validateTokenHandlers');
const passport = require('passport');
router.post('/register', registerUser)

/*
router.post('/login',passport.authenticate('local'), loginUser)
*/

router.post('/login', (req, res, next) => {
  const acceptHeader = req.headers['accept'];

  // Si la requête vient d'un navigateur (interface web), utiliser Passport
  if (acceptHeader && acceptHeader.includes('text/html')) {
    passport.authenticate('local', {
      successRedirect: '/form',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  } else {
    // Si la requête vient d'une source externe (comme API), utiliser loginUser
    loginUser(req, res, next);
  }
});



router.post('/logout', logout)

router.get('/current', validationToken,currentUser)

router.get('/status', validationToken, authStatus)

module.exports = router