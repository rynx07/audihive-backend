// controllers/chatController.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: {
        user: true,
      },
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { content, userId } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        userId,
      },
      include: {
        user: true,
      },
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
