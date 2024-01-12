// chatController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new chat
async function createChat(req, res) {
  const { receiverId, message } = req.body;
  const senderId = req.user.id; // Assuming you have user information stored in req.user

  try {
    const newChat = await prisma.chat.create({
      data: {
        senderId,
        receiverId,
        message,
      },
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create chat." });
  }
}

// Retrieve all chats for the logged-in user
async function getChats(req, res) {
  const userId = req.user.id; // Assuming you have user information stored in req.user

  try {
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve chats." });
  }
}

// Delete a chat by ID
async function deleteChat(req, res) {
  const { id } = req.params;
  const userId = req.user.id; // Assuming you have user information stored in req.user

  try {
    const deletedChat = await prisma.chat.delete({
      where: {
        id: parseInt(id),
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
    });

    res.json(deletedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete chat." });
  }
}

const chatController = { createChat, getChats, deleteChat };

export default chatController;