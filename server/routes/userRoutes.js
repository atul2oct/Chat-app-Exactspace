const express = require('express')
const router = express.Router()

const {signUp, login, allUsers} = require('../controllers/userControllers')
const { auth } = require('../middleware/Auth')

// Route for user login
router.post('/login',login)

// Route for user signup
router.post('/signup',signUp)

// Route for get all user
router.get('/', auth, allUsers)

// Route for change password
// router.post('/changepassword',auth,changePassword)

// Export the router for use in the main application
module.exports = router