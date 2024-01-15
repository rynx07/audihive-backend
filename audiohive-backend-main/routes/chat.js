// routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Get all messages
router.get('/messages', chatController.getAllMessages);

// Create a new message
router.post('/messages', chatController.createMessage);

module.exports = router;
