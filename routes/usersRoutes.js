const express = require("express")
const router = express.Router()
const {registerUser, loginUser, currentUser} = require('../controllers/usersControllers')
const validationToken = require('../middleware/validateTokenHandlers');

router.post('/register', registerUser)


router.post('/login', loginUser)


router.get('/current', validationToken,currentUser)

module.exports = router