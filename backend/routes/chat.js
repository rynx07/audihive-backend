// chat.js
import express from 'express';
const router = express.Router();

// Define chat routes
router.post('/create', (req, res) => {
  res.send('Create chat route');
});

router.get('/get', (req, res) => {
  res.send('Get chats route');
});

router.delete('/delete/:id', (req, res) => {
  res.send('Delete chat route');
});

export default router;
