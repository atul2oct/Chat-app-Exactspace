const express = require('express')
const { auth } = require('../middleware/Auth')
const router = express.Router()

const {accessChat, fetchChats, creategroupChat, renameGroup, removeFromGroup, addToGroup} = require('../controllers/chatControllers')

// Route for get all user
router.post('/', auth, accessChat)
router.get('/', auth, fetchChats)
router.post('/group', auth, creategroupChat)
router.put('/rename', auth, renameGroup)
router.put('/groupremove', auth, removeFromGroup)
router.put('/groupadd', auth, addToGroup)

// Export the router for use in the main application
module.exports = router