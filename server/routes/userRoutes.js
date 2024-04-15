const express = require('express')
const router = express.Router()

const {signUp, login} = require('../controllers/userControllers')

// Route for user login
router.post('/login',login)

// Route for user signup
router.post('/signup',signUp)

// Route for send otp
// router.post('/sendotp',sendOTP)

// Route for change password
// router.post('/changepassword',auth,changePassword)

// Export the router for use in the main application
module.exports = router